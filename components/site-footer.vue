<template>
  <footer class="mt-auto w-full h-[80px] md:h-[65px] v-center bg-site-light">
    <div class="mx-5 md:mx-16 lg:mx-32 md:flex justify-between">
      <span class="text-site-content text-sm"
        >Copyright © {{ year }} {{ getSiteName() }}. All rights reserved.</span
      >
      <span
        class="block md:inline-flex font-normal text-site-content text-xs uppercase my-2 md:my-0"
      >
        <div class="flex justify-end">
          <NuxtLink class="h-[16px]" :to="ROUTES.DEVELOPER">
            <span>Developed by</span>
          </NuxtLink>
        </div>
      </span>
    </div>
  </footer>
</template>

<script setup>
import { ROUTES } from '~/utils/helper'

const date = new Date()
const year = date.getFullYear()
</script>
