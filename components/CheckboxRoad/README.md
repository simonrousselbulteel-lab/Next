# CheckboxRoad

Figma: `https://www.figma.com/design/zTOrsaTZ0I7JHoBg7bC46z/Next?node-id=17015-4309&m=dev`

## Usage

```vue
<CheckboxRoad label="Newsletter" />
```

## Props

| Prop | Type | Default |
|---|---|---|
| `className` | `string` | — |
| `checked` | `boolean` | `false` |
| `indeterminate` | `boolean` | `false` |
| `state` | `"Default" \| "Hover" \| "Focus" \| "Disabled" \| "Error"` | `"Default"` |
| `withContent` | `boolean` | `true` |
| `label` | `string` | `"Label"` |
| `secondaryLabel1` | `boolean` | `false` |
| `secondaryLabel` | `string` | `"(1)"` |
| `helper` | `boolean` | `true` |
| `helper1` | `string` | `"Helper"` |
| `errorMessage` | `string` | `"Error"` |

## Emits

None.

## Design tokens used

- Surface/background: `--ds-surface-surface`, `--ds-surface-surface-disabled`
- Text: `--ds-surface-on-surface`, `--ds-surface-on-surface-weak`, `--ds-surface-on-surface-disabled`
- Input: `--ds-input-input-surface`, `--ds-input-input-surface-variant`, `--ds-input-input-outline`, `--ds-input-input-outline-variant`
- Danger: `--ds-danger-danger-outline`, `--ds-danger-on-danger-surface`
- Focus ring: `--ds-focus-ring-width`, `--ds-focus-ring-radius`, `--ds-focus-ring-size-checkbox`

## Accessibility notes

- Renders a `button` with `role="checkbox"` and `aria-checked`/`aria-disabled` based on props.

## Changelog

- **2026-03-18**: Made `CheckboxRoad` UI pixel-faithful to Figma (use exact SVG assets for checked/indeterminate states) and aligned typography to DM Sans.

## Fidelity check

| Item | Figma value | Token/implementation used | Match |
|---|---|---|---|
| Checkbox size | 20×20 | `size-5` → `--ds-spacing-5` | ✅ |
| Gap (checkbox ↔ content) | 12px | `gap-3` → `--ds-spacing-3` | ✅ |
| Label size/line-height | 16px / 1.5 | `text-base leading-normal` | ✅ |
| Helper size/line-height | 14px / 1.5 | `text-sm leading-normal` | ✅ |
| Content vertical gap | 2px | `--ds-spacing-0-5` | ✅ |
| Border radius | 4px | `radius-base` | ✅ |
| Focus ring size | 26×26 | `--ds-focus-ring-size-checkbox` | ✅ |
| Focus ring radius | 7px | `--ds-focus-ring-radius` | ✅ |
| Checked / indeterminate visuals | SVG assets | Figma-exported SVGs (`localhost:3845/...`) | ✅ |

