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
        <link rel="icon" href="/logo.png" />

      </Head>
      <main className={styles.main}>
        <div className={styles.sidenav}>
          <a href="/">About</a>
          <a href="#">AMA</a>
          <a href="ntp">NTP</a>
        </div>
        <img src="/logo.png" className={styles.icon} />
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
        <br></br>
        <table className={styles.table}>
            <tr className={styles.tr}>
              <td className={styles.td}>Prompt</td>
              <td className={styles.td}>{result ? result[0] : ""}</td>
            </tr>
          <tr className={styles.tr}>
              <td className={styles.td}>Davinci</td>
            <td className={styles.td}>{result ? result[1] : ""}</td>
            </tr>
          <tr className={styles.tr}>
              <td className={styles.td}>Curie</td>
            <td className={styles.td}>{result ? result[2] : ""}</td>
            </tr>
          <tr className={styles.tr}>
              <td className={styles.td}>Babbage</td>
            <td className={styles.td}>{result ? result[3] : ""}</td>
            </tr>
          <tr className={styles.tr}>
              <td className={styles.td}>Ada</td>
             <td className={styles.td}>{result ? result[4] : ""}</td>
            </tr>
        </table>

      </main>
    </div>
  );
}
