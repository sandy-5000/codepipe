<template>
  <div class="p-3 rounded-lg bg-site-light h-full flex justify-between">
    <div class="h-full w-2/3 pr-4">
      <MonacoEditor
        class="h-full"
        :options="options"
        :lang="lang || __('javascript')"
        v-model="code"
      >
        <div class="h-full w-full a-center">
          <p class="text-site-content text-xs uppercase">Editor loading</p>
        </div>
      </MonacoEditor>
    </div>
    <div class="h-full w-1/3 p-1">
      <div class="h-[90px]">
        <div
          class="h-[60px] flex justify-end items-center gap-2 pr-2 overflow-x-scroll"
        >
          <ui-button-secondary
            v-if="!loading"
            class="ring-2 ring-site-content"
            @click="handleClear"
            >Clear</ui-button-secondary
          >
          <ui-button-loading
            v-if="loading"
            class="ring-2 ring-site-content rounded-md"
            >Running...</ui-button-loading
          >
          <ui-button-danger
            v-else
            class="ring-2 bg-red-500 ring-red-500 text-site-content"
            @click="handleRunWithDelay(500)"
            >Run</ui-button-danger
          >
        </div>
        <div class="v-center h-[30px]">
          <p class="text-xs uppercase text-site-content">Output:</p>
        </div>
      </div>
      <div class="w-full bg-site rounded-md h-[440px] overflow-scroll">
        <pre class="text-site-content p-2 text-xs">{{
          loading ? __('Executing...') : output
        }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { __, templates } from '~/utils/helper'

const props = defineProps({
  store: Boolean,
  lang: String,
  run: Boolean,
})

const code = defineModel('data', '')

const output = ref('')
const loading = ref(false)

const options = {
  theme: 'app-theme',
  automaticLayout: true,
}

const emit = defineEmits(['update:code', 'press:run'])
watch(code, (value) => {
  if (props.store) {
    const lang = props.lang || __('javascript')
    localStorage.setItem(lang, value)
  }
  emit('update:code', value)
})

const handleClear = () => {
  output.value = ''
}

const handleRunWithDelay = (delay) => {
  loading.value = true
  setTimeout(() => {
    execute[props.lang || __('javascript')]()
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
    rules: [{ token: 'keyword', foreground: 'ff9900' }],
    colors: {
      'editor.background': '#131e24',
    },
  })

  window.addEventListener('keydown', handleKeydown)

  const lang = props.lang || __('javascript')
  if (props.store) {
    code.value = localStorage.getItem(lang)
  } else {
    code.value = templates[lang]
  }
  if (props.run) {
    execute[lang]()
  }
}

const runBeforeUnmount = () => {
  window.removeEventListener('keydown', handleKeydown)
}

onMounted(runOnMount)
onBeforeUnmount(runBeforeUnmount)
</script>
