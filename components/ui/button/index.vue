<template>
  <button
    :type="type || __('button')"
    class="inline-flex items-center px-4 py-2 rounded-md font-semibold text-xs uppercase tracking-widest shadow-sm disabled:opacity-25 transition ease-in-out duration-150"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  type: String,
})
</script>
