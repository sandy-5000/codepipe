<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    class="inline-flex items-center px-4 py-2 disabled:cursor-not-allowed disabled:opacity-65 bg-button-reverse border border-transparent rounded-md font-semibold text-xs text-site uppercase tracking-widest hover:bg-white focus:bg-white active:bg-button-reverse focus:outline-none focus:ring-2 focus:ring-app transition ease-in-out duration-150"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: String,
  disabled: Boolean,
})
</script>
