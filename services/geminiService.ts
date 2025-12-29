import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "../constants";

export const getBaristaRecommendation = async (userMessage: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: AI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "I'm having a little trouble checking the menu right now, but a Latte is always a safe choice!";
  } catch (error) {
    console.error("Error fetching recommendation:", error);
    throw new Error("Our Virtual Barista is on a coffee break. Please try again later.");
  }
};