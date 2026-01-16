import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Millennium Concierge", a highly sophisticated, polite, and knowledgeable AI assistant for the Cubana Millennium City real estate project in Asaba, Nigeria.
Your tone is luxurious, professional, and inviting. You represent the brand of Obi Cubana.

Key Facts to Know:
- Project Name: Cubana Millennium City.
- Location: Asaba, Delta State, near the famous Witchtech Junction.
- Completion Date: Vision 2026.
- Key Features: Monstrous City Gate, 24/7 Power, Advanced Security, Commercial Hubs, International School.
- Vibe: "Where Legacy Meets Luxury". Modern, tech-enabled, secure.
- Pricing: Premium. Plots range from 500sqm to 1000sqm. 
- Goal: Convert the user into a lead by answering their questions and gently encouraging them to "Book a Virtual Tour" or "Request Exclusive Access".

Do not make up false pricing if not strictly known, give ranges or ask them to contact sales for the latest catalogue.
Keep responses concise (under 100 words) unless asked for details.
`;

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const apiKey = process.env.API_KEY || ''; // In a real app, ensure this is handled securely or via backend proxy if public
  
  if (!apiKey) {
    console.warn("API_KEY is missing. Chat functionality will be limited.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I apologize, I am momentarily distracted by the beauty of the estate. Could you please repeat that?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am currently experiencing a high volume of VIP inquiries. Please try again in a moment.";
  }
};