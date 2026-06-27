# StreetCredTap

StreetCredTap is a minimal Base Mini App focused on a single onchain action: tapping a counter.

The project is intentionally simple.  
There are no rewards, invite systems, leaderboards, or usage limits.  
Users only pay the required Base network gas for their onchain tap.

Repository: https://github.com/Lynn6382/street-cred-tap.git

## Overview

StreetCredTap provides a small, direct interaction with a smart contract deployed on Base.

The app connects a wallet, lets the user tap, and records that action onchain.

It is designed to be easy to read, easy to deploy, and easy to verify through Base attribution.

## Features

- Minimal Base Mini App experience
- One primary onchain action: tap a counter
- No rewards or invite mechanics
- No usage limits enforced by the app
- Users pay only Base gas
- Wallet support through Wagmi native connectors
- Injected wallet support
- Coinbase Wallet support
- Base offchain attribution support
- Base onchain attribution support through Builder Code
- TypeScript-based application code
- Solidity contract source included in the repository

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Wagmi
- Viem
- Solidity

## Project Structure

The main application code is built with Next.js App Router.

The smart contract source is located at:
