<template>
  <button
    :type="type || 'button'"
    class="inline-flex items-center px-4 py-2 bg-site hover:bg-white border border-button rounded-md font-semibold text-xs text-label hover:text-button uppercase tracking-widest shadow-sm focus:outline-none focus:ring-2 focus:ring-app disabled:opacity-25 transition ease-in-out duration-150"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: String,
})
</script>
