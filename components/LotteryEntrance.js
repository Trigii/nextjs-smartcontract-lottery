import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNotification } from "web3uikit";

export default function LotteryEntrance() {
    // extracting the chainId, abi and contract address to be able to call the smart contract functions
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis(); // moralis knows about the chainId because on the header it passes up the information about the metamask to the moralis provider, and the moralis provider passes it down to all the components inside the moralis provider tags.
    const chainId = parseInt(chainIdHex);
    const raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;
    const [entranceFee, setEntranceFee] = useState("0"); // state hook: "entranceFee" = variable; "setEntranceFee" = function we call to update or set the variable; useState("0") = starting value
    const [numPlayers, setNumPlayers] = useState("0");
    const [recentWinner, setRecentWinner] = useState("0");

    const dispatch = useNotification(); // for sending notifications

    // -------------- OBTAINING THE ENTRANCE FEE --------------
    // function of the smart contract that allows us to retrieve the entrance fee
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    });

    // -------------- ENTERING THE RAFFLE --------------
    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    });

    const handleSuccess = async function (tx) {
        await tx.wait(1); // wait for the transaction to be mined
        handleNewNotification(tx); // trigger a notification
        updateUI(); // update dynamically the UI with new number of players + recent winner
    };

    // notification function
    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        });
    };

    // -------------- GETTING NUMBER OF PLAYERS --------------
    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    });

    // -------------- GETTING RECENT WINNER --------------
    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    });

    // -------------- USE EFFECT --------------
    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString();
        const numPlayersFromCall = (await getNumberOfPlayers()).toString();
        const recentWinnerFromCall = (await getRecentWinner()).toString();
        setEntranceFee(entranceFeeFromCall);
        setNumPlayers(numPlayersFromCall);
        setRecentWinner(recentWinnerFromCall);
    }

    // constantly refreshing and getting the entrance fee, number of players and the recent winner
    // when we connect to the metamask wallet, call "getEntranceFee" function (is an async function but we cant use await inside a useEffect, so we have to create an async function inside -> moved outside so we can call it from the handleSuccess)
    useEffect(() => {
        if (isWeb3Enabled) {
            // try to read the raffle entrance fee + number of players + recent winner
            updateUI();
        }
    }, [isWeb3Enabled]);

    // TODO: set a listener that listens for the event of the winner to be emitted to modify the recent winner.

    return (
        <div className="p-5">
            {raffleAddress ? (
                <div className="">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 round ml-auto"
                        onClick={async function () {
                            await enterRaffle({
                                onSuccess: handleSuccess, // on success only checks if the transaction has been sent successfully to metamask; on success: mine the block + send a notification
                                onError: (error) => console.log(error),
                            });
                        }}
                        disabled={isLoading || isFetching} // if we click the button and metamask is loading or fetching dont allow the user to click it
                    >
                        {isLoading || isFetching ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div>Enter Raffle</div>
                        )}
                    </button>
                    <div>
                        Entrance Fee: {ethers.utils.formatUnits(entranceFee.toString(), "ether")}{" "}
                        ETH{" "}
                    </div>
                    <div>Number of Players: {numPlayers}</div>
                    <div>Recent Winner: {recentWinner}</div>
                </div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>
    );
}
