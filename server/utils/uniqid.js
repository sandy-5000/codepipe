const uniqid = () => {
  const timeStamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 6)
  return [timeStamp.slice(0, 4), timeStamp.slice(4, 8), random].join('-')
}

const commitId = () => {
  const timeStamp = Date.now().toString(36)
  return timeStamp
}

export { uniqid, commitId }
