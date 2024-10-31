<style scoped>
.select-options-close {
  z-index: -1;
  opacity: 0;
  transform: translateX(-20%);
  transition: 0.2s;
}

.select-options-open {
  z-index: 30;
  opacity: 1;
  transform: translateX(0);
}
</style>

<template>
  <div class="relative">
    <ui-button-primary :disabled="fileName != LINE" @click="show = !show">
      <span class="w-20 text-center">
        {{ selected }}
      </span>
    </ui-button-primary>
    <div
      :class="{
        'absolute top-0 right-full w-full rounded-md bg-slate-100 opacity-40 py-2 mr-2 min-w-16 max-w-40 select-options-close': true,
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
import { LINE } from '~/utils/helper'

const props = defineProps({
  options: Array,
  value: String,
})

const route = useRoute()
const fileName = ref((route.params.file_name || '').trim())
const selected = defineModel('value', { default: 'javascript' })

const handleSelect = (value) => {
  selected.value = value
  show.value = false
}

const show = ref(false)
</script>
