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
        max_tokens: 5
    });
    const completion_curie = await openai.createCompletion({
        model: "text-curie-001",
        prompt: generatePrompt(req.body.prompt),
        temperature: 0.0,
        max_tokens: 5
    });
    const completion_babbage = await openai.createCompletion({
        model: "text-babbage-001",
        prompt: generatePrompt(req.body.prompt),
        temperature: 0.0,
        max_tokens: 5
    });
    const completion_ada = await openai.createCompletion({
        model: "text-ada-001",
        prompt: generatePrompt(req.body.prompt),
        temperature: 1.0,
        max_tokens: 5
    });
    let completions = [ "Prompt: " + req.body.prompt.split("|")[0] + " \n",
                        "You: " + req.body.prompt.split("|")[1] + " \n",
                        "Davinci: " + completion_davinci.data.choices[0].text + " \n",
                        "Curie: " + completion_curie.data.choices[0].text + " \n",
                        "Babbage: " + completion_babbage.data.choices[0].text + " \n",
                        "Ada: " + completion_ada.data.choices[0].text + " \n"];
    res.status(200).json({ completions: completions });

}

function generatePrompt(prompt) {
    const modifiedPrompt =
   prompt.split("|")[0];

    return `Predict the next token.
Prompt: My best friend is a
Prediction: singer
Prompt: I love California, the weather is
Prediction: great
Prompt: I had a dream last night that I was
Prediction: flying
Prompt: ${modifiedPrompt}
Prediction:`;
}