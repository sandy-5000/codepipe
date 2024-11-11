<template>
  <div class="p-3 rounded-lg bg-site-light h-full">
    <MonacoDiffEditor
      class="h-full"
      :options="options"
      :lang="lang"
      :original="originalCode"
      v-model="modifiedCode"
    ></MonacoDiffEditor>
  </div>
</template>

<script setup>
const lang = defineModel('lang', { default: 'javascript' })
const originalCode = defineModel('originalCode', {
  default: 'console.log("Hello World")',
})
const modifiedCode = defineModel('modifiedCode', {
  default: 'console.log("Hello World!")',
})

const options = {
  theme: 'app-theme',
  automaticLayout: true,
  readOnly: true,
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
}

onMounted(runOnMount)
</script>
