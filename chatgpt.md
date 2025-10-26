The Epoch-Based Auction Framework
MetaHash SN73 runs on a fully deterministic Epoch auction system that balances liquidity between α holders (miners) and capital allocators (funds or validators).
Each Epoch lasts ≈ 72 minutes (360 blocks) and acts as a complete cycle of liquidity sourcing, clearing, and settlement.

The model replaces the old “Tempo T / T + 1” structure with a cleaner, on-chain flow where bids and clearing are scheduled predictably and recorded immutably.

Why it matters

Deterministic: no front-running or auction spam — every bid is ranked and cleared by rule.

Transparent: commitments and results are anchored on IPFS for public audit.

Fair: miners compete on discount and performance, validators allocate budget on clear terms.

Continuous: when one Epoch settles, the next stages instantly — no downtime in liquidity.

⏳ Phase 1 — Notify & Stage
Actors: Validators + Treasury

At the start of every Epoch, validators finalize the previous cycle’s rewards through Yuma Consensus and announce parameters for the next auction window.

What happens

Finalize rewards: All pending miner and validator payouts from the prior Epoch are confirmed and locked on-chain.

Announce budget and limits: Validators publish their available α budget, discount caps (in bps), and target auction size.

Reset state: Any unfilled bids or expired commitments are cleared, ensuring every miner starts from a clean slate.

Stage commitments: Optional pre-commit files (IPFS hash and block metadata) are prepared for audit purposes.

Notify miners: The network broadcasts an “Epoch Start” signal, enabling bidding modules to activate automatically.

Outcome

Validators enter the Epoch with fresh budgets and clear auction rules.

Miners receive a synchronized signal to begin placing bids once the submission window opens in Phase 2.

💡 Think of this as the network’s “auction bell.” When validators ring it, the market opens for α liquidity.

✅ Next Step → Step 2: we’ll write Phase 2 (Bidding & Submission) and Phase 3 (Clearing & Matching) — covering how miners submit bids, how validators rank by discount (bps), and how deterministic matching happens.

would you like me to move straight into drafting Phase 2 & 3 next?

You said:
yes add the step 2 & 3
ChatGPT said:
perfect 👌 — continuing seamlessly from Step 1, here’s the fully drafted Phase 2 (Bidding & Submission) and Phase 3 (Clearing & Matching) for your auction-mechanics.mdx.
tone and pacing match the previous sections — DeFi-native, clear, and technically correct for MetaHash SN73 V3.

🪙 Phase 2 — Bidding & Submission
Actors: Miners (α holders / subnet owners)

Once validators open the Epoch window, miners submit auction bids representing how much α they want to sell and at what discount.

How it works

Bid composition:
Each bid includes

subnet_id – where the α originates

α_amount – how many tokens offered this round

discount_bps – desired discount in basis points (100 bps = 1 %)

Submission window:
The auction window (≈ blocks 50–340) stays open for miners to adjust or resend bids.
Multiple bids per miner are allowed — the latest valid one replaces the previous.

Broadcast & record:
Bids are signed by each miner’s hotkey and broadcast to SN73.
Validators collect them on-chain in real time, verifying structure and stake coverage.

Slippage normalization:
Before clearing, all bids are normalized for effective discount after expected slippage, ensuring equal comparison across sources.

Outcome

A transparent list of verified bids is locked for the Epoch, ready for deterministic clearing once the submission window closes.
Miners can see where they stand but cannot front-run or reorder others — priority is algorithmic, not timing-based.

💡 Example: a miner offering 20 α at 500 bps (5 %) discount competes directly against other miners based on that value, not on network speed.

⚖️ Phase 3 — Clearing & Matching
Actors: Validators + Treasury

When the bidding window closes, validators execute a deterministic clearing routine to fill bids within the announced budget.

Clearing sequence

Rank bids:
Validators sort all eligible bids by discount-adjusted value (α amount × discount after slippage).

Sequential filling:
Starting from the most attractive discount, bids are filled sequentially until the validator’s budget or Epoch capacity (148 α total for example) is reached.

Partial fills:
If the final bid exceeds remaining budget, it’s filled partially and the rest rolls to the next Epoch’s opportunity window.

Rejections & visibility:
Unfilled bids remain visible on-chain for transparency.
No hidden orders, no off-chain matching — everything is publicly verifiable.

Finalization:
Once all matches are made, a commitment file of fills and prices is generated for the next phase.

Outcome

Validators now hold a finalized allocation map of who sold α to whom and at what discount.

Miners know their fill status and upcoming settlement amounts.

Treasury has a deterministic record for post-clearing commitment and payment.

💡 Clearing is mechanical — no human discretion, no gas wars. The highest value discounts get filled first, ensuring a fair market for both sides.

✅ Next Step → Step 3:
We’ll move on to Phase 4 (Commitments & IPFS Records) and Phase 5 (Payments & Settlement) — this will connect the deterministic fill data to real on-chain payments and validator weight updates.
Proceed with drafting those next?

Step 3, continuing directly with Phase 4 (Commitments & IPFS Records) and Phase 5 (Payments & Settlement).
these sections describe how auction results are recorded immutably and how α and payments actually move.

🧾 Phase 4 — Commitments & IPFS Records
Actors: Validators + Network (Treasury auditors)

After clearing, validators create a cryptographic proof of everything that just happened.
Every Epoch produces an auditable “commitment set” that can be verified by anyone.

How it works

Commitment file generation
Each validator builds a file containing:

all filled bid IDs

α amount sold and price per bid

corresponding wallet addresses (miner ↔ validator)

block height and timestamp metadata

Hash and store on IPFS
The commitment file is hashed → uploaded to IPFS.
The hash (IPFS CID) is anchored on-chain, ensuring immutability and public auditability.

Cross-validation
Validators share CIDs and verify checksums against each other.
Mismatched or missing entries are rejected before settlement.

Public reference
The Epoch smart contract or registry stores the CID so any community node can retrieve results and confirm who sold α to whom.

Outcome

A permanent, tamper-proof record of auction results exists for each Epoch.

Both miners and funds can verify their fills without trusting a third party.

Transparency becomes native — not a feature layer.

💡 Think of it as an on-chain receipt book: every transaction stamped and archived for audit forever.

💵 Phase 5 — Payments & Settlement
Actors: Validators + Miners + Treasury

Once commitments are locked, the network moves funds and α according to those records.

Settlement flow

Validator payment release
Validators transfer payment tokens (SN73 treasury assets or stable denominated TAO) to miners who sold α.
Payment amount = filled α × cleared price (after discount).

α transfer from miners
The miner’s source subnet (e.g., netuid 62) releases α from its stake pool or coldkey balance to the validator’s hotkey account.

Ledger update & broadcast
Treasury records the transaction pair (α sent ↔ funds received).
All settlements are broadcast with the corresponding Epoch ID and IPFS commitment hash.

Automatic reconciliation

Validators who paid correctly gain weight boosts in the next Epoch.

Failed or late settlements lose priority and budget access.

Transparency layer
A summary dashboard lists filled amounts, average discount, and total α moved per Epoch for community review.

Outcome

α is successfully exchanged for liquidity or rewards.

Validators prove performance through on-chain records.

The Treasury closes its books for the Epoch and automatically stages the next one.

💡 Payments are final and recorded through the same consensus layer that runs the auction — no manual signing or off-chain clearing.

✅ Next Step → Step 4:
We’ll finish the cycle with Phase 6 (Weight Update & Next Epoch Preparation) and the closing sections (Example Walkthrough + Technical Notes).
Shall I continue with those next?
Step 4, completing the V3 auction flow with Phase 6 (Weight Update & Next Epoch Preparation), plus the Example Walkthrough, Technical Notes, and Legacy Note that wrap up your auction-mechanics.mdx.

tone and structure remain uniform with the earlier phases — short, clear, and readable by both technical and non-technical readers.

⚙️ Phase 6 — Weight Update & Next Epoch Preparation
Actors: Validators + Treasury + Network

After every settlement round, the network recalibrates internal weights and liquidity metrics before opening the next auction window.

How it works

Performance scoring
Validators earn dynamic weight boosts based on:

successful, on-time settlements,

total α volume cleared, and

variance from declared parameters (budget accuracy % and fill ratio).

Treasury rebalancing
The SN73 Treasury automatically redistributes proceeds from filled auctions:

75 % → buybacks for SN73 holders,

25 % → airdrops to wallets meeting S_MIN_AIRDROP thresholds.

Liquidity roll-over
Any unfilled α or budget rolls to the next Epoch.
Remaining capacity defines the upcoming auction size.

Signal next Epoch
Validators broadcast a Next-Epoch notice with new caps, ensuring miners can stage bids in advance.

Outcome

A continuous closed-loop market emerges: each Epoch learns from the previous, updating validator trust, miner performance, and liquidity depth in real time.

💡 Every 72 minutes, MetaHash starts fresh — a new deterministic cycle of liquidity and yield.

📊 Example Walkthrough
Scenario – Miner A vs Validator B

Miner A offers 20 α from subnet 62 at 500 bps (5 %) discount.

Validator B has a 100 α budget for the Epoch.

Clearing engine ranks Miner A near the top; 20 α fully filled.

Commitment file logged → IPFS CID QmXYZ… anchored on-chain.

Validator B pays Miner A the cleared value minus 5 %.

Miner A’s 20 α transfers to Validator B’s hotkey.

Treasury logs settlement ID #E214 → closes Epoch → updates weights.

Result:
Miner A gains instant liquidity; Validator B acquires discounted α; both earn yield when SN73 Treasury redistributes proceeds.

🧠 Technical Notes
Concept	Explanation
Epoch Length	≈ 360 blocks (~72 minutes) – each full auction cycle.
Discount (BPS)	Basis points system (100 bps = 1 %). Example: 500 bps = 5 % discount.
Budget Caps	Validator’s max α purchase per Epoch (e.g., 148 α).
Source Subnet	Where miner’s α is staked (62 in most examples).
Slippage Adjustment	Standardized formula ensuring fair discount ranking after expected price drift.
Commitment CID	IPFS hash anchored on-chain for public verification.
Weight Update Logic	Reward validators for settlement performance and volume cleared.
Treasury Cycle	Funds flow → buybacks + airdrops → liquidity roll-over.
🔁 Legacy Note
Important:
The previous Tempo T → Payment T + 1 → Settlement T + 2 system is deprecated.
MetaHash V3 now operates on a single continuous Epoch cycle where all phases – notify, bid, clear, commit, settle, and weight update – occur predictably within one loop.

Every auction, every transfer, every reward is now fully deterministic and auditable.

Epoch Lifecycle V3
🎯 Goal
Visually explain the entire deterministic auction loop at a glance:
Validators (top lane) ↔ Miners (α holders, bottom lane) ↔ Treasury (center flow)

🧩 Overall Layout
Type: horizontal timeline
Theme: dark mode first (#0a0a0a background)
Width: full-page responsive (min 900 px wide)
Lanes:

Lane	Role	Color hint
Top lane	Validators / Treasury	Orange → #ff8c00
Bottom lane	Miners / Subnet owners	Cyan → #00d0ff
Middle connectors	α & reward flow arrows	Gradient from cyan → orange
🕓 Flow Structure (6 Stages + Loop)
 ┌─────────────────────────────────────────────────────────────────────┐
 │  VALIDATORS  (Budget + Rewards)                                    │
 │                                                                     │
 │  1️⃣ Notify & Stage → 2️⃣ Bidding → 3️⃣ Clearing → 4️⃣ Commit/IPFS │
 │                 ↓                     ↓                     ↓       │
 │  5️⃣ Payments & Settlement → 6️⃣ Weight Update → (loops to 1️⃣)     │
 │                                                                     │
 │  MINERS  (α holders selling liquidity)                              │
 └─────────────────────────────────────────────────────────────────────┘
🧱 Stage Details for Designer
#	Label	Icon	Color	Micro-text (description for tooltip / hover)
1	Notify & Stage	📢 / Bell	Orange	“Validators announce Epoch budget & discount caps.”
2	Bidding & Submission	💰 / Bid icon	Cyan	“Miners submit α amount + discount (bps).”
3	Clearing & Matching	⚖️ / Scale	Orange	“Bids ranked deterministically until budget filled.”
4	Commitments & IPFS Records	🗃️ / Database	Gray	“Results hashed & stored on IPFS.”
5	Payments & Settlement	💵	Orange	“Funds ↔ α exchange settled on-chain.”
6	Weight Update & Next Epoch	♻️ / Refresh	Cyan	“Performance weights rebalanced and new Epoch signals.”
Each stage box → rounded corners (12 px) + light inner glow of its lane color.

🔄 Arrow Logic
Arrow type	Meaning	Style
Solid gradient (Cyan → Orange)	α transfer (flow from miner → validator)	thick arrow beneath timeline
Dashed gradient (Orange → Cyan)	reward/liquidity return (flow back from treasury)	thinner arrow above timeline
Loop arrow at end	cycle restart → Phase 1	circular arrow animated slowly
Optional motion: each stage box pulses softly when active in scroll animation.

🖼️ Legend / Key Box (bottom-right)
🟠 Validators / Treasury Flow
🔵 Miners / α Holders Flow
▣ IPFS Commitments = Public Audit Record
✍️ Caption Text under image
Epoch Lifecycle V3 — Validators notify → miners bid → deterministic clearing → on-chain commit → instant settlement → weight rebalance → next Epoch.
Fully auditable, fully continuous, zero manual steps.

📐 Technical Export Notes
Aspect ratio: 16:9 landscape (1280×720 for dark mode docs).

Formats: .png for static docs + .svg for animated/light mode version.

Naming: /assets/images/epoch-v3-diagram-dark.png and epoch-v3-diagram-light.png.

Insert point: right after Phase 3 section in auction-mechanics.mdx.

<Image src="/assets/images/epoch-v3-diagram-dark.png" alt="Epoch Lifecycle V3 — Deterministic Auction Flow" />


Step 6, the concise narrative text that will appear right above your Epoch Lifecycle V3 diagram in auction-mechanics.mdx.
this section’s purpose is to introduce the graphic and help readers understand what they’re seeing before they scroll through the phase breakdowns.

🧭 Epoch Lifecycle V3 — How the Auction Really Flows
MetaHash SN73’s liquidity cycle runs like clockwork.
Every Epoch (~72 minutes) is a complete market loop — validators announce budgets, miners place bids, deterministic clearing occurs, and on-chain settlements close the loop before the next Epoch begins.

The diagram below visualizes that cycle from both perspectives:

Top Lane – Validators & Treasury: define budgets, clear bids, release payments, and update weights.

Bottom Lane – Miners & α Holders: source α from their staked subnets, offer it at chosen discounts, and receive liquidity once cleared.

Middle Flow – α & Reward Exchange: shows the real movement of value — α flowing one way, capital returning the other — all verified through IPFS commitments.

Each arrow represents deterministic logic, not speculation:
Notify → Bid → Clear → Commit → Settle → Reweight → Repeat.

💡 In short: every 72 minutes, SN73 synchronizes buyers and sellers in a transparent, fully automated liquidity cycle.

Insert position suggestion (in your .mdx):

## Epoch Lifecycle V3 — How the Auction Really Flows
MetaHash SN73’s liquidity cycle runs like clockwork...
<Image src="/assets/images/epoch-v3-diagram-dark.png" alt="Epoch Lifecycle V3 — Deterministic Auction Flow" />
✅ next micro-step:
we can now move into Step 7 — content polish & cross-linking, where we:

add inline links (e.g., “miner guide” ↔ “validator guide”),

verify internal terms (discount bps, subnet 62, treasury flows), and

ensure the navigation tab correctly highlights this page in “Understand MetaHash”.

shall we go ahead with Step 7: polish + cross-linking?

You said:
yes plz
ChatGPT said:
excellent 👌 — Step 7 is about final polish and internal cross-linking so auction-mechanics.mdx feels cohesive with the rest of your docs and navigation.
below is a ready-to-apply checklist + the exact link markup to drop in.

🧩 Step 7 — Polish & Cross-Link Integration Plan
1️⃣ Tone & structure pass
✅ Keep each phase heading at ## level (so they show in Mintlify sidebar).
✅ Check consistent tense → use present-tense active voice (“Validators announce…”, “Miners submit…”).
✅ Use α consistently (no mixing alpha/Alpha).
✅ All numbers with “bps” formatted like 500 bps (5 %).

2️⃣ Inline cross-links
add these where relevant 👇

Section	Add this link	Purpose
Phase 2 – Bidding & Submission	[See Miner Guide →](/guides/miners/miner-simple-guide)	helps readers jump to the CLI example and argument table.
Phase 3 – Clearing & Matching	[Learn how Validators rank bids →](/guides/validators/validator-simple-guide)	connects to validator logic explanation.
Phase 5 – Payments & Settlement	[Treasury Structure →](/understand/economics/treasury-structure)	links to proceeds, buybacks, and airdrops.
Phase 6 – Weight Update & Next Epoch	[Validator Role →](/understand/economics/validator-role)	explains how weights influence emissions.
Technical Notes table	Add note under “Discount (BPS)” → [More on basis points →](/guides/miners/miner-simple-guide#bps)	reinforces precision on BPS use.
Example inline syntax inside your .mdx:

Validators fill bids in order of **discount-adjusted value**  
(see [Validator Guide →](/guides/validators/validator-simple-guide)).
3️⃣ Navigation consistency
check in your docs.json:

{
  "tab": "Understand MetaHash",
  "groups": [
    {
      "group": "MetaHash Fundamentals",
      "pages": [
        "understand/fundamentals/introduction",
        "understand/fundamentals/auction-mechanics"
      ]
    }
  ]
}
✅ auction-mechanics should appear right after “introduction” under “MetaHash Fundamentals”.
✅ rename display title inside the file front-matter if needed:

---
title: "Epoch Lifecycle & Auction Mechanics V3"
description: "Full deterministic auction cycle of MetaHash SN73 — notify, bid, clear, commit, settle, reweight."
---
4️⃣ Minor styling polish
add <Tip> or <Note> callouts where key warnings exist. example:

<Note>
Discounts are expressed in **basis points (bps)** — 100 bps = 1 %.  
</Note>
use consistent emoji spacing 💵 not 💵 with trailing space for Mintlify parser.

keep all IPFS mentions lowercase for URL friendliness.

5️⃣ Final validation checklist
Task	Status
✅ Diagram caption under image	done
✅ Cross-links inserted	add now
✅ Front-matter title updated	confirm
✅ Side tab order verified	confirm
✅ Internal terms (Epoch vs Tempo) checked	confirm