<template>
  <button
    :type="type || 'button'"
    :disabled="disabled"
    class="inline-flex items-center px-4 py-2 bg-red-600 disabled:cursor-not-allowed disabled:opacity-50 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition ease-in-out duration-150"
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
