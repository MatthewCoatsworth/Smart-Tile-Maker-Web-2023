// pages/api/huggingface.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end(); // Method Not Allowed
    }

    try {
      const data = req.body;
      // Retrieve the HF_TOKEN from the environment variables
      const hfToken = process.env.HF_TOKEN;

      const response = await fetch(
          "https://api-inference.huggingface.co/models/dream-textures/texture-diffusion",
          {
            headers: {"Authorization": `Bearer ${hfToken}`},
            method: "POST",
            body: JSON.stringify(data),
          }
        );

      res.setHeader('Content-Type', 'image/jpeg');
      const buffer = await response.arrayBuffer();
      res.end(Buffer.from(buffer));

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
