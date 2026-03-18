<script setup lang="ts">
const IMG = {
  checked: {
    Default: 'http://localhost:3845/assets/449c4db78420e0958fad94fcc851da200dd2c956.svg',
    Hover: 'http://localhost:3845/assets/4d17fa841ab90c4ae51748a7ca1a7b480251442b.svg',
    Focus: 'http://localhost:3845/assets/32017f6725211a6fc3fe42023859eda2d3516413.svg',
    Disabled: 'http://localhost:3845/assets/acf65211484dd7b91a06fc09379ee1138377b3e9.svg',
  },
  indeterminate: {
    Default: 'http://localhost:3845/assets/6e3f5024ed582806aee7ed6130d2237f28e9ad8a.svg',
    Hover: 'http://localhost:3845/assets/ca93512373110b3f2355fffcd25766430fcfa536.svg',
    Focus: 'http://localhost:3845/assets/b4920f925baf3baf298ad38f6d623915926aabe4.svg',
    Disabled: 'http://localhost:3845/assets/39402bc2df1e5c410166b17dd724cb9ec725121e.svg',
  },
} as const;

type CheckboxRoadProps = {
  className?: string;
  checked?: boolean;
  errorMessage?: string;
  helper?: boolean;
  helper1?: string;
  indeterminate?: boolean;
  label?: string;
  secondaryLabel?: string;
  secondaryLabel1?: boolean;
  state?: 'Default' | 'Disabled' | 'Error' | 'Focus' | 'Hover';
  withContent?: boolean;
};

const props = withDefaults(defineProps<CheckboxRoadProps>(), {
  checked: false,
  errorMessage: 'Error',
  helper: true,
  helper1: 'Helper',
  indeterminate: false,
  label: 'Label',
  secondaryLabel: '(1)',
  secondaryLabel1: false,
  state: 'Default',
  withContent: true,
});

function isDisabled() {
  return props.state === 'Disabled';
}

function showFocusRing() {
  return props.state === 'Focus' && !isDisabled();
}

function boxBgClass() {
  if (isDisabled()) return 'bg-surface-disabled';
  if (props.checked || props.indeterminate) {
    return props.state === 'Hover' ? 'bg-input-surface-variant' : 'bg-input-surface';
  }
  return 'bg-surface';
}

function boxBorderClass() {
  if (isDisabled()) return 'border-transparent';
  if (props.checked || props.indeterminate) return 'border-transparent';
  if (props.state === 'Error') return 'border-danger-outline';
  if (props.state === 'Hover') return 'border-input-outline-variant';
  return 'border-input-outline';
}

function helperTextColorClass() {
  if (props.state === 'Error') return 'text-on-danger';
  return 'text-on-surface-weak';
}

function effectiveStateForAsset(): 'Default' | 'Hover' | 'Focus' | 'Disabled' {
  if (props.state === 'Disabled') return 'Disabled';
  if (props.state === 'Hover') return 'Hover';
  if (props.state === 'Focus') return 'Focus';
  return 'Default';
}

function checkboxAssetUrl(): string | null {
  const st = effectiveStateForAsset();
  if (props.indeterminate) return IMG.indeterminate[st];
  if (props.checked) return IMG.checked[st];
  return null;
}
</script>

<template>
  <div
    :class="['flex items-start gap-3', props.className]"
    data-node-id="17015:4309"
  >
    <button
      class="relative flex shrink-0 items-center"
      type="button"
      :disabled="isDisabled()"
      role="checkbox"
      :aria-checked="props.indeterminate ? 'mixed' : String(!!props.checked)"
      :aria-disabled="String(isDisabled())"
      data-name="_CheckboxBase"
    >
      <span
        class="relative block size-5 rounded border"
        :class="[boxBgClass(), boxBorderClass()]"
        data-name="_Checkbox"
      >
        <span
          v-if="showFocusRing()"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-input-outline-variant"
          data-name="Focus"
          :style="{
            width: 'var(--ds-focus-ring-size-checkbox)',
            height: 'var(--ds-focus-ring-size-checkbox)',
            borderRadius: 'var(--ds-focus-ring-radius)',
          }"
        />

        <img
          v-if="checkboxAssetUrl()"
          :src="checkboxAssetUrl() ?? undefined"
          alt=""
          class="absolute inset-0 block size-full max-w-none"
          aria-hidden="true"
        />
      </span>
    </button>

    <div
      v-if="props.withContent"
      class="flex shrink-0 flex-col items-start leading-none"
      :style="{ gap: 'var(--ds-spacing-0-5)' }"
      data-name="Content"
    >
      <div class="flex items-baseline gap-1" data-name="Labels">
        <div class="text-base leading-normal text-on-surface">
          {{ props.label }}
        </div>
        <div
          v-if="props.secondaryLabel1"
          class="w-4 text-sm leading-normal text-on-surface-weak"
        >
          {{ props.secondaryLabel }}
        </div>
      </div>

      <div
        v-if="props.state === 'Error'"
        class="text-sm leading-normal"
        :class="helperTextColorClass()"
      >
        {{ props.errorMessage }}
      </div>
      <div
        v-else-if="props.helper"
        class="text-sm leading-normal"
        :class="helperTextColorClass()"
      >
        {{ props.helper1 }}
      </div>
    </div>
  </div>
</template>

