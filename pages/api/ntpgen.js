import { Configuration, OpenAIApi } from "openai";



export default async function(req, res) {

const prompt = (req.body.prompt.split("|")[0]).split(" ").slice(0, -1).join(" ");
const correct = (req.body.prompt.split("|")[0]).split(" ").slice(-1).join(" ");
const yourAnswer = req.body.prompt.split("|")[1];
const api = req.body.prompt.split("|")[2];

const configuration = new Configuration({
    apiKey: api,
});
const openai = new OpenAIApi(configuration);
    const completion_davinci = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: generatePrompt(prompt),
        temperature: 0.0,
        max_tokens: 5
    });
    const completion_curie = await openai.createCompletion({
        model: "text-curie-001",
        prompt: generatePrompt(prompt),
        temperature: 0.0,
        max_tokens: 5
    });
    const completion_babbage = await openai.createCompletion({
        model: "text-babbage-001",
        prompt: generatePrompt(prompt),
        temperature: 0.0,
        max_tokens: 5
    });
    const completion_ada = await openai.createCompletion({
        model: "text-ada-001",
        prompt: generatePrompt(prompt),
        temperature: 1.0,
        max_tokens: 5
    });
    let completions = [ prompt + " \n", /*prompt, remove last word from it*/
                        correct + " \n", /*correct answer (remove everything but last word from result= first part)*/
                        yourAnswer + " \n", /*human*/
                        completion_davinci.data.choices[0].text + " \n", /*davinci*/
                        completion_curie.data.choices[0].text + " \n", /*curie*/
                        completion_babbage.data.choices[0].text + " \n", /*babbage*/
                        completion_ada.data.choices[0].text + " \n"]; /*ada*/
    res.status(200).json({ completions: completions });

}

function generatePrompt(prompt) {
    return `Predict the next token.
Prompt: My best friend is a
Prediction: singer
Prompt: I love California, the weather is
Prediction: great
Prompt: I had a dream last night that I was
Prediction: flying
Prompt: ${prompt}
Prediction:`;
}
