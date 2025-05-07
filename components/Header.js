import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header({ pageTitle }) {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.mainButton}>
        LUX_TOOLS
      </Link>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
    </header>
  );
}
