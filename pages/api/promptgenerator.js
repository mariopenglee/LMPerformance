import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const priming_prompt = `Write a random sentence`

export default async function(req, res) {

    const prompt = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: priming_prompt,
        temperature: 1.0
    });

    res.status(200).json({ result: prompt.data.choices[0].text.split(" ").slice(0, -1).join(" ") });
}
