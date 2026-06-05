"use client";

import { QueryClient } from "@tanstack/react-query";
import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";
import { ATTRIBUTION_DATA_SUFFIX } from "./attribution";

export const queryClient = new QueryClient();

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({
      target: "metaMask",
      shimDisconnect: true,
    }),
    injected({
      target: "okxWallet",
      shimDisconnect: true,
    }),
    injected({
      shimDisconnect: true,
    }),
    coinbaseWallet({
      appName: "Street Cred Tap",
      preference: "all",
    }),
  ],
  ssr: true,
  transports: {
    [base.id]: http(process.env.NEXT_PUBLIC_BASE_RPC_URL),
  },
  dataSuffix: ATTRIBUTION_DATA_SUFFIX as `0x${string}`,
});
