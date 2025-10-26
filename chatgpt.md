glossary.mdx
---
title: "MetaHash Glossary"
description: "Key terminology for understanding MetaHash SN73’s deterministic auction economy, OTC counter, and treasury flow."
---

# MetaHash Glossary

This glossary summarizes the core terms used across the MetaHash SN73 documentation — covering auctions, epochs, α liquidity, and treasury mechanics.

---

## 🏛️ Core Network Terms

| Term | Definition |
|------|-------------|
| **Bittensor** | The decentralized neural network protocol that hosts subnets like SN73. |
| **Subnet** | A specialized network within Bittensor that focuses on a specific function or economy. |
| **Subnet 62** | The source subnet producing α used for MetaHash auctions and liquidity provisioning. |
| **SN73 (MetaHash)** | The MetaHash subnet itself — a deterministic α liquidity engine connecting miners, funds, and the Treasury. |
| **Validator** | A participant that allocates META budgets and executes deterministic auction settlements per Epoch. |
| **Miner** | A participant producing α from subnets (e.g., 62) and selling it through SN73’s OTC auctions. |
| **Treasury** | The on-chain vault managing liquidity inflows/outflows, buybacks, and reward redistribution. |

---

## ⏳ Epoch & Auction Terms

| Term | Definition |
|------|-------------|
| **Epoch** | A 72-minute deterministic cycle that includes auction, clearing, settlement, and reward updates. |
| **Epoch Cycle** | The continuous loop of Notify → Bid → Clear → Commit → Settle → Reweight that drives SN73. |
| **Deterministic Auction** | The rule-based, transparent process where bids and budgets clear predictably per Epoch. |
| **Discount (BPS)** | The price reduction miners offer in *basis points* (100 bps = 1%) when selling α. |
| **Auction Budget** | The META amount validators allocate per Epoch to purchase α. |
| **Auction Clearing** | The phase where validators rank bids and execute matching deterministically. |
| **Auction Commitment** | The finalized record of cleared bids and results, hashed to IPFS for audit. |

---

## 💧 Liquidity & OTC Terms

| Term | Definition |
|------|-------------|
| **OTC Counter** | The on-chain MetaHash mechanism enabling direct α-for-META swaps outside of AMMs. |
| **Liquidity Engine** | The dynamic Treasury system that recycles auction inflows and redistributes rewards. |
| **Buyback Program** | Treasury operation where 75% of auction proceeds are used to purchase SN73 from open markets. |
| **Airdrop Program** | Treasury distribution of the remaining 25% to stakers above `S_MIN_AIRDROP` threshold. |
| **α Exchange** | The conversion process between α (from miners) and META (from Treasury) through deterministic auctions. |
| **α Liquidity Flow** | The continuous movement of α between miners, Treasury, and other subnets. |

---

## ⚙️ Validator & Miner Metrics

| Term | Definition |
|------|-------------|
| **Validator Weight** | A score determining how much budget a validator can allocate based on past accuracy. |
| **Settlement Accuracy** | How precisely a validator executes auctions within budget and time limits. |
| **IPFS Commitment File** | The public record of all bids, clears, and settlements per Epoch stored on IPFS. |
| **Miner Fill Rate** | The percentage of submitted bids successfully cleared per Epoch. |
| **α Supply** | The total α a miner offers for sale during the auction window. |
| **Bid Discount** | The specific discount a miner assigns to α bids — higher discount = faster liquidity. |

---

## 🔗 Interoperability Terms

| Term | Definition |
|------|-------------|
| **Cross-Subnet Liquidity** | The ability of SN73 to move α and META across other subnets deterministically. |
| **Treasury Cross-Link** | The shared accounting mechanism tracking α source and redistribution. |
| **Epoch Sync** | Alignment of multiple subnets’ reward cycles with SN73’s 72-minute auction window. |
| **Liquidity Routing** | Automated redirection of α or META to subnets where demand is detected. |

---

## 📜 Governance & Transparency

| Term | Definition |
|------|-------------|
| **Commitment Proof** | The IPFS or on-chain reference confirming that a validator’s settlement occurred. |
| **Weight Decay** | Penalty applied when validators fail to submit valid commitments. |
| **Settlement Receipt** | On-chain acknowledgment confirming α and META exchange completion. |
| **Governance Audit** | Continuous validation of Epoch records, buybacks, and treasury movements. |

---

## 💠 Conceptual Overview

```text
Miners → Treasury → Validators → Buybacks → Stakers → Next Epoch