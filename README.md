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
├── mint.json              # Mintlify configuration
├── introduction.mdx       # Homepage
├── setup/                 # Setup guide pages
│   ├── introduction.mdx
│   ├── environment.mdx
│   ├── wallet.mdx
│   ├── configuration.mdx
│   ├── staking.mdx
│   ├── running-miner.mdx
│   ├── port-setup.mdx
│   ├── troubleshooting.mdx
│   ├── keep-running.mdx
│   ├── commands.mdx
│   └── checklist.mdx
├── review/                # Review pages
│   └── uid111-review.mdx
└── icon/                  # Images and icons
    └── favicon.png
```

## Configuration

All configuration is in `mint.json`:

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

## Old Files

The following old HTML files are kept for reference but are no longer used:

- `index.html` - Old documentation homepage
- `review.html` - Old review page
- `styles.css` - Old CSS styles
- `script.js` - Old JavaScript
- `gpt.md` - Source markdown (migrated to setup/ pages)
- `review.md` - Source markdown (migrated to review/ pages)

These can be safely deleted once you've verified the Mintlify version works correctly.

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
