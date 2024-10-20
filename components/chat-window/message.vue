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
        'w-10/12 bg-gray-950 rounded-lg border-2 p-3 my-1 border-orange-300': true,
        'rounded-bl-md': mtype === 'receive',
        'rounded-br-md': mtype === 'sender',
      }"
    >
      <div class="flex space-x-2">
        <icons-person></icons-person>
        <span class="text-gray-400 text-xs">{{ user }}</span>
      </div>
      <p class="text-gray-100 mt-2 text-sm px-2">
        <slot />
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  mtype: String,
})
const userType = {
  CodeCargo: 'CodeCargo',
  receive: 'Anonymous',
  sender: 'You',
}
const user = userType[props.mtype]
</script>
