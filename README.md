# NextJS Smartcontract Lottery (Raffle)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

```sh
git clone https://github.com/Trigii/nextjs-smartcontract-lottery.git
cd nextjs-smartcontract-lottery
yarn
yarn dev
```

## Usage

1. Run your local blockchain with the lottery code

> In a different terminal / command line

```sh
git clone https://github.com/Trigii/hardhat-smartcontract-lottery.git
cd hardhat-fund-me-fcc
yarn
yarn hardhat node
```

> You can read more about how to use that repo from its README.md

2. Add hardhat network to your metamask/wallet

-   Get the RPC_URL of your hh node (usually http://127.0.0.1:8545/)
-   Go to your wallet and add a new network. See instructions here. - Network Name: Hardhat-Localhost - New RPC URL: http://127.0.0.1:8545/ - Chain ID: 31337 - Currency Symbol: ETH (or GO) - Block Explorer URL: None
    Ideally, you'd then import one of the accounts from hardhat to your wallet/metamask.

3. Run this code

Back in a different terminal with the code from this repo, run:

```sh
yarn dev
```

4. Go to UI and have fun!

Head over to your localhost and play with the lottery!
