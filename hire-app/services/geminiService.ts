
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System Instruction for Hire App Context (used in chat/profiles, NOT matching)
const HIRE_APP_SYSTEM_INSTRUCTION = `
You are the AI assistant for "Hire App", a blue-collar hiring platform.
Your tone is professional, encouraging, and concise. 
You understand roles like Drivers, Delivery Partners, and Technicians.
Do NOT offer matching opinions. Only extract data or suggest text.
`;

export const generateProfileFromTranscript = async (transcript: string): Promise<any> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Extract a structured professional profile from this transcript of a worker talking about their experience: "${transcript}"`,
      config: {
        systemInstruction: HIRE_APP_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            roleTitle: { type: Type.STRING, description: "Suggested job title" },
            summary: { type: Type.STRING, description: "Professional summary" },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            experienceYears: { type: Type.NUMBER },
          }
        }
      }
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const processInterview = async (answers: { question: string, answer: string }[]): Promise<any> => {
  try {
    const interviewText = answers.map(a => `Q: ${a.question}\nA: ${a.answer}`).join('\n\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `
        Act as an expert recruiter. Analyze this video interview transcript and create a high-quality professional profile.
        
        Interview Content:
        ${interviewText}
      `,
      config: {
        systemInstruction: HIRE_APP_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            roleTitle: { type: Type.STRING },
            summary: { type: Type.STRING },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            experienceYears: { type: Type.NUMBER },
            qualifications: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["roleTitle", "summary", "skills", "experienceYears", "qualifications"]
        }
      }
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Smart Processing Error:", error);
    return null;
  }
};

export const processJobPosting = async (answers: { question: string, answer: string }[]): Promise<any> => {
  try {
    const interviewText = answers.map(a => `Q: ${a.question}\nA: ${a.answer}`).join('\n\n');
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Act as an expert hiring manager. Analyze this video interview transcript from an employer and create a structured Job Posting.
        
        Interview Content:
        ${interviewText}
      `,
      config: {
        systemInstruction: HIRE_APP_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
            salary: { type: Type.STRING },
            location: { type: Type.STRING },
            type: { type: Type.STRING, description: "Full-time, Part-time, Contract" },
          },
          required: ["title", "description", "skills", "salary", "location", "type"]
        }
      }
    });
    
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Smart Job Processing Error:", error);
    return null;
  }
};

export const getChatReplySuggestion = async (
  history: { role: string, text: string }[], 
  userRole: 'employer' | 'candidate',
  context?: { jobTitle?: string, companyName?: string, candidateName?: string }
): Promise<string[]> => {
    try {
        const contextString = context ? `
Context Information:
- Job Role: ${context.jobTitle || 'Not specified'}
- Company: ${context.companyName || 'Not specified'}
- Candidate Name: ${context.candidateName || 'Not specified'}
` : '';

        // Limit history to last 10 messages to avoid payload issues
        const recentHistory = history.slice(-10);

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `
                You are a smart reply assistant for a blue-collar hiring app.
                Current User Role: ${userRole.toUpperCase()}
                ${contextString}
                
                Conversation History:
                ${recentHistory.map(m => `${m.role}: ${m.text}`).join('\n')}
                
                Generate 3 distinct, short, natural, and professional reply options for the ${userRole} to send next based on the last message and the job context.
                
                Guidelines:
                1. One option should be a direct confirmation, positive acknowledgement, or specific answer.
                2. One option should be a relevant follow-up question regarding the job, logistics, or availability.
                3. One option should be a polite deferral, negotiation, or alternative proposal.
                
                Constraints:
                - Max 15 words per reply.
                - No hashtags or emojis (unless very subtle).
                - Use simple, clear English suitable for the context.
            `,
            config: {
                systemInstruction: HIRE_APP_SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        suggestions: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    }
                }
            }
        });
        
        const text = response.text;
        if (!text) return [];
        const result = JSON.parse(text);
        return result.suggestions || [];
    } catch (e) {
        console.error("Gemini Suggestion Error:", e);
        return [];
    }
}

export const generateMatchExplanation = async (jobDescription: string, candidateProfile: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `
        Analyze the match between this job description and the candidate profile.
        Explain why this candidate is a good match for the job in 1-2 sentences. Focus on key skills and experience.
        
        Job Description: "${jobDescription}"
        Candidate Profile: "${candidateProfile}"
      `,
      config: {
        systemInstruction: HIRE_APP_SYSTEM_INSTRUCTION,
      }
    });
    return response.text || "Match analysis unavailable.";
  } catch (error) {
    console.error("Gemini Match Explanation Error:", error);
    return "Could not generate explanation at this time.";
  }
};
