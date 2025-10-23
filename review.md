<div style="background-color:#ff8c00;color:#1a1a1a;padding:8px 12px;font-weight:600;border-radius:4px;">
❓ Developers: why has my miner not placed a single bid even after running for several days?
</div>

UID111 Review — MetaHash SN73 Miner (Finney Testnet)
====================================================

Snapshot
--------
- Ubuntu 22.04 on AWS t3.medium; setup finished in roughly forty minutes using the documented python3 + venv + `uv` flow.
- Wallet and hotkey created with `btcli wallet new_coldkey` / `new_hotkey`, then registered to subnet 73 and confirmed as UID 111.
- Miner runs with α sourced from subnet 62, bidding `0.25` α at `500` bps, and keeps up through restarts with `screen` or systemd.
- Key blockers were dependency pinning (`async-substrate-interface==1.3.1`), missing `.env`, and misaligned `--payment.validators`.

What I Ran
----------
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-venv python3-pip git
python3 -m venv .venv
source .venv/bin/activate
pip install -U pip wheel uv
uv pip install -e .
pip install -U bittensor-cli

btcli wallet new_coldkey --wallet.name mywallet
btcli wallet new_hotkey --wallet.name mywallet --wallet.hotkey miner1
btcli subnets register --netuid 73 --wallet.name mywallet --wallet.hotkey miner1
btcli stake add --netuid 62 --wallet.name mywallet --wallet.hotkey miner1 --amount 0.15

python neurons/miner.py \
  --netuid 73 \
  --wallet.name mywallet \
  --wallet.hotkey miner1 \
  --subtensor.network finney \
  --miner.bids.netuids 62 \
  --miner.bids.amounts 0.25 \
  --miner.bids.discounts 500 \
  --axon.port 8091 \
  --axon.external_port 8091 \
  --logging.debug \
  --blacklist.force_validator_permit \
  --payment.validators 5H9WDbXXtJVoMRAGM3EgqZPZBk5A4d57PthhxsNrb6hBXsz7
```

Run Experience
--------------
- `.env` lives in the repo root (`WALLET_NAME`, `WALLET_HOTKEY`, `WALLET_PASSWORD`, `BITTENSOR_NETWORK`). Missing the password line had the miner looping for input until I fixed it.
- First good launch shows `Axon served`, `Miner started`, `Configured Bid Lines`, followed by regular `Miner running...`. Seeing `AuctionStart`, `Win invoice received`, and `α payment sent` confirmed the validator path.
- Opening TCP 8091 in the AWS security group plus verifying with `ss -tulpn | grep 8091` was the gate to being seen on the network.
- `screen -S miner` was fine for early testing; I later switched to the provided systemd unit so restarts happen automatically (`journalctl -u metahash-miner -f` to watch it).

Gotchas I Hit
-------------
- Needed to call `python3` explicitly in a few spots; using `python` without the alias broke the flow.
- Without the `async-substrate-interface==1.3.1` pin, imports failed—pinning solved it.
- Misconfigured `--payment.validators` to an unstaked hotkey and watched α burn; `btcli stake overview` helped align the correct address.
- When `AuctionStart` never appeared, port 8091 was closed; once I opened it, bids flowed.
- On a t3.micro dry run the miner hit OOM and died. Upgrading to t3.medium and adding a 2G swapfile resolved it.
- `btcli subnets alpha_to_tao` replaced the old `swap` command; adjusting to the new syntax avoided CLI errors.
- Block drift presented as “Extrinsic not included.” Running `python neurons/miner.py --fresh` pulled the miner back in sync.
