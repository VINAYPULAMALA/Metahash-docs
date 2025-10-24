The Tempo-Based Auction Cycle
MetaHash operates on a continuous tempo. Each tempo spans 360 blocks (~72 minutes), with Yuma Consensus finalizing who earned the rewards every round.

Tempo T: Auction & Clearing
Phase 1: Preparation (blocks 0-50)

Validators finalize the prior tempo’s rewards through Yuma Consensus.
Budget, discount caps, and payment windows for the new tempo are staged.
State resets ensure everyone starts the auction from a clean slate.
Phase 2: Live bidding (blocks 50-340)

Validators broadcast AuctionStart once preparation completes.
Active miners submit bids each tempo: (subnet_id, α_amount, discount).
Multiple bids per miner are allowed while the window is open.
Competition centers on best discounted value after slippage adjustments.
Phase 3: Close-out (blocks 340-360)

Bidding window closes; validators rank all bids by deterministic value.
Reputation limits and budget constraints determine the final winners.
Winning bids are paired with payment instructions for the next tempo.
Tempo T+1: Commitment & Payment
Winners notified: "You won! Pay by block X."
Validator publishes commitment (CID → IPFS).
Payment window opens (typically 100 blocks).
Miners send α to whitelisted treasury.
Transactions confirmed on-chain.
Tempo T+2: Settlement
Validator scans blockchain for α payments.
Verifies: correct amount, treasury, timing.
Calculates miner scores (paid = high, missed = 0).
Burns underfilled budget to UID 0.
Sets weights on-chain (or preview-only in testing mode).
Emissions distributed based on weights.
Visual Summary: Auction (Tempo T) → Payment (Tempo T+1) → Settlement (Tempo T+2)

Example cadence: Blocks 0-50 preparation, 50-340 live bids, 340-360 close-out and winner selection.

Terminology bridge: Live dashboards label these phases as Accepting Bids (Tempo T), Payment (Tempo T+1), and Rewards / Finalization (Tempo T+2). Same workflow, different naming.