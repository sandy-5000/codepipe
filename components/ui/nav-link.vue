<template>
  <NuxtLink
    :to="to"
    :class="{
      'cursor-pointer h-[70px] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-normal leading-5 transition duration-150 ease-in-out': true, // always apply these styles
      'border-app leading-5 text-site-content focus:outline-none': active,
      'border-transparent text-label-dark hover:text-label hover:border-over-site focus:outline-none focus:text-label focus:border-over-site':
        !active,
    }"
  >
    <slot />
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  active: Boolean,
  to: String,
})
</script>
