<template>
  <div class="relative">
    <textarea
      v-bind:value="value"
      @input="$emit('update:value', $event.target.value)"
      :name="name || ''"
      :required="required || false"
      :id="id"
      :class="{
        'py-2 text-sm text-input w-full placeholder-app placeholder:text-sm border-over-site bg-site border-2 outline-none text-label px-3 focus:border-app-light focus:ring-app-light rounded-md shadow-sm': true,
        [className]: true,
      }"
      :disabled="disabled || false"
      :rows="rows || 4"
      autocomplete="false"
    ></textarea>
  </div>
</template>

<script setup>
import { __ } from '~/utils/helper'

const props = defineProps({
  id: String,
  disabled: Boolean,
  className: String,
  name: String,
  autocomplete: Boolean,
  required: Boolean,
  value: String,
  rows: Number,
})
</script>
