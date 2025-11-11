# MetaHash Documentation

Official documentation for MetaHash (Subnet 73) on the Bittensor network.

## Built with Mintlify

This documentation is built using [Mintlify](https://mintlify.com), a modern documentation platform.

## Development

### Prerequisites

- Node.js 18+ and npm

### Install Mintlify

```bash
npm i -g mintlify
```

### Run Locally

```bash
mintlify dev
```

The documentation will be available at `http://localhost:3000`.

## Deployment

### Deploy to Mintlify

1. Push your changes to GitHub
2. Connect your repository to Mintlify
3. Mintlify will automatically deploy on push to main

### Manual Deployment

You can also deploy manually:

```bash
mintlify deploy
```

## Project Structure

```
.
├── docs.json              # Mintlify configuration & navigation
├── index.mdx              # Landing page wrapper
├── welcome/
│   └── 01-overview.mdx
├── otc-desk/
│   └── 01-overview.mdx
├── understand-metahash/
│   ├── fundamentals/
│   │   ├── 01-introduction.mdx
│   │   ├── 02-epoch-auction-economics.mdx
│   │   ├── 03-auction-mechanics.mdx
│   │   └── 04-faq.mdx
│   ├── economics/
│   │   ├── 01-miner-lifecycle.mdx
│   │   ├── 02-validator-role.mdx
│   │   ├── 03-master-validator-role.mdx
│   │   ├── 04-staker-role.mdx
│   │   └── 05-treasury-structure.mdx
│   ├── network/
│   │   └── 01-glossary.mdx
│   └── community/
│       └── 01-team.mdx
├── miners-validators-guide/
│   ├── getting-started/
│   │   ├── 01-which-guide-for-me.mdx
│   │   ├── 02-safety-warnings.mdx
│   │   └── 03-introduction.mdx
│   ├── miners/
│   │   ├── 01-miner-advanced-guide.mdx
│   │   └── 02-miner-cli.mdx
│   └── validators/
│       └── 01-validator-advanced-guide.mdx
├── support/
│   ├── operations/
│   │   ├── 01-keep-running.mdx
│   │   └── 02-commands.mdx
│   ├── troubleshooting/
│   │   └── 01-troubleshooting.mdx
│   └── checklists/
│       └── 01-checklist.mdx
├── roadmap/
│   └── 01-roadmap.mdx
├── internal/
│   └── reviews/
│       └── uid111-review.mdx
└── assets/
    ├── icons/
    │   └── favicon.png
    ├── images/
    │   └── Auction.png
    └── main diagram/
        ├── Untitled-2025-11-08-1700.excalidraw.png
        └── Untitled-2025-11-08-1718.png
```

## Configuration

All configuration is in `docs.json`:

- Navigation structure
- Branding (colors, logo, favicon)
- External links (Discord, Twitter, GitHub)
- Tabs and anchors

## Writing Content

All content is written in MDX (Markdown + React components).

### Mintlify Components

Mintlify provides built-in components:

- `<Card>` - Clickable cards with icons
- `<CardGroup>` - Group multiple cards
- `<Accordion>` - Collapsible sections
- `<AccordionGroup>` - Group multiple accordions
- `<CodeGroup>` - Tabbed code blocks
- `<Steps>` - Step-by-step instructions
- `<Tabs>` - Tabbed content
- `<Note>`, `<Tip>`, `<Warning>`, `<Info>` - Callout boxes
- `<Check>` - Success/completion indicators

### Example

```mdx
---
title: Page Title
description: Page description for SEO
---

# Page Title

<Tip>
This is a helpful tip!
</Tip>

<Steps>
  <Step title="First Step">
    Do this first
  </Step>
  <Step title="Second Step">
    Then do this
  </Step>
</Steps>
```

## Legacy Files

The legacy HTML prototype (old `index.html`, `review.html`, `script.js`, `gpt.md`, `review.md`, and associated CSS) has been removed from the working tree. Refer to git history if you need those artifacts for reference.

## Contributing

1. Make changes to MDX files
2. Test locally with `mintlify dev`
3. Commit and push to GitHub
4. Mintlify will auto-deploy

## Support

- [Mintlify Documentation](https://mintlify.com/docs)
- [Discord Community](https://discord.com/channels/799672011265015819/1351969903132938302)
- [GitHub Repository](https://github.com/fx-integral/metahash)

## License

Documentation follows the same license as the MetaHash project.
