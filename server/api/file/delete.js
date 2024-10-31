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
      if (!body._id || !body.file_name) {
        res.statusCode = 400
        return res.end(str({ error: 'Missing parameters' }))
      }
      const response = await deleteContent(body)
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

async function deleteContent({ _id, file_name }) {
  const file = await Files.deleteOne({
    user_id: _id,
    name: file_name,
  })
  if (file.acknowledged && file.deletedCount == 1) {
    return { code: 204, message: 'Deleted Success fully' }
  }
  return { code: 500, message: 'An Error occured while deleting' }
}
