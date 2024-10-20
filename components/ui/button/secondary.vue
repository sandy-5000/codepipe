<template>
  <button
    :type="type || 'button'"
    class="inline-flex items-center px-4 py-2 bg-site hover:bg-white border border-gray-800 rounded-md font-semibold text-xs text-gray-300 hover:text-gray-800 uppercase tracking-widest shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
  >
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  type: String,
})
</script>
