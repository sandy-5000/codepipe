<template>
  <NuxtLayout :name="layout" :title="title">
    <div class="w-full h-full py-4">
      <p class="text-site-content text-md font-semibold uppercase text-center">
        Something went Wrong
      </p>
      <div class="a-center mt-4">
        <NuxtLink :to="ROUTES.HOME">
          <ui-button-primary>Return to Home</ui-button-primary>
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ROUTES } from '~/utils/helper'

const layout = 'guest-layout'
const title = 'Error'
</script>
