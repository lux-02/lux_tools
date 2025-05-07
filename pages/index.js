import Link from "next/link";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.title}>LUX_TOOLS</div>
        <div className={styles.grid}>
          <Link href="/unicode-cleaner" className={styles.card}>
            <h2>Unicode Cleaner &rarr;</h2>
            <p>Remove unnecessary Unicode characters.</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
