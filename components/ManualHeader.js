// this module contains the implementation to connect to the wallet in a manual way
import { useMoralis } from "react-moralis";
import { useEffect } from "react";

export default function ManualHeader() {
    const { enableWeb3, isWeb3Enabled, account, Moralis, deactivateWeb3, isWeb3EnableLoading } =
        useMoralis(); // useMoralis is a react hook that allows to keep state in our apps; enableWeb3 is the equivalent to ethers `eth_equestAccounts`; isWeb3Enabled checks if the user has metamask; isWeb3EnableLoading checks if metamask is popped up

    // useEffect takes 2 parameters:
    // Parameter 1: function
    // Parameter 2 (optional): dependency array -> checks the values in the dependency array and if something changes it will call the function in parameter 1 and re-render the frontend.
    // If no dependency array, it will run anytime something re-renders -> Careful with circular renders!!
    // If blank dependency array, it will run once
    useEffect(() => {
        if (isWeb3Enabled) {
            return; // if we are connected dont do anything
        } else {
            if (typeof window != "undefined") {
                if (window.localStorage.getItem("connected")) {
                    enableWeb3(); // if we are not connected to web3 and we dont have an account, connect
                }
            }
        }
        console.log("Hi!");
        console.log(isWeb3Enabled);
    }, [isWeb3Enabled]);

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`);
            if (account == null) {
                // acount disconnected
                window.localStorage.removeItem("connected");
                deactivateWeb3(); // set "isWeb3Enabled" to false
                console.log("Null account found");
            }
        });
    });

    // {} is to inject javascript
    return (
        <div>
            {account ? (
                <div>
                    Connected to {account.slice(0, 6)}...{account.slice(account.length - 4)}
                </div>
            ) : (
                <button
                    onClick={async () => {
                        await enableWeb3();
                        if (typeof window != "undefined") {
                            window.localStorage.setItem("connected", "injected"); // in our window we set a new key-value item (connected -> injected) to keep track if we are connected our not
                        }
                    }}
                    disabled={isWeb3EnableLoading} // when metamask is popped up, the connect button cant be clicked
                >
                    Connect
                </button>
            )}
        </div>
    );
}
