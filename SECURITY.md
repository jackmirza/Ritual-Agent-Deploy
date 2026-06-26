# Security

This app is a static wallet dapp. It should never ask for a private key, seed phrase, API key, or keystore password.

Before confirming wallet transactions, check:

- Harness deploy transactions target `SovereignAgentFactory`.
- Funding transactions target the predicted agent harness.
- Top-up transactions target `RitualWallet`.
- Stop and restart transactions target the selected agent address.
- Native value matches the amount shown in the app.

Use a burner wallet on Ritual testnet. Do not connect a wallet with mainnet funds or important assets.

