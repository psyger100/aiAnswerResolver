import type { GenerateContentResult } from "@google/generative-ai";
import { genAI } from "../utils/genAi";
export class aiManager {
    constructor() {}
    public async fileToGenerativePart(buffer: Buffer, mimeType: string) {
        return {
            inlineData: {
            data: buffer.toString("base64"), // Convert buffer to base64
            mimeType,
            },
        };
        }
    
    public async getAnswer(file: Express.Multer.File) {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const imagePart = await this.fileToGenerativePart(file.buffer, file.mimetype);
        const prompt ="Analize the question and options give in the image and only tell me which option is correct a/b/c/d.";
        const result: GenerateContentResult = await model.generateContent([prompt, imagePart]);
        return result.response.text().toLowerCase();

    }
}
