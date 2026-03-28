import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "start",
          alignItems: "center",
          height: "4em",
          marginLeft: "1em",
        }}
      >
        <li className={styles.navItem}>
          <a href="/">Home</a>
        </li>
        <li className={styles.navItem}>
          <a href="news.html">Commodities</a>
        </li>
        <li className={styles.navItem}>
          <a href="contact.html">Crytpo</a>
        </li>
        <li className={styles.navItem}>
          <a href="about.html">About</a>
        </li>
      </ul>
    </nav>
  );
}
