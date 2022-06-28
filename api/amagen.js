import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function(req, res) {

    const completion_davinci = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: generatePrompt(req.body.prompt),
        temperature: 0.7,
        max_tokens: 100
    });
    const completion_curie = await openai.createCompletion({
        model: "text-curie-001",
        prompt: generatePrompt(req.body.prompt),
        temperature: 0.7,
        max_tokens: 100
    });
    const completion_babbage = await openai.createCompletion({
        model: "text-babbage-001",
        prompt: generatePrompt(req.body.prompt),
        temperature: 0.7,
        max_tokens: 100
    });
    const completion_ada = await openai.createCompletion({
        model: "text-ada-001",
        prompt: generatePrompt(req.body.prompt),
        temperature: 1.0,
        max_tokens: 100
    });
    let completions = [req.body.prompt + " \n",
                        completion_davinci.data.choices[0].text + " \n",
                        completion_curie.data.choices[0].text + " \n",
                        completion_babbage.data.choices[0].text + " \n",
                        completion_ada.data.choices[0].text + " \n"];
    res.status(200).json({ result: completions });
}

function generatePrompt(prompt) {
    return `Answer the following question.

Q: What is your favorite drink
A: beer
Q: Who is the president of Argentina
A: Alberto Fernandez
Q: I am a language model, what is my name?
A: Most likely GPT-3
Q: ${prompt}
A:`;
}