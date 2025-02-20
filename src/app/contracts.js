export const wagmiContractConfig = {
  address: "0xb24e7b8e653913b8c0ab771ccce9276bc9fb46c3",
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "when",
          type: "uint256",
        },
      ],
      name: "CountDecreased",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "newCount",
          type: "uint256",
        },
      ],
      name: "CountUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "when",
          type: "uint256",
        },
      ],
      name: "CounterIncreased",
      type: "event",
    },
    {
      inputs: [],
      name: "checkMaxValue",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [],
      name: "count",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decreaseByOne",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
      name: "decreaseValueBy",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getCount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_value", type: "uint256" }],
      name: "increaseValueBy",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "increasedByOne",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "resetCount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
