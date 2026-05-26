import { NextResponse } from 'next/server'
import { createServerClient } from "@/lib/supabase/server"
import Groq from 'groq-sdk'

// Initialize Groq (free API)
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json()

        if (!prompt || typeof prompt !== 'string') {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            )
        }

        console.log('Generating roadmap for:', prompt)

        // Generate roadmap with Groq (free)
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: `You are an expert product manager. Generate a detailed roadmap in JSON format.

Required JSON structure:
{
  "title": "Project Name",
  "description": "Brief description",
  "timeline_scale": "months",
  "total_duration": 3,
  "phases": [
    {
      "name": "Phase Name",
      "description": "What happens",
      "duration": 1,
      "milestones": [
        {
          "title": "Milestone name",
          "description": "What this delivers",
          "duration_days": 14,
          "priority": "high"
        }
      ]
    }
  ],
  "resources_needed": ["Resource1", "Resource2"],
  "risk_factors": ["Risk1", "Risk2"],
  "success_metrics": ["Metric1", "Metric2"]
}

Return ONLY valid JSON, no markdown or extra text.`
                },
                {
                    role: 'user',
                    content: `Create a detailed roadmap for: ${prompt}`
                }
            ],
            model: 'llama-3.1-8b-instant', // Fast and free
            temperature: 0.7,
        })

        const aiResponse = completion.choices[0]?.message?.content || '{}'
        console.log('AI Response received, length:', aiResponse.length)

        // Parse JSON
        let roadmapData
        try {
            roadmapData = JSON.parse(aiResponse)
        } catch (parseError) {
            console.error('JSON Parse Error:', aiResponse)
            // Fallback to default structure
            roadmapData = {
                title: "Project Roadmap",
                description: prompt,
                timeline_scale: "months",
                total_duration: 3,
                phases: [
                    {
                        name: "Phase 1: Planning",
                        description: "Initial planning and setup",
                        duration: 1,
                        milestones: [
                            {
                                title: "Requirements Analysis",
                                description: "Gather and document requirements",
                                duration_days: 14,
                                priority: "high"
                            }
                        ]
                    }
                ]
            }
        }

        // Get authenticated user
        const supabase = await createServerClient()
        const { data: { user }, error: userError } = await supabase.auth.getUser()

        if (userError || !user) {
            console.error('Auth error:', userError)
            return NextResponse.json(
                { error: 'Please log in to generate roadmaps' },
                { status: 401 }
            )
        }

        // Create roadmap in database
        const { data: roadmap, error: roadmapError } = await supabase
            .from('roadmaps')
            .insert({
                title: roadmapData.title || 'AI Generated Roadmap',
                description: roadmapData.description || prompt.slice(0, 200),
                owner_id: user.id,
                visibility: 'private',
                generated_from_prompt: prompt,
                timeline_config: {
                    viewMode: roadmapData.timeline_scale || 'months',
                    startDate: new Date().toISOString().split('T')[0],
                    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                }
            })
            .select()
            .single()

        if (roadmapError) {
            console.error('Roadmap creation error:', roadmapError)
            return NextResponse.json(
                { error: `Failed to create roadmap: ${roadmapError.message}` },
                { status: 500 }
            )
        }

        // Create milestones
        let itemOrder = 0
        const startDate = new Date()

        for (const phase of roadmapData.phases || []) {
            for (const milestone of phase.milestones || []) {
                const milestoneStart = new Date(startDate)
                milestoneStart.setDate(milestoneStart.getDate() + (itemOrder * 14))

                const milestoneEnd = new Date(milestoneStart)
                milestoneEnd.setDate(milestoneEnd.getDate() + (milestone.duration_days || 14))

                const { error: itemError } = await supabase
                    .from('roadmap_items')
                    .insert({
                        roadmap_id: roadmap.id,
                        title: milestone.title || 'Untitled Milestone',
                        description: milestone.description || '',
                        type: 'milestone',
                        start_date: milestoneStart.toISOString().split('T')[0],
                        end_date: milestoneEnd.toISOString().split('T')[0],
                        priority: milestone.priority || 'medium',
                        status: 'planned',
                        progress: 0
                    })

                if (itemError) {
                    console.error('Item creation error:', itemError)
                }

                itemOrder++
            }
        }

        console.log(`✅ Roadmap created with ID: ${roadmap.id}`)

        return NextResponse.json({
            success: true,
            roadmapId: roadmap.id,
            data: roadmapData
        })

    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json(
            {
                error: error.message || 'Failed to generate roadmap',
                details: process.env.NODE_ENV === 'development' ? String(error) : undefined
            },
            { status: 500 }
        )
    }
}