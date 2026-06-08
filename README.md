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

Update the metadata value before the first Vercel deployment:

```tsx
<meta name="base:app_id" content="replace-with-base-dev-value" />
```

Onchain attribution requires the Builder Code after the app has been verified through `base.dev`.

The app passes `dataSuffix` in `lib/wagmi.ts` and also explicitly in each `writeContract` call.

This ensures the Builder Code suffix is included with the relevant onchain transactions.

## Contract Deployment

Deploy the contract located at:

`contracts/StreetCredTap.sol`

Deploy it to Base mainnet.

After deployment, copy the deployed contract address and set:

```bash
NEXT_PUBLIC_STREET_CRED_TAP_ADDRESS=0xYourContract
```

Redeploy the app after changing environment variables.

## Usage

1. Open the app.
2. Connect a supported wallet.
3. Tap the counter.
4. Confirm the transaction in the wallet.
5. Wait for the Base transaction to complete.
6. View the updated tap state in the app.

## Deployment Checklist

1. Deploy `StreetCredTap.sol` to Base mainnet.
2. Replace the `base:app_id` value in `app/layout.tsx`.
3. Set the required Vercel environment variables from `.env.example`.
4. Deploy the app to Vercel.
5. Register and verify the app on `base.dev`.
6. Retrieve the Builder Code.
7. Set `NEXT_PUBLIC_BASE_BUILDER_CODE`.
8. Redeploy the app.
9. Confirm that the Basescan transaction input ends with the encoded Builder Code suffix.
10. Confirm offchain and onchain attribution data in the `base.dev` dashboard.

## Notes

StreetCredTap is intentionally simple.

The app does not include extra mechanics beyond the tap action.

Any contract address, Base app identifier, or Builder Code value should be reviewed before production deployment.

Confirm that the deployed frontend and the deployed contract are configured for the same Base network.

When changing attribution settings, redeploy the app and test with a new transaction.

## License

No license information is provided in the original project documentation.
