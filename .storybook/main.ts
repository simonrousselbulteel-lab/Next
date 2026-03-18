import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  "stories": [
    "../components/**/*.stories.ts",
    "../components/**/*.stories.tsx",
    "../components/**/*.stories.js",
    "../components/**/*.stories.jsx",
    "../components/**/*.stories.mjs",
    "../components/**/*.stories.mdx"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/vue3-vite"
};
export default config;