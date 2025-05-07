import { useState } from "react";
import styles from "../styles/UnicodeCleaner.module.css";
import Header from "../components/Header";

export default function UnicodeCleaner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const uniList = [
    "\u200b",
    "\u200c",
    "\u200d",
    "\ufeff",
    "\ufffc",
    "\ufffd",
    "\ufffe",
    "\uffff",
  ];

  const cleanText = (text) => {
    let cleaned = text;
    for (const uc of uniList) {
      cleaned = cleaned.replace(new RegExp(uc, "g"), "");
    }
    return cleaned;
  };

  const handleInputChange = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
    setOutput(cleanText(newInput));
  };

  return (
    <div className={styles.container}>
      <Header pageTitle="Unicode Cleaner" />
      <div className={styles.content}>
        <div className={styles.inputSection}>
          <textarea
            value={input}
            onChange={handleInputChange}
            placeholder="Input..."
            className={styles.textarea}
          />
        </div>
        <div className={styles.outputSection}>
          <textarea value={output} readOnly className={styles.textarea} />
        </div>
      </div>
    </div>
  );
}
