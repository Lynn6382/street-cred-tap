"use client";

import { QueryClient } from "@tanstack/react-query";
import type { EIP1193Provider } from "viem";
import { http, createConfig } from "wagmi";
import { base } from "wagmi/chains";
import { coinbaseWallet, injected } from "wagmi/connectors";
import { ATTRIBUTION_DATA_SUFFIX } from "./attribution";

export const queryClient = new QueryClient();

type InjectedProvider = EIP1193Provider & {
  isOkxWallet?: true;
  isOKExWallet?: true;
  providers?: InjectedProvider[];
};

type WalletWindow = Window & {
  ethereum?: InjectedProvider;
  okxwallet?: InjectedProvider & {
    ethereum?: InjectedProvider;
  };
};

const findOkxProvider = (windowObject?: unknown) => {
  const walletWindow = windowObject as WalletWindow | undefined;
  const okxWallet = walletWindow?.okxwallet;

  if (okxWallet?.ethereum) return okxWallet.ethereum;
  if (okxWallet?.request) return okxWallet;

  const providers = walletWindow?.ethereum?.providers ?? [];
  const okxFromProviderList = providers.find(
    (provider) => provider.isOkxWallet || provider.isOKExWallet,
  );

  if (okxFromProviderList) return okxFromProviderList;
  if (
    walletWindow?.ethereum?.isOkxWallet ||
    walletWindow?.ethereum?.isOKExWallet
  ) {
    return walletWindow.ethereum;
  }

  return undefined;
};

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({
      target: "metaMask",
      shimDisconnect: true,
    }),
    injected({
      target: {
        id: "okxWallet",
        name: "OKX Wallet",
        provider: findOkxProvider,
      },
      shimDisconnect: true,
      unstable_shimAsyncInject: 1_000,
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
