<template>
  <nav class="w-full flex h-[70px] shadow-light">
    <div class="v-center mx-5 md:mx-10">
      <NuxtLink :to="ROUTES.HOME">
        <ui-logo-glow class="w-[55px]"></ui-logo-glow>
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup>
import { ROUTES } from '~/utils/helper'
</script>
