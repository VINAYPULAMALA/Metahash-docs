# MetaHash SN73 - Formulas Review Document

This document consolidates all formulas mentioned or implied in the MetaHash documentation for review and validation.

---

## Currently Documented Formulas

### 1. Bid Scoring Formula
**Location:** `epoch-auction-economics.mdx` (Line 186)
**Context:** Verification phase - how validators score and rank bids

```
Score = α_amount × (1 - discount)
```

**Variables:**
- `α_amount`: Amount of alpha being offered in the bid
- `discount`: Discount percentage (normalized from basis points, e.g., 0.05 for 5%)

**Purpose:** Ensures deterministic bid ranking so all validators reach consensus on winning bids.

---

## Proposed Formulas (From User Input)

### Section 1: α Creation
**Formula:**
```
α_i = E_i × Q_i
```

**Variables:**
- `α_i`: Alpha output for subnet i
- `E_i`: Emission/rewards received by subnet i
- `Q_i`: Quality or quantity multiplier for subnet i

**Describes:** Output per subnet
**Status:** Not currently in documentation
**Suggested Location:** Introduction or Epoch-Auction-Economics under "Alpha Production" section

---

### Section 2: Auction Clearing
**Formula:**
```
P_α = Σ B_v / Σ α_m
```

**Variables:**
- `P_α`: Clearing price for alpha
- `Σ B_v`: Sum of all validator bids (total budget allocated)
- `Σ α_m`: Sum of all miner alpha offered

**Describes:** Market pricing mechanism
**Status:** Not currently in documentation
**Suggested Location:** Auction-Mechanics under "Phase 3 - Clearing & Matching"

**Notes:**
- Need to clarify if this is a weighted average or simple division
- Should account for discount-adjusted values
- May need to specify winning bids only vs all bids

---

### Section 3: Treasury Settlement
**Formula:**
```
T_inflow = P_α × α_sold
```

**Variables:**
- `T_inflow`: Total treasury inflow for the epoch
- `P_α`: Clearing price for alpha
- `α_sold`: Total alpha successfully sold/cleared in auction

**Describes:** Liquidity intake to treasury
**Status:** Partially implied but not explicitly documented
**Suggested Location:** Epoch-Auction-Economics under "Treasury & Reward Flow"

---

### Section 4: Rewards Split
**Formulas:**
```
R_buyback = T_inflow × 0.75
R_airdrop = T_inflow × 0.25
```

**Variables:**
- `R_buyback`: Amount allocated to buybacks and liquidity support
- `R_airdrop`: Amount allocated to airdrops and wallet rewards
- `T_inflow`: Total treasury inflow (from Section 3)

**Describes:** Redistribution mechanism
**Status:** Percentages mentioned (75%/25%) but formula not explicit
**Location:** Currently at epoch-auction-economics.mdx lines 376-379
**Suggested Enhancement:** Add explicit formulas to complement the description

---

### Section 5: Epoch Renewal
**Formula:**
```
Epoch_{n+1} = f(Treasury_n, α_new, Bids_{n+1})
```

**Variables:**
- `Epoch_{n+1}`: Next epoch state
- `Treasury_n`: Treasury state from current epoch n
- `α_new`: New alpha produced/available for next epoch
- `Bids_{n+1}`: New bids submitted for next epoch
- `f()`: State transition function

**Describes:** Rebalancing and state transition between epochs
**Status:** Not currently in documentation
**Suggested Location:** Epoch-Auction-Economics under "The MetaHash Liquidity Loop" or new "Epoch State Transition" section

**Notes:**
- This is more of a conceptual formula than a computational one
- May need to break down into sub-formulas for:
  - Budget allocation for next epoch
  - Validator weight updates
  - Treasury rollover calculations

---

## Additional Formulas to Consider

### Budget Caps Per Validator
**Status:** Mentioned but no formula provided
**Context:** auction-mechanics.mdx line 95 - "Budget Caps: Validator's maximum α purchase per Epoch (e.g., 148 α)"

**Potential Formula:**
```
Budget_v = Total_Budget × (Stake_v / Σ Stake_all)
```

**Variables:**
- `Budget_v`: Budget allocation for validator v
- `Total_Budget`: Total META/TAO budget for the epoch
- `Stake_v`: TAO staked by validator v
- `Σ Stake_all`: Sum of all validator stakes

**Needs Validation:** Is budget proportional to stake? Or fixed per validator?

---

### Discount Normalization
**Status:** Mentioned as "basis points" conversion
**Context:** auction-mechanics.mdx line 31, 103

**Formula:**
```
discount = discount_bps / 10000
```

**Variables:**
- `discount`: Normalized discount (0 to 1)
- `discount_bps`: Discount in basis points (e.g., 500 for 5%)

**Purpose:** Convert basis points to decimal for calculations

---

### Validator Weight Update
**Status:** Mentioned conceptually but no formula
**Context:** auction-mechanics.mdx lines 75-76, epoch-auction-economics.mdx line 186

**Potential Formula:**
```
Weight_{v,n+1} = Weight_{v,n} × Performance_Score_v
```

**Variables:**
- `Weight_{v,n+1}`: Validator v's weight in epoch n+1
- `Weight_{v,n}`: Current weight in epoch n
- `Performance_Score_v`: Score based on settlement success, budget utilization, etc.

**Needs Specification:**
- How is Performance_Score calculated?
- Is it multiplicative or additive?
- What factors contribute (settlement speed, accuracy, volume)?

---

### Partial Fill Calculation
**Status:** Mentioned but not formalized
**Context:** auction-mechanics.mdx line 44 - "The final bid can be partially filled"

**Potential Formula:**
```
α_filled = min(α_bid, Budget_remaining)
Payment = α_filled × P_α × (1 - discount)
```

**Variables:**
- `α_filled`: Amount of alpha actually filled from the bid
- `α_bid`: Amount originally bid
- `Budget_remaining`: Remaining budget after previous bids
- `Payment`: Actual payment to miner

---

## Missing Formula Specifications

### 1. Slippage Adjustment
**Mentioned at:** auction-mechanics.mdx line 34, 97
**Description:** "Discounts are normalized for expected slippage"
**Formula Needed:** How is slippage calculated and applied?

```
// Proposed
Price_adjusted = Price_base × (1 + slippage_factor)
```

---

### 2. Yuma Consensus Rewards
**Mentioned at:** auction-mechanics.mdx line 20
**Description:** "Finalize prior-Epoch payouts via Yuma Consensus"
**Formula Needed:** How are Yuma consensus rewards calculated?

---

### 3. Inter-Treasury Rebalancing
**Mentioned at:** epoch-auction-economics.mdx lines 329-334
**Description:** "Optional balancing between validator pools"
**Formula Needed:** When and how does rebalancing occur?

```
// Proposed
Transfer_amount = (Treasury_A - Target_A) / 2
// if Treasury_A > Target_A, transfer to Treasury_B
```

---

## Constants and Parameters to Define

| Parameter | Description | Current Value | Source |
|-----------|-------------|---------------|---------|
| Epoch Length | Blocks per epoch | 360 blocks (~72 min) | auction-mechanics.mdx:93 |
| Buyback % | Percentage to buybacks | 75% | epoch-auction-economics.mdx:376 |
| Airdrop % | Percentage to airdrops | 25% | epoch-auction-economics.mdx:378 |
| Bidding Window | Blocks for bid submission | ~50-340 | auction-mechanics.mdx:32 |
| Max Discount | Maximum allowed discount | Not specified | - |
| Min Discount | Minimum allowed discount | Not specified | - |
| Basis Points Scale | Conversion factor | 10000 (100 bps = 1%) | auction-mechanics.mdx:103 |

---

## Recommendations

### High Priority
1. **Add auction clearing price formula** - Critical for understanding price discovery
2. **Formalize validator budget allocation** - Important for participants to understand capacity
3. **Document slippage adjustment** - Mentioned multiple times but never explained
4. **Specify validator weight update logic** - Key to understanding validator incentives

### Medium Priority
5. **Add alpha creation formula** - Helps understand subnet economics
6. **Document partial fill calculations** - Important edge case
7. **Formalize treasury inflow/outflow** - Already described but could use formulas

### Low Priority
8. **Inter-treasury rebalancing** - Marked as "optional" in docs
9. **Yuma consensus integration** - May be external to MetaHash specifics

---

## Formula Validation Checklist

For each formula, we should verify:
- [ ] Variables are clearly defined
- [ ] Units are specified (α, META, TAO, blocks, percentages)
- [ ] Edge cases are handled (division by zero, negative values)
- [ ] Formula matches actual implementation in code
- [ ] Examples are provided with real numbers
- [ ] Formula location in docs is appropriate

---

## Next Steps

1. Review this document with MetaHash technical team
2. Validate proposed formulas against actual implementation
3. Add confirmed formulas to appropriate documentation pages
4. Create examples/walkthroughs using the formulas
5. Update glossary with all formula variables

---

**Document Version:** 1.0
**Last Updated:** 2025-11-09
**Status:** Draft - Awaiting Review
**Reviewer:** _____________________