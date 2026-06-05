# Street Cred Tap

Street Cred Tap is a minimal Base Mini App for one onchain action: tapping a counter.

- No token
- No rewards
- No invites
- No usage limits
- Users only pay Base gas
- Wallet support through Wagmi native connectors: injected wallets and Coinbase Wallet

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Wagmi
- Viem

## Base Attribution

Offchain attribution requires a hardcoded tag in `app/layout.tsx`:

```tsx
<meta name="base:app_id" content="replace-with-base-dev-verify-token" />
```

Replace the placeholder with the `base.dev` Verify token before the first Vercel deployment.

Onchain attribution requires the Builder Code after `base.dev` verification. Set it as:

```bash
NEXT_PUBLIC_BASE_BUILDER_CODE=bc_xxxxxx
```

The app passes `dataSuffix` both in `lib/wagmi.ts` and explicitly in every `writeContract` call.

## Contract

The Solidity source is in `contracts/StreetCredTap.sol`.

After deployment on Base mainnet, set:

```bash
NEXT_PUBLIC_STREET_CRED_TAP_ADDRESS=0xYourContract
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deployment Checklist

1. Deploy `StreetCredTap.sol` to Base mainnet.
2. Replace `base:app_id` in `app/layout.tsx`.
3. Set Vercel environment variables from `.env.example`.
4. Deploy to Vercel.
5. Register and verify the app on `base.dev`.
6. Get the Builder Code.
7. Set `NEXT_PUBLIC_BASE_BUILDER_CODE`.
8. Redeploy.
9. Confirm Basescan transaction input ends with the encoded Builder Code suffix.
10. Confirm offchain and onchain data in the `base.dev` dashboard.
