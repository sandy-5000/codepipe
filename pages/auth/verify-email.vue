<template>
  <NuxtLayout :name="layout" title="Verify Email">
    <div class="mb-4 text-sm text-label-dark">
      <p>
        Thanks for signing up! Before getting started, could you verify your
        email address by clicking on the link we just emailed to you? If you
        didn\'t receive the email, we will gladly send you another.
      </p>
    </div>

    <div class="mb-4 font-medium text-sm text-green-400">
      <p>
        A new verification link has been sent to the email address you provided
        during registration.
      </p>
    </div>

    <div class="mt-4 flex items-center justify-between">
      <div>
        <ui-button-primary>
          {{ __('Resend Verification Email') }}
        </ui-button-primary>
      </div>
      <button
        type="submit"
        class="underline text-sm text-label-dark hover:text-site-content rounded-md focus:outline-none focus:ring-2 focus:ring-app"
      >
        {{ __('Log Out') }}
      </button>
    </div>
  </NuxtLayout>
</template>

<script setup>
const layout = 'guest-layout'
</script>
