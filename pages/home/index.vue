<style scoped>
.hover-effect {
  transform: scale(1);
  transition: all 0.3s;
}

.hover-effect:hover {
  transform: scale(1.05);
}
</style>

<template>
  <NuxtLayout :name="layout" :title="title">
    <chat-window></chat-window>
    <div class="w-full overflow-x-hidden">
      <div class="h-center">
        <div class="mt-16">
          <div class="h-center">
            <ui-logo-glow></ui-logo-glow>
          </div>
          <div class="h-center mt-3">
            <h1
              class="text-center logo-text-bright uppercase font-semibold text-md mx-20"
            >
              {{ getSiteName() }}
            </h1>
          </div>
        </div>
      </div>
      <div class="h-center">
        <div
          class="mt-12 mx-5 md:mx-16 lg:mx-32 xl:mx-40 2xl:mx-68 bg-site-light text-site-content shadow px-5 md:px-10 lg:px-16 xl:px-24 py-14 rounded-lg"
        >
          <h5 class="text-center font-normal text-lg pb-3">
            Hello,
            <span class="text-xl font-bold logo-text-bright"
              >{{ session.name || 'User' }}!</span
            >
          </h5>
          <p class="text-center text-sm font-normal pt-2">
            Welcome to
            <span class="logo-text-bright text-md font-semibold">
              {{ getSiteName() }}
            </span>
            , for a good javascript coding experiences.
          </p>
          <p class="text-center text-sm font-normal pt-2">
            <span class="logo-text-bright text-md font-semibold">
              {{ getSiteName() }}
            </span>
            is a collaborative platform for seamless real-time code syncing
            within channels. Instantly share and update code across users,
            ensuring everyone is always working on the latest version, and some
            more, didn't have energy to say all here, go find it yourself.
          </p>
        </div>
      </div>
      <div class="mt-16 w-full bg-app-grad p-1 h-[508px] relative a-center">
        <div class="z-[1]">
          <NuxtLink :to="session._id ? ROUTES.EDITOR : ROUTES.USER.REGISTER">
            <div
              class="group hover:scale-105 duration-300 ring-4 ring-site bg-slate-100 bg-opacity-40 rounded-2xl p-2"
            >
              <Button
                class="rounded-lg z-[1] py-4 px-12 bg-site-light text-site-content a-center"
              >
                <div class="a-center group-hover:scale-[0.96] duration-300">
                  <font-awesome-icon
                    v-if="session._id"
                    fill="#f1f5f9"
                    class="mr-3 font-[350]"
                    icon="fa-solid fa-code"
                  />
                  <font-awesome-icon
                    v-else
                    fill="#f1f5f9"
                    class="mr-3 font-[350]"
                    icon="fa-solid fa-user-plus"
                  />
                  <span class="font-[350]">{{
                    session._id ? __('Start coding') : __('Sign up')
                  }}</span>
                </div>
              </Button>
            </div>
          </NuxtLink>
        </div>
        <div class="absolute z-[0] left-1 top-1 w-full h-[500px]">
          <div
            v-for="row of grid"
            :class="{
              'w-[200%] flex overflow-x-auto': true,
              'scroll-content-oscillate-1': row.value === 0,
              'scroll-content-oscillate-2': row.value === 1,
              'scroll-content-oscillate-3': row.value === 2,
              'scroll-content-oscillate-4': row.value === 3,
            }"
          >
            <span class="inline-flex">
              <div
                v-for="width of row.boxes"
                :class="{
                  'h-[20px] p-[2px]': true,
                  'w-[20px]': width == 0,
                  'w-[30px]': width == 1,
                  'w-[40px]': width == 2,
                  'w-[50px]': width == 3,
                  'w-[60px]': width == 4,
                  'w-[70px]': width == 5,
                  'w-[80px]': width == 6,
                  'w-[90px]': width == 7,
                }"
              >
                <div
                  class="h-full w-full hover:bg-site-lighter rounded-md bg-site"
                ></div>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div class="h-40"></div>
      <div class="a-center">
        <div class="pb-4">
          <p
            class="text-center px-2 pb-1 capitalize border-b-2 border-app-light font-normal text-sm text-site-content"
          >
            To view in full screen go to Editor
          </p>
        </div>
      </div>
      <div class="bg-site h-[600px] w-full px-2 md:px-5 lg:px-10">
        <div class="h-full rounded-lg">
          <code-editor run></code-editor>
        </div>
      </div>
      <div
        class="editor-button flex justify-end my-3 px-3 md:px-3 lg:px-12 mt-5"
      >
        <span class="relative inline-flex">
          <NuxtLink :to="ROUTES.EDITOR" class="box-grad">
            <button
              type="button"
              class="duration-300 inline-flex items-center px-4 py-2 font-semibold leading-6 shadow rounded-sm text-site-content bg-button transition ease-in-out cursor-pointer"
            >
              <font-awesome-icon
                fill="#f1f5f9"
                class="text-md mr-2"
                icon="fa-solid fa-code"
              />
              <span class="font-[450] normal-case text-sm">Go To Editor</span>
            </button>
          </NuxtLink>
          <span class="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-app-light opacity-75"
            ></span>
            <span
              class="relative inline-flex rounded-full h-3 w-3 bg-site-lighter opacity-90"
            ></span>
          </span>
        </span>
      </div>
      <div class="py-28 a-center">
        <div>
          <div class="w-full a-center">
            <ui-logo-glow :className="'w-[250px]'"></ui-logo-glow>
          </div>
          <div class="a-center mt-10">
            <NuxtLink class="box-grad animate-pulse" :to="ROUTES.EDITOR">
              <Button
                class="duration-300 rounded-lg z-[1] py-4 px-12 bg-site-light text-site-content a-center"
              >
                <font-awesome-icon
                  fill="#f1f5f9"
                  class="mr-3 font-normal"
                  icon="fa-solid fa-code"
                />
                <span class="font-normal">View Editor</span>
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { __, ROUTES } from '~/utils/helper'

const layout = 'main-layout'
const title = 'Home'

const { session } = await useSession()
const grid = Array(25)
  .fill(undefined)
  .map(() => {
    return {
      value: Math.floor(Math.random() * 1331) % 4,
      boxes: Array(75)
        .fill(undefined)
        .map(() => Math.floor(Math.random() * 1331) % 8),
    }
  })
</script>
