import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

// ----------------------------------------------------------------------
// Types & Fallback
// ----------------------------------------------------------------------

type ConsultationResponse = {
    answer: string; // "YES", "NO", "MAYBE" (kept for compatibility/sentiment)
    message: string; // The main advice body
};

const getRandomFallback = (): ConsultationResponse => {
    return {
        answer: "MAYBE",
        message: "申し訳ありません。星の声が少し遠いようです...。しかし、あなたの悩みは必ず解決の糸口が見つかります。少し時間を置いて、もう一度心を落ち着けて問いかけてみてください。深呼吸をして、リラックスすることが第一歩です。"
    };
};

// ----------------------------------------------------------------------
// Prompts
// ----------------------------------------------------------------------

const SYSTEM_PROMPT = `
あなたは「月詠ルナ（つくよみるな）」という、慈愛に満ちた神秘的な占い師兼スピリチュアルカウンセラーです。
ユーザーは深刻な悩みや迷いを抱えて相談に来ています。
単なる吉凶占いではなく、プロのカウンセラーとして「具体的」かつ「現実的」なアドバイスを授けてください。

【キャラクター設定】
- 口調: 神秘的だが、親身で温かい。「～ですね」「～しましょう」という柔らかい敬語。
- 一人称: 私、ルナ
- 姿勢: ユーザーの感情を否定せず、まずは受け止める。

【回答のガイドライン】
1. **共感と受容**: まず、ユーザーの悩みや辛さに寄り添う言葉をかけること。
2. **本質の見極め**: スピリチュアルな視点（星の巡り、月の満ち欠け、エネルギーの流れなど）から、現状がどのような時期なのかを伝える。
3. **具体的なアクション**: 抽象論で終わらせず、「明日からできること」「考え方の具体的な変え方」を**3つ**提案する。
4. **文字数**: 充実した内容にするため、**400〜600文字程度**で丁寧に回答する。
5. **禁止事項**: Markdown記法（**太字**など）は絶対に使用しないこと。プレーンテキストのみで出力すること。

【出力フォーマット】
以下のJSON形式のみを出力してください。Markdownの装飾は不要です。
{
  "answer": "YES" or "NO" or "MAYBE" (質問の性質上、明確な答えが出せる場合はYES/NO、複雑な場合はMAYBE),
  "message": "ここに400文字以上の丁寧なアドバイス..."
}
`;

// ----------------------------------------------------------------------
// Provider Logic
// ----------------------------------------------------------------------

async function callOpenAI(apiKey: string, question: string): Promise<ConsultationResponse | null> {
    try {
        const openai = new OpenAI({ apiKey });
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cost-effective model with high performance
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `相談内容: "${question}"` }
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
        });

        const content = completion.choices[0].message.content;
        if (!content) throw new Error("No content from OpenAI");
        // Cleanup: Remove markdown bolding just in case
        const cleanContent = content.replace(/\*\*/g, '').replace(/\*/g, '');
        return JSON.parse(cleanContent) as ConsultationResponse;
    } catch (e) {
        console.error("OpenAI Error:", e);
        return null;
    }
}

async function callGemini(apiKey: string, question: string): Promise<ConsultationResponse | null> {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const geminiPrompt = `${SYSTEM_PROMPT}\n\n相談内容: "${question}"\n\n必ずJSONのみを出力してください。`;

        const result = await model.generateContent(geminiPrompt);
        const text = result.response.text();
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').replace(/\*\*/g, '').replace(/\*/g, '').trim();

        return JSON.parse(cleanJson) as ConsultationResponse;
    } catch (e) {
        console.error("Gemini Error:", e);
        return null;
    }
}

// ----------------------------------------------------------------------
// Main Handler
// ----------------------------------------------------------------------

export async function POST(request: Request) {
    try {
        const { question } = await request.json();
        if (!question) return NextResponse.json({ error: 'Question is required' }, { status: 400 });

        const openaiKey = process.env.OPENAI_API_KEY;
        const geminiKey = process.env.GEMINI_API_KEY;

        let result: ConsultationResponse | null = null;

        // Priority 1: OpenAI
        if (openaiKey) {
            console.log("Using OpenAI...");
            result = await callOpenAI(openaiKey, question);
        }

        // Priority 2: Gemini (if OpenAI failed or no key)
        if (!result && geminiKey) {
            console.log("Using Gemini fallback...");
            result = await callGemini(geminiKey, question);
        }

        // Final Fallback
        if (!result) {
            console.warn("No AI provider worked, using local fallback.");
            return NextResponse.json(getRandomFallback());
        }

        return NextResponse.json(result);

    } catch (error) {
        console.error('API Handler Error:', error);
        return NextResponse.json(getRandomFallback());
    }
}
