# StreetCredTap

StreetCredTap is a minimal Base Mini App focused on one simple onchain action: tapping a counter.

The project keeps the experience intentionally small and direct. Users connect a supported wallet, tap, and submit a transaction on Base.

Repository: https://github.com/Lynn6382/street-cred-tap.git

## Overview

StreetCredTap is designed around a single contract interaction.

There are no rewards, invites, or usage limits built into the app.

Users only pay the Base network gas required for their transaction.

Wallet support is provided through Wagmi native connectors, including injected wallets and Coinbase Wallet.

## Features

- Minimal Base Mini App experience
- One primary onchain action: tap a counter
- Next.js App Router structure
- TypeScript project setup
- Tailwind CSS styling
- Wagmi wallet integration
- Viem contract interaction support
- Base attribution support through app metadata and Builder Code
- Solidity contract included in the repository

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Wagmi
- Viem
- Solidity

## Project Structure

The Solidity contract source is located at:

`contracts/StreetCredTap.sol`

The Base app metadata is configured in:

`app/layout.tsx`

Wagmi configuration is handled in:

`lib/wagmi.ts`

Environment variables should be based on:

`.env.example`

## Local Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

## Environment Variables

After deploying the contract on Base mainnet, set the contract address:

```bash
NEXT_PUBLIC_STREET_CRED_TAP_ADDRESS=0xYourContract
```

After completing Base verification and receiving a Builder Code, set:

```bash
NEXT_PUBLIC_BASE_BUILDER_CODE=bc_xxxxxx
```

Use `.env.example` as the reference for required environment configuration.

## Base Attribution

Offchain attribution requires a hardcoded app identifier in `app/layout.tsx`.
