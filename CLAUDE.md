# Design System — AI Agent Conventions

This file documents everything an AI coding agent needs to understand and
work effectively in this repository. Keep it updated as conventions evolve.

---

## Design System Name and Purpose

**Name:** `@your-org/design-system`

**Purpose:** A token-driven, AI-first Vue 3 component library that maintains a
single source of truth flowing from Figma through JSON design tokens into CSS
custom properties and Tailwind utility classes. Components are built in Vue 3
with TypeScript and `<script setup>`.

---

## Repository Structure

```
design-system/
├── CLAUDE.md                   ← you are here
├── .mcp.json                   ← Figma MCP SSE config (do not modify)
├── tokens/
│   ├── source/                 ← DTCG JSON token files (edit these)
│   │   ├── colors.json
│   │   ├── typography.json
│   │   ├── spacing.json
│   │   ├── radius.json
│   │   └── shadows.json
│   └── build/                  ← GENERATED, gitignored (do not edit)
│       ├── variables.css       ← CSS custom properties under :root
│       └── theme.ts            ← typed TS object for Vue component use
├── components/
│   └── _template/              ← copy this when creating a new component
│       ├── Component.vue
│       └── README.md
├── composables/                ← Vue composables (shared reactive logic)
├── mcp/
│   └── server.ts               ← MCP server exposing design system tools
├── .figma/
│   └── README.md               ← Figma integration docs
├── src/
│   ├── main.ts
│   ├── App.vue
│   └── style.css               ← Tailwind entry + @theme token bridges
├── style-dictionary.config.ts  ← token build pipeline config
├── tailwind.config.ts          ← Tailwind v4 plugin config (theme is in CSS)
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Token Naming Conventions

### Source format: W3C DTCG (Design Token Community Group)

All token files in `tokens/source/` use the DTCG format:

```json
{
  "category": {
    "name": {
      "$value": "the-value",
      "$type": "color | dimension | fontFamily | fontWeight | number | shadow",
      "$description": "Human-readable description of when to use this token"
    }
  }
}
```

### CSS custom property naming

Style Dictionary transforms the nested JSON path into a flat CSS custom property
with the prefix `--ds-`:

| JSON path               | CSS custom property        |
|-------------------------|----------------------------|
| `color.primary`         | `--ds-color-primary`       |
| `spacing.4`             | `--ds-spacing-4`           |
| `font.size.base`        | `--ds-font-size-base`      |
| `radius.base`           | `--ds-radius-base`         |
| `color.neutral.500`     | `--ds-color-neutral-500`   |

### Rules

1. Use `kebab-case` for all token names.
2. Avoid abbreviations — prefer `primary-foreground` over `primary-fg`.
3. Use semantic names (`color.text.primary`) not atomic names (`color.gray.900`)
   for tokens consumed in components. Atomic tokens exist as the scale
   (e.g., `color.neutral.*`) that semantic tokens reference.
4. Never hardcode `--ds-*` variable values in components. Always use the
   Tailwind utility class or reference the CSS custom property by name.

---

## Component Conventions

### Technology

- **Vue 3** with `<script setup>` (Composition API, no Options API)
- **TypeScript** — all props, emits, and composable return types must be typed
- **Tailwind CSS v4** — use utility classes; avoid inline styles
- **No CSS Modules, no scoped styles** — unless a component requires styles
  that cannot be expressed with Tailwind utilities

### File structure

Each component lives in its own directory under `components/`:

```
components/
└── Button/
    ├── Button.vue     ← component implementation
    └── README.md      ← props table, usage, a11y notes, Figma link
```

### Vue SFC template

```vue
<script setup lang="ts">
// 1. Imports
// 2. Props definition
// 3. Emits definition
// 4. Composable usage
// 5. Computed/reactive state
// 6. Methods/handlers

defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}>();

defineEmits<{
  click: [event: MouseEvent];
}>();
</script>

<template>
  <!-- Single root element preferred; use fragments only when necessary -->
</template>
```

### Naming rules

- Component files: `PascalCase.vue` (e.g., `Button.vue`, `InputField.vue`)
- Composables: `use` prefix, camelCase (e.g., `useTheme.ts`, `useId.ts`)
- Emits: camelCase verb (e.g., `update:modelValue`, `submit`)
- CSS classes: Tailwind utilities only; no custom class names on elements

---

## How to Add a New Component

1. **Copy the template:**
   ```bash
   cp -r components/_template components/MyComponent
   ```

2. **Rename the Vue file:**
   ```bash
   mv components/MyComponent/Component.vue components/MyComponent/MyComponent.vue
   ```

3. **Implement the component** in `MyComponent.vue` following the conventions
   above. Do NOT implement logic in the template step — scaffold first.

4. **Update README.md** in the component directory with:
   - Purpose and usage
   - Props table
   - Emits table
   - Which `--ds-*` tokens it uses
   - Accessibility notes
   - Link to the Figma component

5. **Export the component** from `src/index.ts` (create if it doesn't exist):
   ```typescript
   export { default as MyComponent } from '@components/MyComponent/MyComponent.vue';
   ```

6. **Run the dev server** and verify it renders:
   ```bash
   npm run dev
   ```

---

## Token Pipeline: Figma → JSON → CSS Vars → Tailwind

```
┌─────────────────────────────────────────────────────────────────┐
│  FIGMA (source of truth for visual design)                      │
│  Variables / Tokens plugin exports token values                 │
└────────────────────────┬────────────────────────────────────────┘
                         │  Manual update or plugin export
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  tokens/source/*.json  (DTCG format, committed to git)          │
│  colors.json, typography.json, spacing.json, etc.               │
└────────────────────────┬────────────────────────────────────────┘
                         │  npm run build:tokens
                         │  (style-dictionary.config.ts)
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│  tokens/build/variables.css                                     │
│  :root { --ds-color-primary: #3b82f6; --ds-spacing-4: 1rem; }  │
│                                                                 │
│  tokens/build/theme.ts                                          │
│  export const theme = { color: { primary: '#3b82f6' }, ... }   │
└──────────────────┬──────────────────────────┬───────────────────┘
                   │                          │
                   ▼                          ▼
┌──────────────────────────┐   ┌─────────────────────────────────┐
│  src/style.css           │   │  import { theme } from           │
│  @import variables.css   │   │    '@tokens/theme'               │
│  @theme inline {         │   │  (in Vue components that need    │
│    --color-primary:      │   │   typed JS token values)         │
│      var(--ds-color-     │   └─────────────────────────────────┘
│        primary);         │
│  }                       │
└──────────────────┬───────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────────────┐
│  Tailwind CSS v4 utility classes                                │
│  class="bg-primary text-primary-fg p-4 rounded"                │
│  ↑ generated from @theme inline variables                       │
└─────────────────────────────────────────────────────────────────┘
```

### Key points

- **Never edit `tokens/build/`** — it is gitignored and regenerated on every
  `build:tokens` run.
- **Always run `npm run build:tokens`** after editing any `tokens/source/` file
  before starting `npm run dev` or `npm run build`.
- The **`--ds-` prefix** on all CSS custom properties prevents collisions with
  Tailwind's own internal variables (which use `--color-*`, `--spacing-*` etc.).

---

## MCP Tools

Run the MCP server with: `npm run mcp`

| Tool              | Description                                            |
|-------------------|--------------------------------------------------------|
| `list_tokens`     | Returns all tokens by category from tokens/source/     |
| `get_component`   | Returns .vue source + README for a named component     |
| `get_conventions` | Returns this CLAUDE.md file                            |

---

## Common Commands

```bash
npm run build:tokens   # Regenerate tokens/build/ from tokens/source/
npm run dev            # Start Vite dev server (requires build:tokens first)
npm run build          # Full production build (tokens + type-check + vite)
npm run mcp            # Start the MCP server on stdio
```
