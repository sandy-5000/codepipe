<template>
  <NuxtLayout :name="layout" title="Profile">
    <header class="bg-site-light">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p class="text-site-content font-normal text-md px-2">Profile</p>
      </div>
    </header>
    <div class="py-12 mx-2 md:mx-0">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
        <div class="p-4 sm:p-8 bg-site-light shadow rounded-lg">
          <div class="max-w-xl">
            <section>
              <header>
                <h2 class="text-lg font-medium text-site-content">
                  {{ __('Profile Information') }}
                </h2>
                <p class="mt-1 text-sm text-label-dark">
                  {{
                    __(
                      "Update your account's profile information and email address."
                    )
                  }}
                </p>
              </header>
              <form
                @submit.prevent="handleProfileUpdate"
                class="mt-6 space-y-6"
              >
                <div>
                  <ui-input-label for="name" :value="__('Name')" />
                  <ui-text-input
                    id="name"
                    :value="info.profile.name"
                    @update:value="(x) => (info.profile.name = x)"
                    name="name"
                    placeholder="Enter Your Name"
                    type="text"
                    class="mt-1 block w-full"
                    required
                    autofocus
                  />
                  <ui-input-error class="mt-2" :messages="null" />
                </div>

                <div>
                  <ui-input-label for="email" :value="__('Email')" />
                  <ui-text-input
                    id="email"
                    :value="info.profile.email"
                    @update:value="(x) => (info.profile.email = x)"
                    name="email"
                    placeholder="Enter Your Email Address"
                    type="email"
                    class="mt-1 block w-full"
                    required
                  />
                  <ui-input-error class="mt-2" :messages="null" />

                  <div v-if="true">
                    <p class="text-sm mt-2 text-site-content">
                      {{ __('Your email address is unverified.') }}

                      <button
                        form="send-verification"
                        class="underline text-sm text-label-dark hover:text-site-content rounded-md focus:outline-none focus:ring-2 focus:ring-app"
                      >
                        {{
                          __('Click here to re-send the verification email.')
                        }}
                      </button>
                    </p>
                    <p
                      v-if="true"
                      class="mt-2 font-medium text-sm text-green-400"
                    >
                      {{
                        __(
                          'A new verification link has been sent to your email address.'
                        )
                      }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <ui-button-loading v-if="loadingProfileUpdate"
                    >Updating...</ui-button-loading
                  >
                  <ui-button-primary type="submit" v-else
                    >Save</ui-button-primary
                  >
                  <p
                    v-if="messageProfileUpdated !== __('')"
                    class="text-sm text-label-dark"
                  >
                    {{ messageProfileUpdated }}
                  </p>
                </div>
              </form>
            </section>
          </div>
        </div>

        <div class="p-4 sm:p-8 bg-site-light shadow rounded-lg">
          <div class="max-w-xl">
            <section>
              <header>
                <h2 class="text-lg font-medium text-site-content">
                  {{ __('Update Password') }}
                </h2>

                <p class="mt-1 text-sm text-label-dark">
                  {{
                    __(
                      'Ensure your account is using a long, random password to stay secure.'
                    )
                  }}
                </p>
              </header>

              <form
                @submit.prevent="handlePasswordUpdate"
                class="mt-6 space-y-6"
              >
                <div>
                  <ui-input-label
                    for="current_password"
                    :value="__('Current Password')"
                  />
                  <ui-text-input
                    id="current_password"
                    :value="info.passwd.current"
                    @update:value="(x) => (info.passwd.current = x)"
                    name="current_password"
                    placeholder="Enter Your Current Password"
                    type="password"
                    class="mt-1 block w-full"
                  />
                  <ui-input-error :messages="null" class="mt-2" />
                </div>

                <div>
                  <ui-input-label for="password" :value="__('New Password')" />
                  <ui-text-input
                    id="password"
                    :value="info.passwd.updated"
                    @update:value="(x) => (info.passwd.updated = x)"
                    name="password"
                    placeholder="Enter Strong Password"
                    type="password"
                    class="mt-1 block w-full"
                  />
                  <ui-input-error :messages="null" class="mt-2" />
                </div>

                <div>
                  <ui-input-label
                    for="password_confirmation"
                    :value="__('Confirm Password')"
                  />
                  <ui-text-input
                    id="password_confirmation"
                    :value="info.passwd.confirm"
                    @update:value="(x) => (info.passwd.confirm = x)"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    type="password"
                    class="mt-1 block w-full"
                  />
                  <ui-input-error :messages="null" class="mt-2" />
                </div>

                <div class="flex items-center gap-4">
                  <ui-button-loading v-if="loadingPasswdUpdate"
                    >Updating...</ui-button-loading
                  >
                  <ui-button-primary type="submit" v-else
                    >Save</ui-button-primary
                  >
                  <p
                    v-if="messagePasswordUpdated !== __('')"
                    class="text-sm text-label-dark"
                  >
                    {{ messagePasswordUpdated }}
                  </p>
                </div>
              </form>
            </section>
          </div>
        </div>

        <div class="p-4 sm:p-8 bg-site-light shadow rounded-lg">
          <div class="max-w-xl">
            <section class="space-y-6">
              <header>
                <h2 class="text-lg font-medium text-site-content">
                  {{ __('Delete Account') }}
                </h2>
                <p class="mt-1 text-sm text-label-dark">
                  Once your account is deleted, all of its resources and data
                  will be permanently deleted. Before deleting your account,
                  please download any data or information that you wish to
                  retain.
                </p>
              </header>
              <ui-button-danger>{{ __('Delete Account') }}</ui-button-danger>
            </section>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const layout = 'main-layout'
const { session, update } = await useSession()
const route = useRoute()
if (!session.value || !session.value._id) {
  const loginRoute = navigateTo(`/user/login?redirect=${route.path}`)
}

const defaultInfo = useState('defaultInfo', () => {
  return {
    name: session.value.name,
    email: session.value.email,
  }
})

const info = useState('info', () => {
  return {
    profile: {
      name: session.value.name,
      email: session.value.email,
    },
    passwd: {
      current: '',
      updated: '',
      confirm: '',
    },
  }
})

const messageProfileUpdated = ref('')
const messagePasswordUpdated = ref('')

const profileUpdated = (message) => {
  messageProfileUpdated.value = message || 'Profile updated.'
  setTimeout(() => {
    messageProfileUpdated.value = ''
  }, 5000)
}

const passwordUpdated = (message) => {
  messagePasswordUpdated.value = message || 'Password updated.'
  setTimeout(() => {
    messagePasswordUpdated.value = ''
  }, 5000)
}

const loadingProfileUpdate = ref(false)
const loadingPasswdUpdate = ref(false)

const handleProfileUpdate = async () => {
  const { name, email } = info.value.profile
  info.value.profile = { name: '', email: '' }
  if (!session.value || !session.value._id) {
    navigateTo(`/user/login?redirect=${route.path}`)
    return
  }
  loadingProfileUpdate.value = true
  try {
    const response = await $fetch('/api/user/profile', {
      method: 'PATCH',
      body: {
        update: 'profile',
        _id: session.value._id,
        name,
        email,
      },
    })
    if (!response.error) {
      await update({
        name: name || defaultInfo.value.name,
        email: email || defaultInfo.value.email,
      })
      defaultInfo.value = {
        name: session.value.name,
        email: session.value.email,
      }
    }
    info.value.profile = {
      name: defaultInfo.value.name,
      email: defaultInfo.value.email,
    }
    profileUpdated(response.error || response.status)
  } catch (e) {
    profileUpdated('Update Failed')
  } finally {
    loadingProfileUpdate.value = false
  }
}

const handlePasswordUpdate = async () => {
  const { current, updated, confirm } = info.value.passwd
  info.value.passwd = { current: '', updated: '', confirm: '' }
  if (!session.value || !session.value._id) {
    navigateTo(`/user/login?redirect=${route.path}`)
    return
  }
  if (updated !== confirm) {
    passwordUpdated("Password did't match")
    return
  }
  loadingPasswdUpdate.value = true
  try {
    const response = await $fetch('/api/user/profile', {
      method: 'PATCH',
      body: {
        update: 'passwd',
        _id: session.value._id,
        passwd: current,
        npasswd: updated,
      },
    })
    passwordUpdated(response.error || response.status)
  } catch (e) {
    passwordUpdated('Update Failed')
  } finally {
    loadingPasswdUpdate = false
  }
}
</script>
