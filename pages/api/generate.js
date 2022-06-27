import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function(req, res) {

    const completion_davinci = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: generatePrompt(req.body.prompt),
        temperature: 0.0,
        max_tokens: 20,
    });
    const completion_curie = await openai.createCompletion({
        model: "text-curie-001",
        prompt: generatePrompt(req.body.prompt),
        temperature: 0.0,
        max_tokens: 20,
    });
    const completion_babbage = await openai.createCompletion({
        model: "text-babbage-001",
        prompt: generatePrompt(req.body.prompt),
        temperature: 0.0,
        max_tokens: 20,
    });
    const completion_ada = await openai.createCompletion({
        model: "text-ada-001",
        prompt: generatePrompt(req.body.prompt),
        temperature: 0.0,
        max_tokens: 20,
    });
    let completions = ["Prompt: " + req.body.prompt + " \n",
                        "Davinci: " + completion_davinci.data.choices[0].text + " \n",
                        "Curie: " + completion_curie.data.choices[0].text + " \n",
                        "Babbage: " + completion_babbage.data.choices[0].text + " \n",
                        "Ada: " + completion_ada.data.choices[0].text + " \n"];
    res.status(200).json({ result: completions });
}

function generatePrompt(prompt) {
    const capitalizedprompt =
        prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();
    return `Predict the next token.

Prompt: I was hanging out in a bar with some friends, and I ordered a
Prediction: beer
Prompt: I love California, the weather is
Prediction: great
Prompt: I am a language modeler, I am trying to predict the next
Prediction: token
Prompt: ${capitalizedprompt}
Prediction:`;
}