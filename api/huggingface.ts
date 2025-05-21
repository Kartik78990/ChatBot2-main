// /api/huggingface.ts
import { HfInference } from '@huggingface/inference';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { model, inputs } = req.body;

  const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

  try {
    let result;

    switch (model) {
      case "text-generation":
        result = await hf.textGeneration({
          model: "deepseek-ai/DeepSeek-V3-0324",
          inputs,
          parameters: {
            max_length: 100,
            temperature: 0.7,
          },
        });
        break;

      case "image-classification":
        const imageResponse = await fetch(inputs);
        const imageData = new Uint8Array(await imageResponse.arrayBuffer());

        result = await hf.imageClassification({
          model: "google/vit-base-patch16-224",
          data: imageData,
        });
        break;

      default:
        throw new Error("Unsupported model type");
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
}
