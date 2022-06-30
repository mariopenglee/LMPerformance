import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Ama() {
  const [promptInput, setpromptInput] = useState("");
  const [apiInput, setapiInput] = useState("");
  const [loadingText, setloadingText] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    setResult(["loading..." + " \n",
                        "loading..." + " \n",
                        "loading..." + " \n",
                        "loading..." + " \n",
                        "loading..." + " \n"]);
    setloadingText("generating... do not call for another response.");

    const response = await fetch("/api/amagen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptInput + "|" + apiInput}),
    });
    await console.log(result)
    const data = await response.json();
    setResult(data.result);
    setpromptInput("");
    setloadingText("");
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
        <form>
          <input
            type="text"
            name="api"
            placeholder="insert your open AI API key"
            value={apiInput}
            onChange={(e) => setapiInput(e.target.value)}
          />
        </form>
        <h3>Ask Me Anything</h3>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Enter a question"
            value={promptInput}
            onChange={(e) => setpromptInput(e.target.value)}
          />
          <input type="submit" value="Get Response"/>
        </form>
        <p> {loadingText} </p>
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
