import { InferenceClient } from "@huggingface/inference"
import "dotenv/config";

const client = new InferenceClient(process.env.APIKEY);

export const generateImage = async(text) => {
    const image = await client.textToImage({
        provider: "fal-ai",
        model: "black-forest-labs/FLUX.1-dev",
        inputs: text,
        parameters: { num_inference_steps: 5 },
    });
    return image;
}