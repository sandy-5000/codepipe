import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faEye,
  faEyeSlash,
  faComments,
  faFileLines,
} from '@fortawesome/free-regular-svg-icons'
import {
  faCode,
  faUserPlus,
  faPlus,
  faClone,
  faXmark,
  faPaperPlane,
  faArrowDown,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faEye,
  faEyeSlash,
  faCode,
  faUserPlus,
  faPlus,
  faClone,
  faComments,
  faPaperPlane,
  faXmark,
  faArrowDown,
  faFloppyDisk,
  faFileLines
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
})
