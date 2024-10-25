<style scoped>
.save-options-close {
  z-index: -1;
  opacity: 0;
  transform: translateY(-20%);
  transition: 0.2s;
}

.save-options-open {
  z-index: 30;
  opacity: 1;
  transform: translateY(0);
}
</style>

<template>
  <div class="relative">
    <button
      class="a-center p-2 border-2 border-over-site rounded-md bg-site-lighter text-site-content hover:bg-site-content hover:text-site duration-300 aspect-square h-[32px] ring-site-content"
      @click="show = !show"
    >
      <font-awesome-icon class="text-sm" icon="fa-solid fa-floppy-disk" />
    </button>
    <div
      :class="{
        'absolute top-full right-0 w-[300px] rounded-lg bg-site-lighter border-2 border-over-site py-2 save-options-close': true,
        'save-options-open': show,
      }"
    >
      <div class="p-2">
        <p
          class="text-center text-site-content border-b-2 border-app uppercase font-semibold text-xs pb-2 mb-3"
        >
          Save File
        </p>
        <form @submit.prevent="handleSubmit">
          <div class="mt-1">
            <ui-input-label for="file_name" :value="__('File Name')" />
            <ui-text-input
              id="file_name"
              className="block mt-1 w-full text-sm"
              type="text"
              name="file_name"
              @update:value="(x) => (body.file_name = x)"
              required
            ></ui-text-input>
          </div>
          <div class="mt-1">
            <ui-input-label
              for="commit_message"
              :value="__('Commit Message')"
            />
            <ui-textarea
              id="commit_message"
              className="block mt-1 w-full"
              name="commit_message"
              rows="4"
              @update:value="(x) => (body.commit_message = x)"
              required
            ></ui-textarea>
          </div>
          <div class="mt-4 flex justify-end">
            <ui-button-loading v-if="loading" class="ms-3">
              saving file...
            </ui-button-loading>
            <ui-button-primary v-else class="ms-3" type="submit">
              save
            </ui-button-primary>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  fileName: String,
})

const body = useState('body', () => {
  return {
    file_name: '',
    commit_message: '',
  }
})

const emit = defineEmits(['save:file'])
const handleSubmit = () => {
  console.log(body.value)
  show.value = false
}

const show = ref(false)
const loading = ref(false)
</script>
