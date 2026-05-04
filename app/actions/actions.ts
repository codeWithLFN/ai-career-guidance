

import { GoogleGenAI } from "@google/genai";
import { getAPIKey } from "./access";

const API_KEY = process.env.GEMINI_API_KEY;
console.log({API_KEY})



export const analysePdfDocument = async (pdfBase64: string) => {
    const api_key = await getAPIKey();
    
    const ai = new GoogleGenAI({ apiKey: api_key });
    const model = 'gemini-2.5-flash';
    const pdfResp = await fetch(pdfBase64)
        .then((response) => response.arrayBuffer());

    const content = [
        { text: "Extract modules related content of this PDF and return it as structured JSON format." },
        {
            inlineData: {
                mimeType: 'application/pdf',
                data: Buffer.from(pdfResp).toString("base64")
            }
        }
    ];
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: content,
        });

        return response.text?.replaceAll('```json', '').replaceAll('```', '');

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Gemini API Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the Gemini API.");
    }
}

export const getRecommendations = async (data: { subject: any[], personality: any[], skills: any[], interests: any[] }) => {
    try {
        let subjects = {};
        data.subject.forEach(obj => {
            subjects = { ...subjects, [obj.name]: obj.percentage };
        });

        const res = await fetch('https://acgs-ai-engine.vercel.app/api/predict', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "academicResults": subjects,
                "interests": data.interests,
                "personalityTraits": data.personality
            })
            
        })
        return await res.json();
    } catch (error) {
        console.error("Error calling API:", error);
        if (error instanceof Error) {
            throw new Error(`API Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the API.");
    }
}