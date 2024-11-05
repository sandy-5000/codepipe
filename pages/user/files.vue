<template>
  <NuxtLayout :name="layout" title="File store">
    <popup-modal v-model:show="show">
      <div class="px-3">
        <p
          class="italic border-b-2 border-over-site pt-4 pb-3 mb-3 text-site-content"
        >
          Confirm deleting the file `{{ fileToDelete }}`
        </p>
        <p class="text-site-content px-1 pt-5 my-auto text-sm">
          Type <i class="font-semibold text-md">`{{ fileToDelete }}`</i> in the
          text input to delete
        </p>
        <ui-text-input
          class="mt-3"
          @update:value="(x) => (inputField = x)"
        ></ui-text-input>
        <p class="text-site-content px-1 pt-5 my-auto text-sm">
          Note: Deleting file
          <i>`{{ fileToDelete }}`</i> is an irreversible operation.
        </p>
        <div class="flex justify-end py-5">
          <ui-button-loading v-if="loading">Deleting...</ui-button-loading>
          <ui-button-danger
            v-else
            @click="deleteFile"
            :disabled="inputField != fileToDelete"
            >Delete this file</ui-button-danger
          >
        </div>
      </div>
    </popup-modal>
    <message-alert :message="message" @close="(x) => (message = x)" />
    <header class="bg-site-light">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p class="text-site-content font-normal text-md px-2">File Store</p>
      </div>
    </header>
    <div class="py-12 mx-2 md:mx-0">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <div v-for="file of files">
            <div
              class="rounded-sm hover:md:border-l-[15px] duration-150 border-l-4 border-app bg-site-light px-3 pt-3 pb-2"
            >
              <div>
                <div class="flex flex-col justify-between pt-2">
                  <div class="flex">
                    <font-awesome-icon
                      class="text-site-content pr-3 text-3xl"
                      icon="fa-solid fa-file-invoice"
                    />
                    <code class="v-center">
                      <span class="text-site-content font-semibold">{{
                        file.name
                      }}</span>
                    </code>
                  </div>
                  <div class="pt-5">
                    <div class="text-site-content text-[11px] md:text-xs">
                      <code>
                        <span class="border-b-2 border-app mb-4">Details:</span>
                        <p class="pt-2">
                          File Name:
                          <span class="normal-case">
                            {{ file.name }}
                          </span>
                        </p>
                        <p>
                          Last Modifed:
                          <span class="lowercase">
                            {{ getTimeStamp(file.last_modified) }}
                          </span>
                        </p>
                        <p>
                          Last commit:
                          <span class="normal-case">
                            {{ file.last_commit }}
                          </span>
                        </p>
                      </code>
                    </div>
                  </div>
                </div>
                <div class="flex justify-end gap-2 pt-8 pb-2">
                  <NuxtLink :to="ROUTES.EDITOR_FILE + file.name">
                    <ui-button-primary>View</ui-button-primary>
                  </NuxtLink>
                  <ui-button-danger
                    @click="
                      () => {
                        inputField = ''
                        fileToDelete = file.name
                        show = true
                      }
                    "
                    class="bg-site hover:bg-site-lighter ring-2 ring-over-site"
                  >
                    <span class="text-red-500 font-bold">Delete</span>
                  </ui-button-danger>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { getTimeStamp, ROUTES } from '~/utils/helper'

const layout = 'main-layout'
const route = useRoute()
const { session } = await useSession()
if (!session.value || !session.value._id) {
  navigateTo(`/user/login?redirect=${route.path}`)
}

const message = useState('message', () => '')
const files = useState('files', () => [])
const show = ref(false)
const loading = ref(false)

const fileToDelete = ref('')
const inputField = ref('')

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

const deleteFile = async () => {
  if (!session.value || !session.value._id) {
    navigateTo(`/user/login?redirect=${route.path}`)
    return
  }
  if (fileToDelete.value != inputField.value) {
    return
  }
  const file_name = fileToDelete.value
  loading.value = true
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
  } else {
    message.value =
      (response.message || 'Deletion Failed') + ` File '${file_name}'`
  }
  inputField.value = ''
  loading.value = false
  show.value = false
}
</script>
