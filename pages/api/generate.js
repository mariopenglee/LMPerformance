import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function(req, res) {

    const completion_davinci = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: generatePrompt(req.body.animal),
        temperature: 0.0,
    });
    const completion_curie = await openai.createCompletion({
        model: "text-curie-001",
        prompt: generatePrompt(req.body.animal),
        temperature: 0.0,
    });
    const completion_babbage = await openai.createCompletion({
        model: "text-babbage-001",
        prompt: generatePrompt(req.body.animal),
        temperature: 0.0,
    });
    const completion_ada = await openai.createCompletion({
        model: "text-ada-001",
        prompt: generatePrompt(req.body.animal),
        temperature: 0.0,
    });
    let completions = {"davinci": completion_davinci.data.choices[0].text ,
                        "curie": completion_curie.data.choices[0].text,
                        "babbage": completion_babbage.data.choices[0].text,
                        "ada": completion_ada.data.choices[0].text};
    res.status(200).json({ result: completions });
}

function generatePrompt(animal) {
    const capitalizedAnimal =
        animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}