import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: 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,
});
const openai = new OpenAIApi(configuration);

const priming_prompt = `Write a random sentence`

export default async function(req, res) {

    const prompt = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: priming_prompt,
        temperature: 1.0,
        max_tokens: 100
    });

    /*res.status(200).json({ result: prompt.data.choices[0].text.split(" ").slice(0, -1).join(" ") });*/
    res.status(200).json({ result: prompt.data.choices[0].text });
}
