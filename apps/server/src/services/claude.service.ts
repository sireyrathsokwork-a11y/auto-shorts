import Anthropic from '@anthropic-ai/sdk';
import 'dotenv/config';

export async function generateScenes(theme: string, niche: string) {
    const anthropic = new Anthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
    });

    try {
        const msg = await anthropic.messages.create({
            model: 'claude-sonnet-4-5',
            max_tokens: 1024,
            system: `Please generate a script for producing a youtube short.

                    I prefer emotional, relatable quotes or motivation.
                    Total duration must be under 60 seconds (30–45 seconds preferred).
                    Style: aesthetic, sad, painterly, minimal subject, maximum meaning, moody, cinematic.
                    Transitions can be "fade".

                    Return ONLY valid JSON. No markdown. No explanation.

                    Here is the EXACT format you must follow:

                    {
                    "title": "Late Night Thoughts",
                    "scenes": [
                        {
                        "quote": "Sometimes the silence says everything you tried to ignore.",
                        "animation": "fade",
                        "duration": 4,
                        "backgroundColor": "#1a1a1a"
                        },
                        {
                        "quote": "You outgrew people who only knew the old version of you.",
                        "animation": "slideUp",
                        "duration": 4,
                        "backgroundColor": "#2c2c2c"
                        }
                    ]
                    }

                    Follow this structure EXACTLY. Do not add or remove fields.Do NOT wrap the response in markdown code blocks. No backticks. Raw JSON only.`,
            messages: [
                {
                    role: 'user',
                    content: `"generate a short about ${niche} using this ${theme}"`,
                },
            ],
        });

        const text = msg.content[0]?.type === 'text' ? msg.content[0].text : '';

        if (!text) {
            throw new Error('Claude returned empty response');
        }

        const cleaned = text.replace(/```json|```/g, '').trim()
        const parsed = JSON.parse(cleaned)

        return parsed;
    } catch (error) {
        console.error('Claude error:', error);
        throw new Error(`Failed to generate scenes: ${error instanceof Error ? error.message : String(error)}`)
    }
}
