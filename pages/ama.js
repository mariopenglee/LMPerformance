import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Ama() {
  const [promptInput, setpromptInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/amagen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptInput }),
    });
    await console.log(result)
    const data = await response.json();
    setResult(data.result);
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
          <a href="#">AMA</a>
          <a href="ntp">NTP</a>
        </div>
        <img src="/dog.png" className={styles.icon} />
        <h3>Ask Me Anything</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Enter a question"
            value={promptInput}
            onChange={(e) => setpromptInput(e.target.value)}
          />
          <input type="submit" value="Get Response" />
        </form>
        <div className={styles.result}>{result ? result[0] : ""}</div>
        <div className={styles.result}>{result ? result[1] : ""}</div>
        <div className={styles.result}>{result ? result[2] : ""}</div>
        <div className={styles.result}>{result ? result[3] : ""}</div>
        <div className={styles.result}>{result ? result[4] : ""}</div>
      </main>
    </div>
  );
}
