<template>
  <NuxtLayout :name="layout" :title="title">
    <div class="bg-site pt-4 pb-5 h-[600px] w-full px-2 md:px-5 lg:px-10">
      <div class="h-full rounded-lg">
        <code-editor-differ
          v-model:lang="lang"
          v-model:originalCode="originalCode"
          v-model:modifiedCode="modifiedCode"
        />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ROUTES, LINE } from '~/utils/helper'
import { original, modified } from '~/utils/constants.temp'

const layout = 'main-layout'
const title = 'Diff'

const route = useRoute()
const fileName = ref((route.params.file_name || '').trim())

if (fileName.value == LINE) {
  navigateTo(ROUTES.EDITOR)
}

const originalCode = ref(original)
const modifiedCode = ref(modified)
const lang = ref('python')
</script>
