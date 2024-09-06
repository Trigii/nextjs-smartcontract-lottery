// this module contains the implementation to connect to the wallet
import { useMoralis } from "react-moralis";

export default function Header() {
    const { enableWeb3 } = useMoralis();

    return <div>Hi from Header!</div>;
}
