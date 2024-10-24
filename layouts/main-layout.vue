<template>
  <Head>
    <Title>{{ getSiteName() }} | {{ title || 'Home' }}</Title>
    <Meta
      name="description"
      :content="
        __(
          `Welcome to ${getSiteName()?.toUpperCase()} - Your Ultimate Coding Hub!`
        )
      "
    />
  </Head>
  <div class="font-sans min-h-screen antialiased bg-site">
    <nav-bar class="m-container"></nav-bar>
    <div class="w-screen h-app-screen">
      <slot></slot>
    </div>
    <site-footer></site-footer>
  </div>
</template>

<script setup>
import { getUserId } from '~/utils/helper'

const { $socket } = useNuxtApp()
const socket = $socket

const props = defineProps({
  title: String,
})

const runOnMount = () => {
  const id = getUserId()
  socket.emit('user-connect', { user_id: id })
}

onMounted(runOnMount)
</script>
