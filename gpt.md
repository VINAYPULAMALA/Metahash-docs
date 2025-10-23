MetaHash Miner (Subnet 73) — Full Setup & Troubleshooting Guide

Network: Finney (testnet)
Platform: Ubuntu 22.04 / AWS EC2

🧩 1. Environment Setup
✅ Steps
sudo apt update && sudo apt upgrade -y
sudo apt install -y python3 python3-venv python3-pip git
git clone https://github.com/fx-integral/metahash.git
cd metahash
python3 -m venv .venv
source .venv/bin/activate
pip install -U pip wheel uv
uv pip install -e .
pip install -U bittensor-cli

💡 Common Issues
Problem	Cause	Fix
Command 'python' not found	Python not aliased	Use python3 instead
async-substrate-interface mismatch	metahash requires 1.3.1	Reinstall specific version: pip install async-substrate-interface==1.3.1
Missing .env.template	Repo changed	Create manually (see section 3)
🔑 2. Wallet & Hotkey Creation
Commands
btcli wallet new_coldkey --wallet.name mywallet
btcli wallet new_hotkey --wallet.name mywallet --wallet.hotkey miner1
btcli subnets register --netuid 73 --wallet.name mywallet --wallet.hotkey miner1

Example output
✅ Registered on netuid 73 with UID 111
Coldkey: 5EA3B95aucxu7FEMfaG8gyDTz5nv24sdzbALbCcrb8WmNVv6
Hotkey:  5H9WDbXXtJVoMRAGM3EgqZPZBk5A4d57PthhxsNrb6hBXsz7

💡 Common Issues
Error	Meaning	Solution
No such command 'register'	Using old syntax	Use btcli subnets register
Insufficient balance	Not enough TAO	Transfer ≥ 0.001 TAO to coldkey
Missed seed words	Forgot to note mnemonic	Use btcli wallet list + back up the wallet folder instead
task destroyed pending	benign async cleanup warning	ignore
🧰 3. Environment Configuration (.env)

Create in ~/metahash/.env:

WALLET_NAME=mywallet
WALLET_HOTKEY=miner1
WALLET_PASSWORD=yourpassword
BITTENSOR_NETWORK=finney

💡 Common Issues
Problem	Fix
WALLET_PASSWORD not set	Add password line in .env
.env missing	Create manually in project root
Password prompt keeps appearing	Ensure you run miner from same directory as .env
💰 4. Staking (for α source)

Stake TAO in a funding subnet (ex: 62):

btcli stake add --netuid 62 --wallet.name mywallet --wallet.hotkey miner1 --amount 0.15


Check:

btcli stake overview --wallet.name mywallet --wallet.hotkey miner1


Result example:

Netuid  Hotkey                                    Stake
62      5H9WDbXXtJVoMRAGM3EgqZPZBk5A4d57PthhxsNrb6hBXsz7   0.1500 τ


✅ This hotkey can now fund α payments for your miner.

🧠 5. Running the Miner
Standard command
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

🧱 6. Port Setup (AWS)

Open TCP 8091 in your EC2 security group inbound rules.
Verify inside Ubuntu:

ss -tulpn | grep 8091

🚀 7. Expected Logs

When it’s working:

Axon served with: AxonInfo(5H9WDbXXt..., 18.xx.xx.xx:8091)
Miner started
Configured Bid Lines:
  0 │ 62 │ 0.2500 α │ 500 bps
Miner running…


✅ Miner is active on SN 73 and bidding α from subnet 62.

⚠️ 8. Known Issues During Setup & Fixes
Symptom	Root Cause	Fix
ValueError: miner.bids.* lengths must match	Mismatched number of netuids, amounts, or discounts	Ensure equal list lengths
Killed	Out of memory (OOM)	Add swap space (fallocate -l 2G /swapfile …) or use t3.medium instance
Port not open	AWS security group	Allow TCP 8091
No such command 'swap'	Command renamed	Use btcli subnets alpha_to_tao or tao_to_alpha
Wallet password prompt	Missing .env	Add WALLET_PASSWORD
Forgetting venv	Wrong path (.venv.bin)	Correct: source .venv/bin/activate
🔄 9. Keep Miner Running
Quick (manual)
screen -S miner
# run miner inside
Ctrl+A D   → detach
screen -r miner   → reattach

Production (systemd)

Create /etc/systemd/system/metahash-miner.service:

[Unit]
Description=MetaHash Miner (SN73)
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/metahash
ExecStart=/bin/bash -c 'source /home/ubuntu/metahash/.venv/bin/activate && python neurons/miner.py --netuid 73 --wallet.name mywallet --wallet.hotkey miner1 --subtensor.network finney --miner.bids.netuids 62 --miner.bids.amounts 0.25 --miner.bids.discounts 500 --axon.port 8091 --axon.external_port 8091 --logging.debug --blacklist.force_validator_permit --payment.validators 5H9WDbXXtJVoMRAGM3EgqZPZBk5A4d57PthhxsNrb6hBXsz7'
Restart=always

[Install]
WantedBy=multi-user.target


Enable:

sudo systemctl daemon-reload
sudo systemctl enable metahash-miner
sudo systemctl start metahash-miner
journalctl -u metahash-miner -f

🧩 10. Helpful Commands
Task	Command
Check wallet + hotkey addresses	btcli wallet list
Wallet overview	btcli wallet overview --wallet.name mywallet
Swap α→TAO	btcli subnets alpha_to_tao --netuid 62 --wallet.name mywallet --wallet.hotkey miner1 --amount X
Verify miner UID	`btcli subnets metagraph --netuid 73
View live logs	tail -f ~/.bittensor/miners/mywallet/miner1/netuid73/miner.log
✅ 11. Final Checklist
✅ Item	Description
🧰 Environment	Python 3.12, .venv activated
🔑 Wallet & hotkey	Created & registered
💰 Stake	Added (SN62)
🔒 .env	Exists with password
🌐 Port 8091	Open & visible
🧠 Miner log	“Miner started” shown
⚙️ Long-running	Using screen or systemd


⚙️ Validator Connection & α Transfer Troubleshooting
🔌 Common Validator Connection Problems

1. No AuctionStart events or validator connections

Symptom:
Logs show nothing like AuctionStart detected or WinSynapse.

Cause:
Port 8091 is closed or your miner’s axon is not visible externally.

Fix:

Ensure inbound rule for TCP 8091 is open in your AWS Security Group.

Verify that your miner is listening:

ss -tulpn | grep 8091


You should see Python listening on [::]:8091.

2. Bids never clear or validator ignores your miner

Cause:
Wrong --payment.validators address or that hotkey has no staked TAO.

Fix:

Confirm which hotkeys have stake:

btcli stake overview


Use only those hotkeys in your --payment.validators argument.

3. “Invalid α invoice” or “Win invoice rejected”

Cause:
Payment was sent from the wrong subnet or outside the validator’s payment window.

Fix:

Pay from the subnet indicated in your Win invoice.

Make sure your node clock is synchronized (chrony recommended).

Restart your miner if it’s lagging behind on block height.

💸 α (Alpha) Payment Troubleshooting

α tokens are automatically sent when your miner wins bids.

The payment comes from hotkeys defined under --payment.validators.

If the miner cannot pay (no balance or wrong subnet), your α is burned — you lose rewards for that auction.

To verify α balances:

btcli stake overview --wallet.name mywallet --wallet.hotkey miner1


You’ll see your current α per subnet (e.g., α62, α73, etc.).

🧠 Auction & Bid Monitoring

Look for this log line:

AuctionStart detected


→ Indicates validator has opened a new auction window.

When successful bids occur, you’ll see:

Win invoice received
α payment sent


→ Confirms your miner was selected and paid α successfully.

If you never see AuctionStart, check validator health:

btcli subnets metagraph --netuid 73 | grep validator


Validators may be paused or inactive.

🧩 Network & Resource Stability

“Killed” in logs: Out-of-memory termination.
Fix by adding swap:

sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab


Clock drift / block mismatch:
Install and enable chrony:

sudo apt install chrony -y
sudo systemctl enable chrony --now


Restart miner periodically (every 3–5 days) if memory grows beyond 85%.

🔄 α Swap & Conversion Errors

If you see:

No such command 'swap'


then use the new syntax:

btcli subnets alpha_to_tao --netuid 62 --wallet.name mywallet --wallet.hotkey miner1 --amount X


Always ensure your .env includes:

BITTENSOR_NETWORK=finney


before running swaps.

🛰️ Network Desync Recovery

Symptom:
“Extrinsic not included” or block lag logs.

Cause:
Miner is out of sync with latest block height.

Fix:
Resync metagraph:

python neurons/miner.py --fresh


or restart your miner service.

✅ Validator & Payment Health Checklist
Check	Command	Goal
Port 8091 open	`ss -tulpn	grep 8091`
Validator hotkey stake	btcli stake overview	Must have >0 TAO
Wallet password loaded	.env includes WALLET_PASSWORD	Avoid interactive prompt
Memory	htop or free -h	Avoid OOM kills
α payment subnet	Logs show same subnet ID	Payment must match subnet
Logs healthy	Look for “AuctionStart” & “WinSynapse”	Confirms bid flow active