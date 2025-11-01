import { GoogleGenAI, Type } from "@google/genai";
import { CareInstructions } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we assume the API key is set.
  console.warn("Gemini API key not found. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generatePetDescription = async (
  name: string,
  breed: string,
  age: number
): Promise<string> => {
  if (!API_KEY) return "AI service is unavailable.";
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a creative and appealing e-commerce description for a pet. The description should be about 80-100 words.
      Pet's Name: ${name}
      Breed: ${breed}
      Age: ${age} years old`,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating pet description:", error);
    return "Failed to generate description. Please try again.";
  }
};

export const generateCareInstructions = async (
  breed: string,
  type: string
): Promise<CareInstructions> => {
  if (!API_KEY) return { feeding: "", grooming: "", exercise: "", medicalNeeds: "" };
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate detailed care instructions for a ${breed} which is a type of ${type}. Provide concise, practical advice for a new owner.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            feeding: {
              type: Type.STRING,
              description: "Detailed feeding instructions including frequency and type of food.",
            },
            grooming: {
              type: Type.STRING,
              description: "Grooming requirements, including brushing, bathing, and nail trimming.",
            },
            exercise: {
              type: Type.STRING,
              description: "Daily exercise needs and suggested activities.",
            },
            medicalNeeds: {
              type: Type.STRING,
              description: "Common medical needs, vaccination advice, and potential health issues to watch for.",
            },
          },
          required: ["feeding", "grooming", "exercise", "medicalNeeds"],
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as CareInstructions;

  } catch (error) {
    console.error("Error generating care instructions:", error);
    throw new Error("Failed to generate care instructions. Please check the breed and try again.");
  }
};
