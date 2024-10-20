<style scoped>
.hide-chat {
  transform: translateX(100%);
  transition: 0.2s;
}

.show-chat {
  transform: translateX(0);
}

.mid-window-size {
  height: calc(100vh - 130px);
}
</style>

<template>
  <div
    class="fixed right-4 bottom-4 z-[19] w-14 aspect-square rounded-full hover:cursor-pointer ring-4 ring-[#0d1519] bg-slate-100 bg-opacity-40 a-center"
  >
    <Button
      @click="show = true"
      class="ring-4 ring-orange-300 rounded-full w-10 aspect-square bg-orange-300 text-slate-100 a-center"
    >
      <div class="a-center">
        <font-awesome-icon
          class="text-slate-900 text-xl"
          icon="fa-regular fa-comments"
        />
      </div>
    </Button>
  </div>
  <div
    :class="{
      'fixed border-l-4 border-orange-400 z-20 top-0 right-0 h-screen bg-site w-[300px] md:w-[400px]': true,
      'hide-chat': true,
      'show-chat': show,
    }"
  >
    <div class="p-3 flex justify-start h-[60px]">
      <ui-button-primary @click="show = false">
        <div class="v-center pr-1">
          <font-awesome-icon icon="fa-solid fa-angles-right" />
        </div>
        <div class="v-center">
          <span class="text-xs">Close</span>
        </div>
      </ui-button-primary>
    </div>
    <div
      ref="messageContainer"
      class="mid-window-size p-5 relative overflow-y-scroll"
    >
      <chat-window-message mtype="CodeCargo"
        >Hello guys, this is CodeCargo!</chat-window-message
      >
      <chat-window-message
        v-for="msg of messages"
        :mtype="msg.id === id ? 'sender' : 'receive'"
        >{{ msg.content }}</chat-window-message
      >
    </div>
    <div class="h-[70px]">
      <form @submit.prevent="handleChatSubmit">
        <div class="h-[65px] py-2 px-3 relative">
          <input
            v-model="messageBox"
            placeholder="Message"
            class="text-sm outline-none border-2 border-gray-700 focus:border-orange-400 px-3 pr-[100px] rounded-lg w-full h-full text-gray-100 bg-site-light"
          />
          <div
            class="absolute h-full top-0 right-0 py-3 pr-4 flex flex-col justify-center"
          >
            <button
              type="submit"
              class="outline-none bg-gray-900 text-gray-100 border-2 border-gray-700 hover:border-indigo-600 focus:border-indigo-600 rounded-lg h-full px-3"
            >
              <font-awesome-icon icon="fa-solid fa-paper-plane" />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { uniqid, validate } from '~/utils/helper'

const { $socket } = useNuxtApp()

const show = useState('show', () => false)

let id = useState('id', () => '')

const socket = $socket

const messageBox = ref('')
const messageContainer = ref('')
const messages = useState('messages', () => [])

const scrollToBottom = () => {
  nextTick(() => {
    const container = messageContainer.value
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

const addMessage = ({ uid, content }) => {
  while (messages.value.length >= 200) {
    messages.value.shift()
  }
  messages.value.push({ id: uid, content })
  if (id.value === uid) {
    scrollToBottom()
  }
}

socket.on('chat-broadcast', (data) => {
  addMessage(data)
})

const handleChatSubmit = () => {
  socket.emit('chat-message', {
    uid: id.value,
    content: messageBox.value,
  })
  messageBox.value = ''
}

const getUserId = () => {
  let user_id = localStorage.getItem('user_id')
  if (!validate(user_id)) {
    user_id = uniqid()
    localStorage.setItem('user_id', user_id)
  }
  return user_id
}

const runOnMount = () => {
  id.value = getUserId()
  socket.emit('chat-connect', { user_id: id.value })
}

onMounted(runOnMount)
</script>
