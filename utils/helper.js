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

const templates = {
  javascript: `\n/* Write your code here */\nconsole.log(\`Hello User!,\\nWelcome to CodeCargo.\`)\n`,
}

export { __, ROUTES, templates }
