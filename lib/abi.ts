export const streetCredTapAbi = [
  {
    type: "function",
    name: "tap",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "totalTaps",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "userTaps",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "event",
    name: "Tapped",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "userTaps", type: "uint256", indexed: false },
      { name: "totalTaps", type: "uint256", indexed: false },
    ],
    anonymous: false,
  },
] as const;
