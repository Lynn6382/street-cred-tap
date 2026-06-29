# StreetCredTap

StreetCredTap is a minimal Base Mini App built around one simple onchain action: tapping a counter.

The project is intentionally small and focused.  
There are no rewards, invite systems, leaderboards, or app-level usage limits.  
Each tap is recorded onchain, and the only required cost is the Base network gas for the transaction.

Repository: https://github.com/Lynn6382/street-cred-tap.git

## Overview

StreetCredTap provides a direct interaction with a smart contract deployed on Base.

The app connects a wallet, lets the user tap a counter, and records that tap onchain.

It is designed to be easy to read, easy to deploy, and easy to verify using Base attribution.

The application keeps the experience intentionally simple so the onchain flow remains clear.

## Features

- Minimal Base Mini App experience
- One primary onchain action: tap a counter
- No rewards or invite mechanics
- No leaderboards
- No app-level usage limits
- Users pay only the required Base network gas
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

The main application is built with the Next.js App Router.

The smart contract source is located at:

```text
contracts/StreetCredTap.sol
```

Base attribution metadata is configured in:

```text
app/layout.tsx
```

Wagmi and chain configuration are handled in:

```text
lib/wagmi.ts
```

## Base Attribution

StreetCredTap supports Base attribution for both offchain and onchain activity.

For offchain attribution, the app includes a metadata value in `app/layout.tsx`.

Before the first Vercel deployment, replace the placeholder value in the `base:app_id` metadata entry with the value provided by `base.dev`.

Example:

```tsx
<meta name="base:app_id" content="replace-with-base-dev-verify-value" />
```
