import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
    return (

         <main className={styles.main}>
        <div className={styles.sidenav}>
          <a href="#">About</a>
          <a href="ama">AMA</a>
          <a href="#">NTP</a>
        </div>
        <p>
            Must try examples to see ADA's superior intelligence:
            If someone is in my way, I will
            My favorite programming language is
            I was programmed in
        </p>

             </main>
    )
}