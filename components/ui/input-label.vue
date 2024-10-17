<template>
  <label class="block font-normal text-sm text-gray-300">
    {{ value }}
  </label>
</template>

<script setup>
const props = defineProps({
  value: String,
})
</script>
