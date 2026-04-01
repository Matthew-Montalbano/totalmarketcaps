import Link from "next/link";
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
          <Link href={"/"}>Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href={"/stocks"}>Stocks</Link>
        </li>
        <li className={styles.navItem}>
          <Link href={"/crypto"}>Crypto</Link>
        </li>
        <li className={styles.navItem}>
          <Link href={"/commodities"}>Commodities</Link>
        </li>
        <li className={styles.navItem}>
          <Link href={"/forex"}>Foreign Exchange</Link>
        </li>
        <li className={styles.navItem}>
          <Link href={"/about"}>About</Link>
        </li>
      </ul>
    </nav>
  );
}
