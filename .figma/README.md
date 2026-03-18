# Figma Integration

This directory contains configuration and documentation for the Figma MCP
integration. The Figma MCP server (defined in `/.mcp.json`) connects via SSE
to a locally running Figma Dev Mode server.

## MCP Configuration

The `.mcp.json` at the repo root configures the Figma MCP server connection:

```json
{
  "mcpServers": {
    "figma": {
      "type": "sse",
      "url": "http://127.0.0.1:3845/sse"
    }
  }
}
```

## Token Pipeline: Figma → Design System

```
Figma (source of truth)
  │
  │  [Figma Tokens / Variables plugin, or manual export]
  ▼
tokens/source/*.json   ← DTCG format, committed to git
  │
  │  npm run build:tokens  (Style Dictionary)
  ▼
tokens/build/variables.css   ← CSS custom properties, gitignored
tokens/build/theme.ts        ← typed JS object, gitignored
  │
  ├──▶  src/style.css @theme inline { ... }  ← Tailwind utility classes
  └──▶  import { theme } from '@tokens/theme'  ← typed values in Vue components
```

## Workflow for Updating Tokens from Figma

1. Open Figma file in Dev Mode.
2. Use the Figma MCP server (running on port 3845) or a tokens plugin to
   export updated values.
3. Update the relevant JSON files in `tokens/source/`.
4. Run `npm run build:tokens` to regenerate `tokens/build/`.
5. Verify no regressions in the running dev server (`npm run dev`).
6. Commit only the `tokens/source/*.json` changes (not `tokens/build/`).

## Figma Variables Naming Convention

Match Figma variable names to token paths in the JSON files:

| Figma Variable        | Token path in JSON           | CSS custom property      |
|-----------------------|------------------------------|--------------------------|
| `color/primary`       | `color.primary.$value`       | `--ds-color-primary`     |
| `spacing/4`           | `spacing.4.$value`           | `--ds-spacing-4`         |
| `radius/base`         | `radius.base.$value`         | `--ds-radius-base`       |
| `font/size/base`      | `font.size.base.$value`      | `--ds-font-size-base`    |
