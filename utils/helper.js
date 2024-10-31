const __ = (string) => string

const LINE = '_____'

const ROUTES = {
  HOME: '/home',
  EDITOR: '/editor/_____',
  EDITOR_FILE: '/editor/',
  USER: {
    LOGIN: '/user/login',
    REGISTER: '/user/register',
    PROFILE: '/user/profile',
    FILES: '/user/files',
  },
  AUTH: {
    FORGET_PASSWORD: '/auth/forgot-password',
  },
  DEVELOPER: '/_____',
}

const uniqid = () => {
  const timeStamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 6)
  return [timeStamp.slice(0, 4), timeStamp.slice(4, 8), random].join('-')
}

const validate = (x) => {
  const pattern = /^[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}$/
  return pattern.test(x)
}

const getUserId = () => {
  let user_id = localStorage.getItem('user_id')
  if (!validate(user_id)) {
    user_id = uniqid()
    localStorage.setItem('user_id', user_id)
  }
  return user_id
}

const getSiteName = () => 'CodeCargo'

const getLanguage = (fileName = '') => {
  console.log(fileName)
  const extention = fileName.split('.').pop()
  const extentionMap = new Map([
    ['js', 'javascript'],
    ['py', 'python'],
  ])
  return extentionMap.get(extention)
}

const templates = {
  javascript: `\n/* Write your code here */\nconsole.log(\`Hello User!,\\nWelcome to ${getSiteName()}.\`)\n`,
  python: `\n# Write your code here\nprint(\`Hello User!,\\nWelcome to ${getSiteName()}.\`)\n`,
}

export {
  __,
  ROUTES,
  LINE,
  templates,
  uniqid,
  validate,
  getUserId,
  getSiteName,
  getLanguage,
}
