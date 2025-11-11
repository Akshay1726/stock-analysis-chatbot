
import { GoogleGenAI, Type } from "@google/genai";
import { ProductStock, BotResponseData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        naturalResponse: {
            type: Type.STRING,
            description: "A conversational, natural language response to the user's query. Be friendly and helpful."
        },
        lowStockItems: {
            type: Type.ARRAY,
            description: "A list of products that are currently at or below their low stock threshold based on the user's query.",
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    stock: { type: Type.INTEGER },
                    lowStockThreshold: { type: Type.INTEGER }
                },
                required: ["name", "stock", "lowStockThreshold"]
            }
        }
    },
    required: ["naturalResponse", "lowStockItems"]
};

export async function getStockAnalysis(query: string, stockData: ProductStock[]): Promise<BotResponseData> {
  try {
    const prompt = `
      User Query: "${query}"

      Current Stock Data:
      ${JSON.stringify(stockData, null, 2)}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `You are an intelligent stock analysis assistant for a retail store. 
        Your role is to analyze user queries about product availability against the provided stock data. 
        When a product's stock is at or below its low stock threshold, you must identify it as a 'low stock' item. 
        Respond with a friendly, conversational message and a structured JSON object containing only the products that are low on stock. 
        If no queried items are low on stock, return an empty array for lowStockItems.
        If the user asks a general question not related to stock, provide a helpful response and an empty lowStockItems array.`,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString) as BotResponseData;
    return parsedResponse;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return {
      naturalResponse: "I'm sorry, I encountered an error while analyzing the stock. Please try again later.",
      lowStockItems: []
    };
  }
}
