<style scoped>
.modal-close {
  z-index: -1;
  opacity: 0;
  transform: scale(0.8);
  transition: 0.2s;
}

.modal-open {
  z-index: 20;
  opacity: 1;
  transform: scale(1);
}

.close-button {
  padding: 8px 10px;
}
</style>

<template>
  <div
    :class="{
      'h-screen w-screen fixed top-0 left-0 bg-site-modal a-center modal-close': true,
      'modal-open': show,
    }"
    @click="show = false"
  >
    <div
      class="w-[300px] md:w-1/2 lg:w-2/5 xl:w-1/3 rounded-md ring-2 ring-over-site bg-site p-4"
      @click.stop="null"
    >
      <div class="flex justify-end">
        <ui-button
          @click="show = false"
          class="close-button ring-2 ring-over-site aspect-square"
        >
          <font-awesome-icon
            class="text-site-content text-xl"
            icon="fa-solid fa-xmark"
          />
        </ui-button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const show = defineModel('show', false)
</script>
