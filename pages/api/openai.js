// pages/api/openai.js
import OpenAI from 'openai';
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }
    try {
        const data = req.body;
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_TOKEN // This is also the default, can be omitted
        });        
        const chatCompletion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{"role": "user", "content": data}],
        });
        const response = await chatCompletion.choices[0].message.content
        res.status(200).send(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
