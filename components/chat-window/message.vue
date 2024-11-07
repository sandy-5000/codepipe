<template>
  <div
    :class="{
      'w-full flex justify-start': true,
      'justify-start': mtype === 'receive',
      'justify-end': mtype === 'sender',
    }"
  >
    <div
      :class="{
        'w-10/12 bg-site rounded-lg border-2 p-3 my-1 border-app': true,
        'rounded-bl-md': mtype === 'receive',
        'rounded-br-md': mtype === 'sender',
      }"
    >
      <div class="flex space-x-2">
        <icons-person></icons-person>
        <span class="text-label-dark text-xs">{{ user }}</span>
      </div>
      <code class="text-site-content mt-2 text-sm px-2">
        <slot />
      </code>
    </div>
  </div>
</template>

<script setup>
import { getSiteName } from '~/utils/helper'

const props = defineProps({
  mtype: String,
})

const company = getSiteName()

const userType = {
  [company]: company,
  receive: 'Anonymous',
  sender: 'You',
}
const user = userType[props.mtype]
</script>
