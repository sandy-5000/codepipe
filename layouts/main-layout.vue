<template>
  <Head>
    <Title>CodeCargo | {{ title || 'Home' }}</Title>
    <Meta
      name="description"
      content="Welcome to CODECARGO - Your Ultimate Coding Hub!"
    />
  </Head>
  <div class="font-sans min-h-screen antialiased bg-site">
    <nav-bar></nav-bar>
    <div class="w-screen h-app-screen">
      <slot></slot>
    </div>
    <site-footer></site-footer>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
})
</script>
