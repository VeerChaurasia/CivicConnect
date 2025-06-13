# 🪩 CivicConnect — Web3 Event Discovery with Seamless Authentication + Embedded Wallets + NFT Badges

**CivicConnect** is a Web3-native event discovery platform where users can **explore upcoming blockchain events**, **sign in securely using Civic Auth**, and **receive on-chain NFT badges** as proof of participation — all without having to manage or connect an external wallet.
---

## 🚨 Problem

Web3 adoption is still limited by **onboarding friction**:

- Users need to discover events through scattered platforms like Twitter, Telegram, or Discord.
- Even if they find events, **registering for them typically requires connecting a wallet** like MetaMask or Phantom — which many new users find confusing.
- Wallets require managing private keys, signing transactions, switching networks, and understanding gas fees — a non-starter for non-technical or mainstream users.
- This results in **poor UX, massive drop-offs, and lower event participation**.

---

## 🌟 Our Solution: CivicConnect

CivicConnect eliminates this friction by offering:

1. **Simple Authentication**:
   - Users log in using familiar methods: Google, Discord, GitHub, etc.
   - No wallets or seed phrases to set up.
   - Authentication is handled by **Civic Auth**, which verifies identity and session state securely.

2. **Embedded Wallet Creation**:
   - Upon login, **Civic Auth** also **provisions a secure embedded Ethereum wallet** for the user.
   - This wallet is silently and securely generated and managed by Civic — fully compliant, and recoverable.
   - We can fetch this wallet's Ethereum address to interact with smart contracts on behalf of the user.

3. **One-Click Event Registration + NFT Minting**:
   - The user simply clicks **Register**, and our system mints a unique NFT badge (proof-of-participation) directly to their Civic-linked wallet.
   - **No need for MetaMask popups, gas configuration, or transaction signing.**

---

## ✨ Key Features

| Feature                           | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
| 🔐 Civic Authentication          | Seamless OAuth-based identity management with wallet creation              |
| 🪪 Embedded Ethereum Wallet      | Secure, gasless wallet managed by Civic, bound to user identity            |                    |
| 📝 One-Click Registration        | No wallet prompts, instant registration                                     |
| 🧾 NFT Attendance Badges         | Unique NFTs minted as proof of attendance                                   |
| 📱  Fully Responsive         | Works seamlessly across desktop and mobile devices             |
| 🪙 Soulbound Tokens (Optional)   | NFTs are non-transferable, ensuring authenticity                            |
| 🧭 Fully On-Chain                | All NFTs are minted on Sepolia Testnet for demo                            |
| ☁️ Deployed on Vercel           | Publicly accessible link with Civic integration                            |

---

## 🧰 Tech Stack

| Layer             | Tools/Tech                            |
|------------------|---------------------------------------|
| Frontend         | React, Tailwind CSS                   |
| Authentication   | Civic Auth Web3 SDK                   |
| Wallets          | Embedded via Civic                    |
| Blockchain       | Ethereum (Sepolia Testnet) via Ethers.js |
| NFT Minting      | ERC-721 Smart Contract                |
| Hosting          | Vercel                                |

---

## 🧪 How Civic Auth Powers CivicConnect

Civic Auth is **not just a sign-in tool** — it's an all-in-one identity + wallet infrastructure layer for Web3 apps.


✅ **What Civic Helps Solve**

| **Friction Point**                             | **How Civic Solves It**                                               |
|------------------------------------------------|------------------------------------------------------------------------|
| Users don’t want to set up a wallet            | 🎉 Civic automatically provisions a secure embedded wallet             |
| Users don’t understand gas & signing           | 🚫 No manual signing needed — everything handled silently              |
| Events require manual check-ins or forms       | 🧾 Register with one click; NFT minted as proof-of-attendance          |
| Developers must build auth + wallet infra      | 🧰 Civic provides a unified SDK for both auth and wallet               |



### 🔐 Authentication
- OAuth-based login (Google, Discord, GitHub)
- Session persistence, identity binding
- All users authenticated and verifiable

### 👛 Embedded Wallets
- A full-featured Ethereum wallet is **generated for each user upon sign-in**
- Wallet keys are managed by Civic’s secure wallet service
- Users don’t need to know anything about seed phrases, gas, or wallet management

