export const FACTORY_ADDRESS = "0x9dC4C054e53bCc4Ce0A0Ff09E890A7a8e817f304";
export const RITUAL_WALLET_ADDRESS = "0x532F0dF0896F353d8C3DD8cc134e8129DA2a3948";
export const REGISTRY_ADDRESS = "0x9644e8562cE0Fe12b4deeC4163c064A8862Bf47F";

export const FACTORY_ABI = [
  {
    type: "function",
    name: "predictHarness",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "salt", type: "bytes32" },
    ],
    outputs: [
      { name: "harness", type: "address" },
      { name: "actualSalt", type: "bytes32" },
    ],
  },
  {
    type: "function",
    name: "deployHarness",
    stateMutability: "nonpayable",
    inputs: [{ name: "salt", type: "bytes32" }],
    outputs: [],
  },
];

const STRING_TRIPLE_COMPONENTS = [
  { name: "key", type: "string" },
  { name: "value", type: "string" },
  { name: "metadata", type: "string" },
];

const CONFIG_PARAMS_COMPONENTS = [
  { name: "executor", type: "address" },
  { name: "payment", type: "uint256" },
  { name: "input", type: "bytes" },
  { name: "maxDuration", type: "uint64" },
  { name: "maxPollBlock", type: "uint64" },
  { name: "programId", type: "string" },
  { name: "deliveryAddress", type: "address" },
  { name: "deliverySelector", type: "bytes4" },
  { name: "callbackGasLimit", type: "uint256" },
  { name: "gasPrice", type: "uint256" },
  { name: "maxPrice", type: "uint256" },
  { name: "cliType", type: "uint16" },
  { name: "prompt", type: "string" },
  { name: "encryptedEnv", type: "bytes" },
  { name: "inputRef", type: "tuple", components: STRING_TRIPLE_COMPONENTS },
  { name: "outputRef", type: "tuple", components: STRING_TRIPLE_COMPONENTS },
  { name: "assetRefs", type: "tuple[]", components: STRING_TRIPLE_COMPONENTS },
  { name: "proofRef", type: "tuple", components: STRING_TRIPLE_COMPONENTS },
  { name: "model", type: "string" },
  { name: "modelArgs", type: "string[]" },
  { name: "temperature", type: "uint16" },
  { name: "maxTokens", type: "uint32" },
  { name: "extra", type: "string" },
];

const SCHEDULE_COMPONENTS = [
  { name: "callbackGasLimit", type: "uint32" },
  { name: "period", type: "uint32" },
  { name: "payment", type: "uint32" },
  { name: "gasPrice", type: "uint256" },
  { name: "maxPrice", type: "uint256" },
  { name: "startBlock", type: "uint256" },
];

const ROLLING_COMPONENTS = [
  { name: "enabled", type: "uint32" },
  { name: "window", type: "uint16" },
  { name: "repeat", type: "uint16" },
];

export const HARNESS_ABI = [
  {
    type: "function",
    name: "configured",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    type: "function",
    name: "wakeMode",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint8" }],
  },
  {
    type: "function",
    name: "restart",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "stop",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "configureFundAndStart",
    stateMutability: "payable",
    inputs: [
      { name: "params", type: "tuple", components: CONFIG_PARAMS_COMPONENTS },
      { name: "schedule", type: "tuple", components: SCHEDULE_COMPONENTS },
      { name: "rolling", type: "tuple", components: ROLLING_COMPONENTS },
      { name: "lockBlocks", type: "uint256" },
    ],
    outputs: [],
  },
];

export const RITUAL_WALLET_ABI = [
  {
    type: "function",
    name: "balanceOf",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "lockUntil",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    type: "function",
    name: "depositFor",
    stateMutability: "payable",
    inputs: [
      { name: "account", type: "address" },
      { name: "lockBlocks", type: "uint256" },
    ],
    outputs: [],
  },
];

export const REGISTRY_ABI = [
  {
    type: "function",
    name: "getServicesByCapability",
    stateMutability: "view",
    inputs: [
      { name: "capability", type: "uint8" },
      { name: "valid", type: "bool" },
    ],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          {
            name: "node",
            type: "tuple",
            components: [
              { name: "paymentAddress", type: "address" },
              { name: "teeAddress", type: "address" },
              { name: "teeType", type: "uint8" },
              { name: "publicKey", type: "bytes" },
              { name: "endpoint", type: "string" },
              { name: "certPubKeyHash", type: "bytes32" },
              { name: "capability", type: "uint8" },
            ],
          },
          { name: "isValid", type: "bool" },
          { name: "workloadId", type: "bytes32" },
        ],
      },
    ],
  },
];

