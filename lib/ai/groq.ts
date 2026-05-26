import Groq from 'groq-sdk'

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
})

export async function generateRoadmap(prompt: string) {
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: 'system',
                content: 'You are a product manager. Generate a JSON roadmap with phases and milestones.'
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        model: 'llama-3.1-8b-instant', // Fastest model
        temperature: 0.7,
        response_format: { type: 'json_object' }
    })

    return JSON.parse(completion.choices[0]?.message?.content || '{}')
}