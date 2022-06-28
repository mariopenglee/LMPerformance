import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: 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,
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
    let completions = [ (req.body.prompt.split("|")[0]).split(" ").slice(0, -1).join(" ") + " \n", /*prompt, remove last word from it*/
                        (req.body.prompt.split("|")[0]).split(" ").slice(-1).join(" ") + " \n", /*correct answer (remove everything but last word from result= first part)*/
                        req.body.prompt.split("|")[1] + " \n", /*human*/
                        completion_davinci.data.choices[0].text + " \n", /*davinci*/
                        completion_curie.data.choices[0].text + " \n", /*curie*/
                        completion_babbage.data.choices[0].text + " \n", /*babbage*/
                        completion_ada.data.choices[0].text + " \n"]; /*ada*/
    res.status(200).json({ completions: completions });

}

function generatePrompt(prompt) {
    const modifiedPrompt =
   (prompt.split("|")[0]).split(" ").slice(0, -1).join(" ");

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
