<style scoped>
.hover-effect {
  transform: scale(1);
  transition: all 0.3s;
}

.hover-effect:hover {
  transform: scale(1.05);
}
</style>

<template>
  <NuxtLayout :name="layout" :title="title">
    <div class="w-full">
      <div class="h-center">
        <div class="mt-16">
          <div class="h-center">
            <ui-logo-glow></ui-logo-glow>
          </div>
          <div class="h-center mt-3">
            <h1
              class="text-center logo-text-bright uppercase font-semibold text-md mx-20"
            >
              CodeCargo
            </h1>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const layout = 'main-layout'
const title = 'Home'
</script>
