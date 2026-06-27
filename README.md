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

```text
contracts/StreetCredTap.sol
```

Base attribution metadata is configured in:

```text
app/layout.tsx
```

Wagmi and related chain configuration is handled in:

```text
lib/wagmi.ts
```

## Base Attribution

StreetCredTap supports Base attribution for both offchain and onchain activity.

For offchain attribution, the app includes a hardcoded metadata value in `app/layout.tsx`.

Before the first Vercel deployment, replace the placeholder value in the `base:app_id` metadata entry with the value provided by `base.dev`.

Example:

```tsx
<meta name="base:app_id" content="replace-with-base-dev-verify-value" />
```

For onchain attribution, verify the app on `base.dev` and obtain the Builder Code.

Set the Builder Code as an environment variable:

```bash
NEXT_PUBLIC_BASE_BUILDER_CODE=bc_xxxxxx
```

The app passes `dataSuffix` in `lib/wagmi.ts`.

The app also passes `dataSuffix` explicitly in every `writeContract` call.

## Contract

The Solidity contract source is included at:

```text
contracts/StreetCredTap.sol
```

Deploy the contract to Base mainnet before using the production app.

After deployment, set the contract address with:

```bash
NEXT_PUBLIC_STREET_CRED_TAP_ADDRESS=0xYourContract
```

## Environment Variables

Create a local environment file based on the example file:

```bash
cp .env.example .env.local
```

Then set the required values.

At minimum, configure the deployed contract address:

```bash
NEXT_PUBLIC_STREET_CRED_TAP_ADDRESS=0xYourContract
```

For Base onchain attribution, also configure:

```bash
NEXT_PUBLIC_BASE_BUILDER_CODE=bc_xxxxxx
```

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:3000
```

## Usage

Connect a supported wallet.

Make sure the wallet is connected to Base.

Tap the counter.

Confirm the transaction in the wallet.

After confirmation, the tap is recorded onchain by the deployed `StreetCredTap` contract.

## Deployment
