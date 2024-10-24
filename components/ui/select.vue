<style scoped>
.select-options-close {
  z-index: -1;
  opacity: 0;
  transform: scale(0.9) translateY(-20%);
  transition: 0.2s;
}

.select-options-open {
  z-index: 2;
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>

<template>
  <div class="relative">
    <ui-button-primary @click="show = !show">
      <span class="w-20 text-center">
        {{ selected }}
      </span>
    </ui-button-primary>
    <div
      :class="{
        'absolute top-full left-0 w-full rounded-md bg-slate-100 opacity-40 py-2 min-w-16 max-w-40 select-options-close': true,
        'select-options-open': show,
      }"
    >
      <span
        v-for="option of options"
        @click="handleSelect(option.value)"
        class="block mt-1 py-2 px-4 text-sm cursor-pointer hover:bg-site-lighter text-site hover:text-site-content"
        >{{ option.label }}</span
      >
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  options: Array,
  value: String,
})

const selected = defineModel('value', { default: 'javascript' })

const emit = defineEmits(['update:option'])
const handleSelect = (value) => {
  selected.value = value
  show.value = false
  emit('update:option', value)
}

const show = ref(false)
</script>
