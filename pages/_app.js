// pages/_app.js
import styles from "../styles/Home.module.css";
import { MoralisProvider } from "react-moralis";
import { NotificationProvider } from "web3uikit";

// all of our components and pages run through this app
function MyApp({ Component, pageProps }) {
    // initializeOnMount -> ability to hook into a server to add more features to a website
    return (
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
    );
}

export default MyApp;
