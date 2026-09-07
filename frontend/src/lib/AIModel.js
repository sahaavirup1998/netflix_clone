import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_GENAI_API_KEY,
});
const model = "gemini-3.6-flash";
export const getAiRecommendation = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { responseMimeType: "application/json" },
    });
    return response?.text || null;
  } catch (error) {
    console.error("Error generating AI recommendation:", error);
    return null;
  }
};