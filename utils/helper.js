const __ = (string) => string

const ROUTES = {
  HOME: '/home',
  EDITOR: '/editor',
  USER: {
    LOGIN: '/user/login',
    REGISTER: '/user/register',
    PROFILE: '/user/profile',
  },
  AUTH: {
    FORGET_PASSWORD: '/auth/forgot-password',
  },
  DEVELOPER: '/_____',
}

export { __, ROUTES }
