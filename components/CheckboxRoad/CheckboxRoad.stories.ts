import type { Meta, StoryObj } from '@storybook/vue3';
import CheckboxRoad from './CheckboxRoad.vue';

const meta = {
  title: 'Components/CheckboxRoad',
  component: CheckboxRoad as any,
  args: {
    state: 'Default',
    checked: false,
    indeterminate: false,
    withContent: true,
    label: 'Label',
    secondaryLabel1: false,
    secondaryLabel: '(1)',
    helper: true,
    helper1: 'Helper',
    errorMessage: 'Error',
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/zTOrsaTZ0I7JHoBg7bC46z/Next?node-id=17015-4309&m=dev',
    },
  },
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    indeterminate: false,
    checked: false
  }
};
export const Hover: Story = { args: { state: 'Hover' } };
export const Focus: Story = { args: { state: 'Focus' } };
export const Disabled: Story = { args: { state: 'Disabled' } };
export const Error: Story = { args: { state: 'Error' } };

export const Checked: Story = { args: { checked: true } };
export const Indeterminate: Story = { args: { indeterminate: true } };

