"use client";

import { useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { base } from "wagmi/chains";
import { streetCredTapAbi } from "@/lib/abi";
import { ATTRIBUTION_DATA_SUFFIX, BUILDER_CODE, hasBuilderCode } from "@/lib/attribution";
import { STREET_CRED_TAP_ADDRESS, isContractConfigured } from "@/lib/contracts";

const APP_URL = "https://street-cred-tap.vercel.app";
const OKX_DEEPLINK = `https://www.okx.com/download?deeplink=${encodeURIComponent(
  APP_URL,
)}`;

const formatCount = (value: bigint | undefined) =>
  new Intl.NumberFormat("en-US").format(Number(value ?? 0n));

const shortenAddress = (address?: `0x${string}`) =>
  address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected";

const connectorLabel = (id: string, name: string) => {
  const normalized = `${id} ${name}`.toLowerCase();
  if (normalized.includes("coinbase")) return "Coinbase Wallet";
  if (normalized.includes("okx")) return "OKX Wallet";
  if (normalized.includes("meta")) return "MetaMask";
  if (normalized.includes("injected")) return "Browser Wallet";
  return name;
};

export function StreetCredApp() {
  const [walletOpen, setWalletOpen] = useState(false);
  const [lastHash, setLastHash] = useState<`0x${string}` | undefined>();
  const [txError, setTxError] = useState<string | undefined>();
  const { address, isConnected, chainId, connector } = useAccount();
  const { connectors, connect, isPending: isConnecting, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const { writeContract, isPending: isWriting } = useWriteContract();

  const connectorChoices = useMemo(() => {
    const seen = new Set<string>();
    return connectors.filter((item) => {
      const label = connectorLabel(item.id, item.name);
      if (seen.has(label)) return false;
      seen.add(label);
      return true;
    });
  }, [connectors]);

  const myTaps = useReadContract({
    address: STREET_CRED_TAP_ADDRESS,
    abi: streetCredTapAbi,
    functionName: "userTaps",
    args: address ? [address] : undefined,
    query: {
      enabled: isContractConfigured && Boolean(address),
    },
  });

  const totalTaps = useReadContract({
    address: STREET_CRED_TAP_ADDRESS,
    abi: streetCredTapAbi,
    functionName: "totalTaps",
    query: {
      enabled: isContractConfigured,
    },
  });

  const receipt = useWaitForTransactionReceipt({
    hash: lastHash,
    query: {
      enabled: Boolean(lastHash),
    },
  });

  const myTapsRefetch = myTaps.refetch;
  const totalTapsRefetch = totalTaps.refetch;

  useEffect(() => {
    if (!receipt.isSuccess || !lastHash) return;
    void myTapsRefetch();
    void totalTapsRefetch();
  }, [receipt.isSuccess, lastHash, myTapsRefetch, totalTapsRefetch]);

  const wrongNetwork = isConnected && chainId !== base.id;
  const tapDisabled =
    !isContractConfigured ||
    !isConnected ||
    wrongNetwork ||
    isWriting ||
    receipt.isLoading;

  const transactionStatus = txError
    ? "Failed"
    : receipt.isLoading
      ? "Pending"
      : receipt.isSuccess
        ? "Success"
        : lastHash
          ? "Submitted"
          : "Ready";

  const handleTap = () => {
    setTxError(undefined);
    if (!isConnected) {
      setWalletOpen(true);
      return;
    }
    if (wrongNetwork) {
      switchChain({ chainId: base.id });
      return;
    }
    writeContract(
      {
        address: STREET_CRED_TAP_ADDRESS,
        abi: streetCredTapAbi,
        functionName: "tap",
        dataSuffix: ATTRIBUTION_DATA_SUFFIX as `0x${string}`,
      },
      {
        onSuccess: (hash) => {
          setLastHash(hash);
        },
        onError: (error) => {
          setTxError(error.message);
        },
        onSettled: () => {
          void myTaps.refetch();
          void totalTaps.refetch();
        },
      },
    );
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#0d0d0d] text-white">
      <div className="street-noise absolute inset-0 opacity-70" />
      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-5 sm:px-6 lg:px-10">
        <header className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[0.68rem] font-black uppercase tracking-[0.32em] text-[#0052ff]">
              Base Onchain Counter
            </p>
            <h1 className="font-black uppercase leading-[0.86] tracking-normal text-[clamp(2.55rem,12vw,7.5rem)]">
              Street
              <span className="block text-[#f9f5e8]">Cred Tap</span>
            </h1>
          </div>
          <button
            type="button"
            onClick={() => (isConnected ? disconnect() : setWalletOpen(true))}
            className="inline-flex h-11 shrink-0 items-center justify-center border-2 border-white bg-[#0052ff] px-3 text-xs font-black uppercase text-white shadow-[5px_5px_0_#f4d03f] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            {isConnected ? "Disconnect" : "Connect"}
          </button>
        </header>

        <div className="grid flex-1 items-center gap-6 py-7 lg:grid-cols-[1.08fr_0.92fr] lg:py-10">
          <section className="relative">
            <div className="poster-edge relative border-4 border-white bg-[#f9f5e8] p-4 text-[#0d0d0d] shadow-[12px_12px_0_#0052ff] sm:p-6">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="sticker bg-[#ff3b30] text-white">No token</span>
                <span className="sticker bg-[#f4d03f] text-black">Gas only</span>
                <span className="sticker bg-[#0052ff] text-white">Base</span>
              </div>

              <button
                type="button"
                disabled={tapDisabled}
                onClick={handleTap}
                className="w-full border-4 border-black bg-[#0052ff] px-5 py-7 text-center text-[clamp(2.2rem,12vw,6.25rem)] font-black uppercase leading-none text-white shadow-[8px_8px_0_#0d0d0d] transition hover:-translate-y-1 disabled:cursor-not-allowed disabled:bg-zinc-500 disabled:text-zinc-200 disabled:shadow-none"
              >
                {wrongNetwork ? "Switch Base" : receipt.isLoading ? "Tapping..." : "Tap Onchain"}
              </button>

              <p className="mt-5 max-w-xl text-sm font-bold uppercase leading-5 text-[#161616] sm:text-base">
                One tap. One Base transaction. Instant counters with no points, no token, no rewards, and no limits.
              </p>
            </div>
          </section>

          <section className="grid gap-3">
            <div className="counter-tile bg-white text-black">
              <span>My Taps</span>
              <strong>{formatCount(myTaps.data)}</strong>
            </div>
            <div className="counter-tile border-[#0052ff] bg-[#0052ff] text-white">
              <span>Total Taps</span>
              <strong>{formatCount(totalTaps.data)}</strong>
            </div>
            <div className="info-grid">
              <div className="info-panel">
                <span>Wallet Status</span>
                <strong>{isConnected ? shortenAddress(address) : "Not connected"}</strong>
                <small>{isConnected ? connector?.name ?? "Wallet connected" : "Choose a wallet to tap"}</small>
              </div>
              <div className="info-panel">
                <span>Last Transaction</span>
                <strong>{transactionStatus}</strong>
                <small>
                  {lastHash ? (
                    <a
                      href={`https://basescan.org/tx/${lastHash}`}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-[#0052ff] underline-offset-4"
                    >
                      {shortenAddress(lastHash)}
                    </a>
                  ) : (
                    "No tap sent yet"
                  )}
                </small>
              </div>
            </div>

            <div className="border-2 border-dashed border-white/40 bg-black/45 p-3 text-xs font-bold uppercase leading-5 text-white/80">
              Contract: {isContractConfigured ? shortenAddress(STREET_CRED_TAP_ADDRESS) : "Not configured"}
              <br />
              Attribution: {hasBuilderCode ? BUILDER_CODE : "Builder code pending"}
            </div>

            {(connectError || txError || myTaps.error || totalTaps.error || !isContractConfigured) && (
              <div className="border-2 border-[#ff3b30] bg-[#ff3b30] p-3 text-sm font-black text-white">
                {!isContractConfigured
                  ? "Contract address is not configured yet."
                  : txError ?? connectError?.message ?? myTaps.error?.message ?? totalTaps.error?.message}
              </div>
            )}
          </section>
        </div>

        <footer className="pb-2 text-[0.68rem] font-black uppercase tracking-[0.26em] text-white/55">
          Built for Base App. Standard wallet transactions only.
        </footer>
      </section>

      {walletOpen && (
        <div className="fixed inset-0 z-50 grid place-items-end bg-black/70 p-3 sm:place-items-center">
          <div className="w-full max-w-md border-4 border-white bg-[#111] p-4 shadow-[10px_10px_0_#0052ff]">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black uppercase">Choose Wallet</h2>
                <p className="text-sm font-bold uppercase text-white/60">
                  Coinbase, OKX, MetaMask, or the Base App wallet.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setWalletOpen(false)}
                className="h-10 w-10 border-2 border-white bg-white text-xl font-black text-black"
                aria-label="Close wallet menu"
              >
                X
              </button>
            </div>
            <div className="grid gap-2">
              {connectorChoices.map((item) => (
                <button
                  type="button"
                  key={`${item.uid}-${item.id}`}
                  onClick={() =>
                    connect(
                      { connector: item, chainId: base.id },
                      {
                        onSuccess: () => setWalletOpen(false),
                      },
                    )
                  }
                  disabled={isConnecting}
                  className="flex items-center justify-between border-2 border-white bg-white px-4 py-4 text-left text-black transition hover:bg-[#f4d03f] disabled:opacity-60"
                >
                  <span className="text-lg font-black uppercase">
                    {connectorLabel(item.id, item.name)}
                  </span>
                  <span className="text-xs font-black uppercase text-[#0052ff]">
                    {isConnecting ? "Opening" : "Connect"}
                  </span>
                </button>
              ))}
              <a
                href={OKX_DEEPLINK}
                className="flex items-center justify-between border-2 border-[#0052ff] bg-[#0052ff] px-4 py-4 text-left text-white transition hover:bg-[#003fca]"
              >
                <span className="text-lg font-black uppercase">Open in OKX Wallet</span>
                <span className="text-xs font-black uppercase text-white/80">Mobile</span>
              </a>
            </div>
            <button
              type="button"
              onClick={() => switchChain({ chainId: base.id })}
              disabled={!isConnected || !wrongNetwork || isSwitching}
              className="mt-3 w-full border-2 border-[#0052ff] px-4 py-3 text-sm font-black uppercase text-white disabled:opacity-40"
            >
              {isSwitching ? "Switching..." : "Switch to Base"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
