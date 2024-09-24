import { Configuration, OpenAIApi } from 'openai-edge';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: "https://api.together.xyz/v1"
});

export const openai = new OpenAIApi(configuration);
