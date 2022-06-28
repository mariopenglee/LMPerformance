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
        <link rel="icon" href="/logo.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.sidenav}>
          <a href="/">About</a>
          <a href="ama">AMA</a>
          <a href="ntp">NTP</a>
        </div>
        <img src="/logo.png" className={styles.icon} />
        <h3>Next Token Prediction</h3>
        <form onSubmit={makePrompt}>
          <input type="submit" value="Generate prompt" />
        </form>
        <div className={styles.result}>{result ? result.split(" ").slice(0, -1).join(" ") : ""}</div>
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
        <br></br>
                <table className={styles.table}>
            <tr className={styles.tr}>
              <td className={styles.td}>Prompt</td>
              <td className={styles.td}>{completions ? completions[0] : ""}</td>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.td}>Correct Token</td>
              <td className={styles.td}>{completions ? completions[1] : ""}</td>
            </tr>
          <tr className={styles.tr}>
              <td className={styles.td}>You</td>
            <td className={styles.td}>{completions ? completions[2] : ""}</td>
            </tr>
          <tr className={styles.tr}>
              <td className={styles.td}>Davinci</td>
            <td className={styles.td}>{completions ? completions[3] : ""}</td>
            </tr>
          <tr className={styles.tr}>
              <td className={styles.td}>Curie</td>
            <td className={styles.td}>{completions ? completions[4] : ""}</td>
            </tr>
          <tr className={styles.tr}>
              <td className={styles.td}>Babbage</td>
             <td className={styles.td}>{completions ? completions[5] : ""}</td>
            </tr>
                  <tr className={styles.tr}>
              <td className={styles.td}>Ada</td>
             <td className={styles.td}>{completions ? completions[5] : ""}</td>
            </tr>
        </table>

      </main>
    </div>
  );
}
