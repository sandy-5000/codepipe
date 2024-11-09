<template>
  <NuxtLayout :name="layout" :title="title">
    <div class="w-full h-full py-4">
      <p class="text-site-content text-lg font-semibold text-center">
        Status: {{ error.status || 404 }}
      </p>
      <p class="text-site-content text-md font-semibold text-center">
        {{ error.message || 'Something went Wrong' }}
      </p>
      <div class="a-center mt-4">
        <button @click="handleError">
          <ui-button-primary>Return to Home</ui-button-primary>
        </button>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ROUTES } from '~/utils/helper'

const layout = 'guest-layout'
const title = 'Error'

const error = useError()

const handleError = () => {
  clearError({
    redirect: ROUTES.HOME,
  })
}
</script>
