import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const getNextSteps = async (req: Request, res: Response) => {
  try {
    const { title, company, status } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
The user applied for a job.

Job Title: ${title}
Company: ${company}
Current Status: ${status}

Give practical next steps the user should take.
Keep it short and actionable (bullet points).
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    res.json({ success: true, advice: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "AI error",
    });
  }
};

export const getEmailContent = async (req: Request, res: Response) => {
  try {
    const { title, company, status } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Write a professional follow-up email.

Job Title: ${title}
Company: ${company}
Status: ${status}

Instructions:
- Be polite and professional
- Keep it short
- Include subject line
- Do not be too long
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    res.json({ success: true, advice: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "AI error",
    });
  }
};
