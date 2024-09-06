import Image from "next/image";
import ManualHeader from "../components/ManualHeader";
import styles from "../styles/Home.module.css";

export default function Home() {
    return (
        <div className={styles.container}>
            <ManualHeader />
            How are you!
        </div>
    );
}
