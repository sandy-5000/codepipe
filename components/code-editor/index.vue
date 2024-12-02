<template>
  <div class="p-3 rounded-lg bg-site-light h-full flex justify-between">
    <div class="h-full w-2/3 pr-4">
      <MonacoEditor
        class="h-full"
        :options="options"
        :lang="lang"
        v-model="code"
      >
        <div class="h-full w-full a-center">
          <p class="text-site-content text-xs uppercase">Editor loading</p>
        </div>
      </MonacoEditor>
    </div>
    <div class="h-full w-1/3 p-1">
      <div class="h-[130px]">
        <div
          class="h-[60px] flex gap-2 justify-end items-center pr-2 overflow-x-scroll"
        >
          <ui-button
            v-if="!loading"
            class="ring-2 text-site-content bg-site ring-over-site"
            @click="handleClear"
            >Clear</ui-button
          >
          <ui-button-loading
            v-if="loading"
            class="ring-2 ring-site-content rounded-md"
            >Running...</ui-button-loading
          >
          <ui-button
            v-else
            class="border-2 text-site-content border-over-site bg-red-500"
            @click="handleRunWithDelay(500)"
            >Run</ui-button
          >
        </div>
        <div class="h-[40px] flex justify-between">
          <code-editor-language
            v-model:value="lang"
            :options="languageOptions"
            class="h-full"
          />
          <code-editor-options
            v-if="route.path !== ROUTES.HOME && session._id"
            v-model:show="show"
            v-model:lang="lang"
            v-model:saving="fileSavingInProgress"
            @file:saved="handleFileSave"
            class="h-full"
          />
        </div>
        <div class="v-center h-[30px]">
          <p class="text-xs uppercase text-site-content">Output:</p>
        </div>
      </div>
      <div class="w-full bg-site rounded-md h-[400px] overflow-scroll">
        <pre class="text-site-content p-2 text-xs">{{
          loading ? __('Executing...') : output
        }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { __, templates } from '~/utils/helper'

const { session } = await useSession()

const props = defineProps({
  store: Boolean,
  lang: String,
  run: Boolean,
})

const route = useRoute()
const isLINE = ref((route.params.file_name || '').trim() === LINE)

const code = defineModel('data', '')
const lang = defineModel('language', { default: 'javascript' })

const languageOptions = [
  { label: 'Javascript', value: 'javascript' },
  { label: 'Python', value: 'python' },
]

const output = ref('')
const loading = ref(false)
const fileSavingInProgress = ref(false)
const show = ref(false)

const options = {
  theme: 'app-theme',
  automaticLayout: true,
}

const emit = defineEmits(['press:run', 'update:message'])
watch(code, (value) => {
  if (props.store) {
    localStorage.setItem(lang.value, value)
  }
})
watch(lang, (value) => {
  let savedCode = ''
  if (props.store) {
    savedCode = localStorage.getItem(value) || ''
  }
  code.value = savedCode
})

const handleClear = () => {
  output.value = ''
}

const handleFileSave = async ({ file_name, commit_message }) => {
  if (!session.value || !session.value._id) {
    navigateTo(`/user/login?redirect=${route.path}`)
    return
  }
  fileSavingInProgress.value = true
  try {
    const response = await $fetch('/api/file/save', {
      method: isLINE.value ? 'POST' : 'PUT',
      body: {
        _id: session.value._id,
        file_name,
        data: code.value,
      },
    })
    if (response.code === 200 || response.code === 400) {
      if (response.code === 200 && isLINE.value) {
        navigateTo(ROUTES.USER.FILES)
      }
      emit('update:message', response.status)
    } else {
      emit('update:message', 'An Error occred while Saving the File')
    }
  } catch (e) {
    console.log(e)
    emit('update:message', 'An Error occred while Saving the File')
  } finally {
    fileSavingInProgress.value = false
    show.value = false
  }
}

const handleRunWithDelay = (delay) => {
  loading.value = true
  setTimeout(() => {
    execute[lang.value]()
  }, delay)
}

const execute = {
  javascript: () => {
    let logOutput = ''
    output.value = ''
    loading.value = true
    const originalLog = console.log
    console.log = (...args) => {
      logOutput +=
        args
          .map((arg) => {
            if (typeof arg === 'object' && arg !== null) {
              try {
                return JSON.stringify(arg, null, 2)
              } catch (e) {
                return '[Circular]'
              }
            }
            return String(arg)
          })
          .join(' ') + '\n'
    }
    try {
      const result = eval(code.value)
      if (result !== undefined) {
        logOutput += `${String(result)}\n`
      }
      output.value = logOutput
    } catch (error) {
      output.value = `Error: ${error.message}`
    } finally {
      console.log = originalLog
      loading.value = false
    }
    emit('press:run', output.value)
  },
  python: () => {
    output.value = `Message: python compiler not avaliable`
    loading.value = false
    emit('press:run', output.value)
  },
}

const handleKeydown = (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
    event.preventDefault()
    handleRunWithDelay(500)
  }
}

const runOnMount = () => {
  const { $monaco } = useNuxtApp()

  $monaco.editor.defineTheme('app-theme', {
    base: 'vs-dark',
    inherit: true,
    rules: [{ token: 'keyword', foreground: '8597ff' }],
    colors: {
      'editor.background': '#131e24',
    },
  })

  window.addEventListener('keydown', handleKeydown)

  if (props.store) {
    code.value = localStorage.getItem(lang.value) || ''
  } else {
    code.value = templates[lang.value]
  }
  if (props.run) {
    execute[lang.value]()
  }
}

const runBeforeUnmount = () => {
  window.removeEventListener('keydown', handleKeydown)
}

onMounted(runOnMount)
onBeforeUnmount(runBeforeUnmount)
</script>
