<template>
  <NuxtLayout :name="layout" :title="title">
    <chat-window></chat-window>
    <message-alert :message="message" @close="(x) => (message = x)" />
    <div class="bg-site py-5 h-[600px] w-full px-2 md:px-5 lg:px-10">
      <div class="h-full rounded-lg">
        <code-editor
          store
          v-model:data="data"
          lang="javascript"
          @update:code="(x) => handleCodeUpdate(x)"
          @press:run="(x) => console.log('output: ', x)"
        ></code-editor>
      </div>
    </div>
    <div v-if="session._id">
      <div class="pb-5 px-5 flex flex-col-reverse md:flex-row justify-between">
        <div class="px-4 mt-3 md:mt-0">
          <ui-input-label value="Channel ID" />
          <div class="relative w-[170px]">
            <div
              v-if="!!channelId"
              class="z-10 absolute right-0 top-0 h-full aspect-square p-1"
            >
              <div
                @click="copyChannel(channelId)"
                class="h-full bg-button cursor-pointer border-2 border-app rounded-md a-center p-1"
              >
                <font-awesome-icon
                  class="text-sm text-site-content"
                  icon="fa-solid fa-clone"
                />
              </div>
            </div>
            <ui-text-input
              className="block mt-1 w-full text-sm font-semibold"
              :value="inputChannelId"
              @update:value="(x) => (inputChannelId = x)"
              :disabled="!!channelId"
            />
          </div>
          <div class="mt-1 flex justify-start">
            <ui-button-primary
              @click="joinChannel()"
              v-if="!loading.join && !channelId"
              class="mt-1"
            >
              Join Channel
            </ui-button-primary>
            <ui-button-danger
              @click="leaveChannel()"
              v-if="!loading.join && !!channelId"
              class="mt-1"
            >
              Leave Channel
            </ui-button-danger>
          </div>
        </div>
        <div class="flex justify-end md:block">
          <ui-switch
            id="sync_code"
            :value="codeSync"
            @update:checked="(x) => (codeSync = x)"
            prompt="Synchronize Code"
          ></ui-switch>
        </div>
      </div>
      <div class="a-center my-5">
        <Button
          @click="createChannel()"
          :disabled="loading.create || !!channelId"
          class="border-2 disabled:opacity-50 disabled:cursor-not-allowed border-app rounded-lg z-[1] py-4 px-10 bg-site-lighter text-site-content a-center"
        >
          <font-awesome-icon
            fill="#f1f5f9"
            class="mr-3"
            icon="fa-solid fa-plus"
          />
          <span class="font-normal">Create Channel</span>
        </Button>
      </div>
    </div>
    <div v-else class="h-20"></div>
  </NuxtLayout>
</template>

<script setup>
import { getUserId, validate } from '~/utils/helper'

const { $socket } = useNuxtApp()

const layout = 'main-layout'
const title = 'Editor'
const data = ref('')
const lang = ref('')

const { session } = await useSession()

const socket = $socket

const codeSync = useState('codeSync', () => false)
const channelId = useState('channelId', () => '')
const inputChannelId = useState('inputChannelId', () => '')
const message = useState('message', () => '')
const previousCode = useState('previousCode', () => '')

const loading = useState('loading', () => {
  return {
    create: false,
    join: false,
  }
})

const handleMulticast = ({ sender_id, language, code }) => {
  if (sender_id == getUserId() || !codeSync.value) {
    return
  }
  lang.value = language
  data.value = code
  previousCode.value = code
}

const handleCodeUpdate = (code) => {
  if (previousCode.value == code) {
    return
  }
  const channel_id = localStorage.getItem('channel_id')
  if (channel_id && codeSync.value) {
    socket.emit('code-change', {
      channel_id,
      user_id: getUserId(),
      language: lang.value,
      code,
    })
  }
}

const copyChannel = (channel_id, msg) => {
  navigator.clipboard
    .writeText(channel_id)
    .then(() => {
      message.value = msg || 'Copied to clipboard.'
    })
    .catch((err) => {
      console.log(err)
    })
}

const createChannel = async () => {
  if (loading.value.create) {
    return
  }
  loading.value.create = true
  try {
    const response = await $fetch('/api/channel/create', {
      method: 'POST',
      body: {
        _id: getUserId(),
      },
    })
    if (response.channel_id) {
      if (!validate(response.channel_id)) {
        return
      }
      socket.emit('connect-channel', {
        channel_id: response.channel_id,
        user_id: getUserId(),
      })
      localStorage.setItem('channel_id', response.channel_id)
      channelId.value = response.channel_id
      inputChannelId.value = response.channel_id
      copyChannel(
        response.channel_id,
        'Channel ID Created, Copied to clipboard.'
      )
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value.create = false
  }
}

const joinChannel = async () => {
  const channel_id = inputChannelId.value || localStorage.getItem('channel_id')
  if (loading.value.join || !channel_id) {
    return
  }
  if (!validate(channel_id)) {
    message.value = 'Invalid channel'
    return
  }
  loading.value.join = true
  try {
    const response = await $fetch('/api/channel/join', {
      method: 'POST',
      body: {
        _id: getUserId(),
        channel_id: channel_id,
      },
    })
    if (response.channel_id) {
      if (!validate(response.channel_id)) {
        return
      }
      socket.emit('connect-channel', {
        channel_id: response.channel_id,
        user_id: getUserId(),
      })
      localStorage.setItem('channel_id', response.channel_id)
      channelId.value = response.channel_id
      inputChannelId.value = response.channel_id
    }
  } catch (e) {
    console.log(e)
  } finally {
    loading.value.join = false
  }
}

const leaveChannel = () => {
  socket.emit('leave-channel', {
    user_id: getUserId(),
  })
  channelId.value = ''
}

const runOnMount = () => {
  loading.value = {
    create: false,
    join: false,
  }
  codeSync.value = false
  channelId.value = ''
  inputChannelId.value = ''
  message.value = ''
  previousCode.value = data.value
  socket.on('multicast', handleMulticast)
}

const runBeforeUnmount = () => {
  socket.off('multicast')
}

onMounted(runOnMount)
onBeforeUnmount(runBeforeUnmount)
</script>
