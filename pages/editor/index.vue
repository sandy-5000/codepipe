<template>
  <NuxtLayout :name="layout" :title="title">
    <div class="bg-site py-5 h-[600px] w-full px-2 md:px-5 lg:px-10">
      <div class="h-full rounded-lg">
        <code-editor
          :store="true"
          v-model:data="data"
          lang="javascript"
          @update:code="(x) => console.log(x)"
          @press:run="(x) => console.log('output: ', x)"
        ></code-editor>
      </div>
    </div>
    <div class="flex justify-start py-5 w-full px-2 md:px-5 lg:px-10 pb-10">
      <ui-button-primary @click="updateCode">Update</ui-button-primary>
    </div>
  </NuxtLayout>
</template>

<script setup>
const layout = 'main-layout'
const title = 'Editor'
const data = ref('<Sandy Blaze>')

const updateCode = () => {
  data.value = `\nconsole.log('Update from parent')\n`
}
</script>
