import Image from "next/image";
// import ManualHeader from "../components/ManualHeader";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import LotteryEntrance from "../components/LotteryEntrance";

export default function Home() {
    return (
        <div className={styles.container}>
            {/*<ManualHeader />*/}
            <Header />
            <LotteryEntrance />
        </div>
    );
}
