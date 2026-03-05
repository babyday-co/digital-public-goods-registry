# BabyDay Digital Public Goods Registry

> A minimal Next.js full-stack demo showing how **BabyDay** uses blockchain to verify and attribute digital public goods related to child health knowledge.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-grey?logo=solidity)](https://soliditylang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Overview

This repository demonstrates how BabyDay can use blockchain technology to **verify and attribute** trusted child-health knowledge resources.

Healthcare guidance for parents and newborns must be traceable and tamper-proof. This demo shows how knowledge can be submitted, cryptographically hashed, registered on-chain, and later verified by anyone — without requiring trust in a central authority.

---

## The Problem

Parents often rely on fragmented or unverified information online when it comes to newborn care and early childhood health. Digital public goods related to child health must be:

- **Trusted** — authored by qualified experts
- **Traceable** — clearly attributed to a contributor
- **Tamper-evident** — any modification should be immediately detectable

---

## The Solution

BabyDay uses blockchain to provide:

| Property | How |
|---|---|
| **Content integrity** | SHA-256 hash of every entry stored on-chain |
| **Transparent attribution** | Contributor address + timestamp permanently recorded |
| **Tamper-resistant verification** | Anyone can re-hash content and compare against the registry |

---

## How the Demo Works

```
Contributor submits knowledge content
         ↓
  SHA-256 hash generated
         ↓
  Hash registered on Ethereum smart contract
         ↓
  Content stored off-chain in SQLite
         ↓
  Users can paste content & verify its hash
```

---

## Architecture

```
┌─────────────────────────────────────────────┐
│              Next.js 16 App Router           │
│                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  │
│  │  /submit │  │/registry │  │ /verify  │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  │
│       │              │              │        │
│  ┌────▼──────────────▼──────────────▼─────┐  │
│  │          API Route Handlers            │  │
│  │  POST /api/register                   │  │
│  │  GET  /api/knowledge                  │  │
│  │  POST /api/verify                     │  │
│  └────┬──────────────────────────────────┘  │
│       │                                     │
│  ┌────▼────────┐   ┌──────────────────────┐ │
│  │  SQLite DB  │   │  Ethereum Smart      │ │
│  │  (Prisma)   │   │  Contract (Sepolia)  │ │
│  └─────────────┘   └──────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## Project Structure

```
├── app/
│   ├── page.tsx                # Home page
│   ├── submit/page.tsx         # Submit knowledge form
│   ├── registry/page.tsx       # Knowledge registry list
│   ├── verify/page.tsx         # Content verification
│   ├── layout.tsx              # Shared layout + nav
│   └── api/
│       ├── register/route.ts   # POST: register new knowledge
│       ├── knowledge/route.ts  # GET: list all entries
│       └── verify/route.ts     # POST: verify content hash
│
├── components/
│   ├── KnowledgeForm.tsx       # Submit form (client component)
│   ├── KnowledgeList.tsx       # Registry table (server-renderable)
│   └── VerifyForm.tsx          # Verification form (client component)
│
├── lib/
│   ├── blockchain.ts           # ethers.js + smart contract helpers
│   ├── hash.ts                 # SHA-256 hashing util
│   └── prisma.ts               # Prisma client singleton
│
├── prisma/
│   └── schema.prisma           # Knowledge model definition
│
├── contracts/
│   └── KnowledgeRegistry.sol  # Solidity smart contract
│
├── scripts/
│   └── deploy.ts               # Hardhat Ignition deploy script
│
├── hardhat.config.ts           # Hardhat configuration
├── .env.example                # Environment variable template
└── README.md
```

---

## ⚡ Quick Start (Run Locally in 3 Steps)

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### 1. Clone & install

```bash
git clone https://github.com/babyday-co/digital-public-goods-registry.git
cd digital-public-goods-registry
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
```

The default `.env` uses SQLite and runs in **demo mode** (no live blockchain required).  
To enable on-chain registration, fill in `RPC_URL`, `PRIVATE_KEY`, and `CONTRACT_ADDRESS`.

### 3. Migrate the database & run

```bash
npx prisma migrate dev
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ | SQLite file path, e.g. `file:./dev.db` |
| `RPC_URL` | Optional | JSON-RPC endpoint (Alchemy / Infura / public) |
| `PRIVATE_KEY` | Optional | Wallet private key for signing transactions |
| `CONTRACT_ADDRESS` | Optional | Deployed `KnowledgeRegistry` contract address |

> ⚠️ Never commit a real private key. The app runs in demo mode if blockchain vars are absent.

---

## Smart Contract

**`contracts/KnowledgeRegistry.sol`** — a minimal Solidity contract that stores a mapping from content hash → knowledge metadata.

```solidity
struct Knowledge {
    string title;
    string contentHash;
    address contributor;
    uint256 timestamp;
}

mapping(string => Knowledge) private registry;
```

### Key functions

| Function | Description |
|---|---|
| `registerKnowledge(hash, title)` | Stores a new entry; reverts if hash already exists |
| `getKnowledge(hash)` | Returns title, contributor address, and timestamp |

### Deploy to Sepolia

```bash
# Compile
npm run contract:compile

# Deploy (requires PRIVATE_KEY + RPC_URL in .env)
npm run contract:deploy
```

After deployment, copy the contract address into `CONTRACT_ADDRESS` in your `.env`.

---

## API Reference

### `POST /api/register`

Register a new knowledge entry.

**Request body:**
```json
{ "title": "...", "contributor": "...", "content": "..." }
```

**Response (201):**
```json
{ "success": true, "entry": { "id": 1, "contentHash": "abc...", "txHash": "0x..." } }
```

---

### `GET /api/knowledge`

Returns all registered entries (newest first), excluding raw content.

---

### `POST /api/verify`

Check whether content matches a registered entry.

**Request body:**
```json
{ "content": "..." }
```

**Response:**
```json
{ "verified": true, "contentHash": "abc...", "entry": { ... } }
```

---

## Why Blockchain for Digital Public Goods

| Traditional Database | Blockchain Registry |
|---|---|
| Entries can be silently modified | Hash mismatch immediately detected |
| Central operator controls data | No single point of control |
| Attribution is trust-based | Attribution is cryptographically proven |
| Audit trail can be deleted | Immutable, append-only ledger |

Digital public goods — freely available resources for humanity — must be verifiable by anyone, anywhere. Blockchain provides the foundation for this.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend & API | Next.js 16, TypeScript, TailwindCSS |
| Database | SQLite via Prisma ORM |
| Blockchain client | ethers.js v6 |
| Smart contracts | Solidity 0.8.20, Hardhat |
| Target network | Ethereum Sepolia testnet |

---

## Future Improvements

- **IPFS storage** — store full content on IPFS, put the CID on-chain
- **Expert credential verification** — link contributor wallets to on-chain DIDs
- **Multi-organization governance** — DAO-controlled curation of the registry
- **Smart contract auditing** — formal verification and third-party audit
- **Mobile app** — React Native companion for parents
- **Multilingual content** — support for WHO-region languages

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## License

[MIT](LICENSE)

---

*Built with ❤️ for the UNICEF Digital Public Goods challenge by the BabyDay team.*
