MetaHash Glossary
Key terms and concepts across the MetaHash (SN73) ecosystem
🧠 Overview

This glossary defines the core terminology used throughout MetaHash documentation.
It connects auction, liquidity, and consensus concepts into a unified reference — ensuring that miners, validators, and researchers share the same language.

🔤 Core Economic Terms
Term	Definition
α (Alpha)	The internal liquidity unit used for bidding and auction participation. α represents competitive intent — miners deploy α instead of raw TAO to earn emission rewards.
TAO	The native Bittensor token used for staking, emissions, and cross-subnet settlement. TAO is the base currency into which α commitments are eventually converted.
Epoch	A complete auction and settlement cycle (~72 minutes). Each epoch includes bidding, clearing, consensus, and reward distribution phases.
Auction	The live marketplace within each epoch where miners bid α for the right to earn TAO rewards. Validators rank bids by their effective value.
Discount Rate	A percentage modifier miners apply to their α bids. A higher discount means greater risk (lower net value) but potentially more competitiveness in auction rankings.
Effective Value	The final score used by validators to rank bids, calculated as α × (1 – discount). Determines which miners win access to emission rewards.
Emission Rate	The amount of TAO distributed per epoch, governed by Treasury balancing. Adjusts dynamically with α inflows to stabilize the subnet economy.
🏦 Treasury & Reward Terms
Term	Definition
Treasury	The settlement hub of MetaHash. It collects α inflows, converts them into TAO emission rewards, and redistributes payouts to miners and validators each epoch.
Reward Distribution	The process of converting committed α into TAO and splitting it among participants according to emission share and reliability.
Reserve Balance	The portion of Treasury funds kept aside to buffer future epochs and prevent emission volatility.
Emission Coefficient (k)	The balancing constant used to scale TAO output relative to α inflows, preventing over-issuance during high-demand epochs.
α Burn	A corrective mechanism where a small portion of α is permanently retired when liquidity overshoots subnet capacity — maintaining healthy circulation.
⚙️ Validator & Consensus Terms
Term	Definition
Validator	A node responsible for verifying α bids, ranking auctions, reaching consensus, and signing Treasury payouts. Validators uphold fairness and transparency.
Reputation Score	A numeric trust metric measuring validator reliability, uptime, and accuracy. Determines consensus weight and reward multiplier.
Yuma Consensus	The finalization protocol used by MetaHash validators to agree on auction results and authorize Treasury emissions. Ensures deterministic and immutable outcomes.
Clearing Phase	The step during which validators finalize bid rankings based on effective α value and lock in winners.
Consensus Weight	The influence of a validator’s vote within Yuma Consensus, derived from its reputation and participation history.
🧍 Miner Terms
Term	Definition
Miner	A participant that provides α liquidity and computational resources to earn TAO rewards through auctions.
Hotkey	The miner’s active wallet identity used for signing bids and receiving payouts.
Commit Phase	The stage after winning an auction when a miner locks α and performs assigned work or uptime validation.
Uptime	The percentage of time a miner remains connected and active during an epoch. Critical for maintaining reputation and eligibility.
Emission Share	The proportion of total rewards allocated to a miner based on effective α value and reliability metrics.
🌐 Interoperability & Network Terms
Term	Definition
Subnet	A specialized component of the Bittensor network performing a defined task (e.g., validation, AI training, liquidity). MetaHash operates as Subnet 73 (SN73).
Liquidity Hub	A subnet — such as MetaHash — that redistributes α across other subnets to stabilize network-wide emission rates.
Cross-Subnet α Flow	The movement of α liquidity between subnets, managed by Treasury records and validator consensus. Enables subnet cooperation and emission balancing.
Global α Market	The envisioned system where all subnets share α pools dynamically, creating a unified liquidity layer for the entire Bittensor network.
🧩 MetaHash-Specific Terms
Term	Definition
Meta-Mining	The concept of mining liquidity itself — using α bids to optimize where and how TAO rewards are earned.
Epoch Finalization	The moment consensus locks auction results and triggers Treasury reward conversion.
α Velocity	The rate at which α cycles between auctions per epoch; an indicator of liquidity health and network activity.
Emission Equilibrium	The stable state where α inflows, Treasury rewards, and miner performance remain balanced over multiple epochs.
SN73	The network identifier for MetaHash within the Bittensor ecosystem.
📘 Notes for Readers

All economic parameters (percentages, coefficients, and epoch lengths) are dynamic — subject to on-chain governance or validator policy updates.

α is not a transferable token outside the subnet; it’s a virtual accounting unit used solely within the MetaHash economy.

Epochs are continuous — there is no downtime between cycles; new bids begin as soon as previous ones settle.

🧭 Summary

This glossary consolidates MetaHash’s key language: α, epochs, Treasury, validators, and interoperability.
Together, these terms describe a living market — one that self-regulates through transparency, consensus, and liquidity flow.

→ End of “Understand MetaHash” Series.