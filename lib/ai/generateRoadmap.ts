import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

const ROADMAP_GENERATION_SYSTEM_PROMPT = `You are an expert product manager and project planner. 
Generate detailed, actionable roadmaps based on user descriptions.

Return ONLY valid JSON with this exact structure:
{
  "title": "string",
  "description": "string",
  "timeline_scale": "weeks" | "months" | "quarters",
  "total_duration": number,
  "phases": [
    {
      "name": "string",
      "description": "string",
      "duration": number,
      "milestones": [
        {
          "title": "string",
          "description": "string",
          "duration_days": number,
          "priority": "critical" | "high" | "medium" | "low"
        }
      ]
    }
  ],
  "resources_needed": ["string"],
  "risk_factors": ["string"],
  "success_metrics": ["string"]
}

Make it realistic and actionable. Include 2-4 phases with 2-5 milestones each.`

export async function generateRoadmap(userPrompt: string) {
    const startTime = Date.now()

    try {
        // Use gpt-3.5-turbo if you don't have GPT-4 access
        // Or use gpt-4-turbo if you have access
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // ✅ This works for everyone
            // model: 'gpt-4-turbo', // Use this if you have GPT-4 access
            messages: [
                { role: 'system', content: ROADMAP_GENERATION_SYSTEM_PROMPT },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.7,
            response_format: { type: 'json_object' }
        })

        const generatedText = completion.choices[0].message.content
        if (!generatedText) {
            throw new Error('No response from AI')
        }

        const parsed = JSON.parse(generatedText)

        return {
            success: true,
            data: parsed,
            tokensUsed: completion.usage?.total_tokens || 0,
            timeMs: Date.now() - startTime
        }

    } catch (error) {
        console.error('AI Generation Error:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Failed to generate roadmap'
        }
    }
}