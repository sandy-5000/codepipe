<template>
  <div class="p-3 rounded-lg bg-site-light h-full flex justify-between">
    <div class="h-full w-2/3 pr-4">
      <MonacoEditor
        class="h-full"
        :options="options"
        v-model="code"
        lang="javascript"
      >
        <div class="h-full w-full a-center">
          <p class="text-slate-100 text-xs uppercase">Editor loading</p>
        </div>
      </MonacoEditor>
    </div>
    <div class="h-full w-1/3 p-1">
      <div class="h-[68px] flex justify-between">
        <div class="v-center">
          <p class="text-xs uppercase text-slate-100">Output:</p>
        </div>
        <div class="v-center">
          <ui-button-danger @click="handleRun()"> Run </ui-button-danger>
        </div>
      </div>
      <div class="w-full bg-site rounded-md h-[500px] overflow-scroll">
        <pre class="text-slate-100 p-2 text-xs">{{ output }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  trigger: Boolean,
})

const code = ref(`
console.log('Hello World')
`)
const output = ref('')

const options = {
  theme: 'app-theme',
  automaticLayout: true,
}

if (props.trigger) {
  watch(code, (newCode) => {
    console.log(newCode)
  })
}

const handleRun = () => {
  let logOutput = ''
  const originalConsoleLog = console.log
  console.log = (...args) => {
    logOutput += args.map((arg) => String(arg)).join(' ') + '\n'
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
    console.log = originalConsoleLog
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
}

onMounted(runOnMount)
</script>
