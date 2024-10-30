import { defineEventHandler } from 'h3'
import Files from '~/server/models/file.model'

export default defineEventHandler(async (event) => {
  const req = event.node.req
  const res = event.node.res
  const session = event.context.session
  res.setHeader('Content-Type', 'application/json')
  try {
    if (req.method === 'POST') {
      const body = await readBody(event)
      if (!body._id || !session._id || body._id != session._id) {
        res.statusCode = 400
        return res.end(str({ error: 'Invalid request' }))
      }
      const response = await getFiles(body)
      return res.end(str(response))
    } else {
      res.statusCode = 405
      return res.end(str({ error: 'Invalid Request' }))
    }
  } catch (e) {
    console.error(e)
    return res.end(str({ error: e }))
  }
})

async function getFiles({ _id }) {
  const userFiles = Files.find({ user_id: _id }, { data: 0 })
  return userFiles
}
