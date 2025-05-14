import { useState, useMemo } from "react";
import styles from "../styles/UnicodeCleaner.module.css";
import Header from "../components/Header";

export default function UnicodeCleaner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const uniList = ["\u202f", "\u002a"];

  const cleanText = (text) => {
    let cleaned = text;
    for (const uc of uniList) {
      // 특수문자를 이스케이프 처리하여 안전하게 정규식 생성
      const escapedChar = uc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      cleaned = cleaned.replace(new RegExp(escapedChar, "g"), "");
    }
    return cleaned;
  };

  const { highlightedText, detectedPositions } = useMemo(() => {
    if (!input) return { highlightedText: "", detectedPositions: [] };

    const positions = [];
    let text = input;

    uniList.forEach((uc) => {
      let startIndex = 0;
      const escapedChar = uc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escapedChar, "g");

      while (true) {
        const match = regex.exec(text);
        if (!match) break;

        positions.push({
          start: match.index,
          end: match.index + uc.length,
          char: uc,
        });
      }
    });

    // 감지된 위치를 시작 위치 기준으로 정렬
    positions.sort((a, b) => a.start - b.start);

    return {
      highlightedText: input,
      detectedPositions: positions,
    };
  }, [input, uniList]);

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
          <div className={styles.inputWrapper}>
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Input..."
              className={styles.textarea}
            />
            {detectedPositions.length > 0 && (
              <div className={styles.highlightOverlay}>
                {detectedPositions.map((pos, index) => (
                  <div
                    key={index}
                    className={styles.highlight}
                    style={{
                      left: `${(pos.start / input.length) * 100}%`,
                      width: `${((pos.end - pos.start) / input.length) * 100}%`,
                    }}
                    title={`Unicode: ${pos.char.charCodeAt(0).toString(16)}`}
                  />
                ))}
              </div>
            )}
          </div>
          {detectedPositions.length > 0 && (
            <div className={styles.detectionInfo}>
              {detectedPositions.length} Unicode characters detected
            </div>
          )}
        </div>
        <div className={styles.outputSection}>
          <textarea value={output} readOnly className={styles.textarea} />
        </div>
      </div>
    </div>
  );
}
