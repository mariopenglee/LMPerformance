import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Ntp() {
  const [promptInput, setpromptInput] = useState("");
  const [result, setResult] = useState();
  const [completions, setCompletions] = useState();

  async function makePrompt(event) {
    event.preventDefault();
    const response = await fetch("/api/promptgenerator");
    await console.log(result)
    const data = await response.json();
    setResult(data.result);
    setpromptInput("");
  }

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/ntpgen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: result + "|" + promptInput }),
    });
    const data = await response.json();
    setCompletions(data.completions);
    setpromptInput("");
  }


  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.sidenav}>
          <a href="index">About</a>
          <a href="ama">AMA</a>
          <a href="#">NTP</a>
        </div>
        <img src="/dog.png" className={styles.icon} />
        <h3>Ask Me Anything</h3>
        <form onSubmit={makePrompt}>
          <input type="submit" value="Generate prompt" />
        </form>
        <div className={styles.result}>{result ? result : ""}</div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Predict the next token in this sentence"
            value={promptInput}
            onChange={(e) => setpromptInput(e.target.value)}
          />
          <input type="submit" value="Compare performance" />
        </form>
        <div className={styles.result}>{completions ? completions[0] : ""}</div>
        <div className={styles.result}>{completions ? completions[1] : ""}</div>
        <div className={styles.result}>{completions ? completions[2] : ""}</div>
        <div className={styles.result}>{completions ? completions[3] : ""}</div>
        <div className={styles.result}>{completions ? completions[4] : ""}</div>
        <div className={styles.result}>{completions ? completions[5] : ""}</div>
      </main>
    </div>
  );
}
