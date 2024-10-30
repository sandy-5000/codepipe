<template>
  <NuxtLayout :name="layout" title="Profile">
    <message-alert :message="message" @close="(x) => (message = x)" />
    <header class="bg-site-light">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p class="text-site-content font-normal text-md px-2">
          User Saved Files
        </p>
      </div>
    </header>
    <div class="py-12 mx-2 md:mx-0">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div
          v-for="file of files"
          class="bg-site-light p-3 border-x-2 border-app flex justify-between"
        >
          <div class="flex a-center">
            <font-awesome-icon
              class="text-site-content pr-3 text-2xl"
              icon="fa-regular fa-file-lines"
            />
            <span class="text-site-content">{{ file.name }}</span>
          </div>
          <div class="a-center gap-2">
            <NuxtLink :to="ROUTES.EDITOR_FILE + file.name">
              <ui-button-primary>View</ui-button-primary>
            </NuxtLink>
            <ui-button-danger
              @click="() => deleteFile({ file_name: file.name })"
              class="bg-site hover:bg-site-lighter ring-2 ring-over-site"
            >
              <span class="text-red-500 font-bold">Delete</span>
            </ui-button-danger>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ROUTES } from '~/utils/helper'

const layout = 'main-layout'
const route = useRoute()
const { session } = await useSession()
if (!session.value || !session.value._id) {
  const loginRoute = navigateTo(`/user/login?redirect=${route.path}`)
}

const message = useState('message', () => '')
const files = useState('files', () => [])

const getFiles = async () => {
  if (!session.value || !session.value._id) {
    navigateTo(`/user/login?redirect=${route.path}`)
    return
  }
  const response = await $fetch('/api/file/user_files', {
    method: 'POST',
    body: {
      _id: session.value._id,
    },
  })
  if (Array.isArray(response)) {
    files.value = response
  }
}

getFiles()

const deleteFile = async ({ file_name }) => {
  if (!session.value || !session.value._id) {
    navigateTo(`/user/login?redirect=${route.path}`)
    return
  }
  const response = await $fetch('/api/file/delete', {
    method: 'POST',
    body: {
      _id: session.value._id,
      file_name,
    },
  })
  if (response.code == 204) {
    files.value = files.value.filter((file) => file.name != file_name)
    message.value = `File '${file_name}' Deleted successfully`
  }
}
</script>
