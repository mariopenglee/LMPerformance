import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
    return (

         <main className={styles.main}>
        <div className={styles.sidenav}>
          <a href="/">About</a>
          <a href="ama">AMA</a>
          <a href="ntp">NTP</a>
        </div>
          <h1>
          Language Model Performance Tool App
          </h1>
        <p>
            Web app made in react. 
        </p>

             </main>
    )
}
