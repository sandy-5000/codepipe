<template>
  <label class="block font-normal text-sm text-label">
    {{ value }}
  </label>
</template>

<script setup>
const props = defineProps({
  value: String,
})
</script>
