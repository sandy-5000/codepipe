import { defineEventHandler } from 'h3'
import Files from '~/server/models/file.model'
import { commitId } from '~/server/utils/uniqid'
import { Types } from 'mongoose'

export default defineEventHandler(async (event) => {
  try {
    const req = event.node.req
    const res = event.node.res
    const session = event.context.session
    res.setHeader('Content-Type', 'application/json')
    if (req.method === 'POST') {
      const body = await readBody(event)
      if (!body._id || !session._id || body._id != session._id) {
        res.statusCode = 400
        return res.end(str({ error: 'Invalid request' }))
      }
      if (!body._id || !body.file_name || !body.data) {
        res.statusCode = 400
        return res.end(str({ error: 'Missing parameters' }))
      }
      const response = await UpsertFile(body)
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

async function UpsertFile({ _id, file_name, data }) {
  await Files.findOneAndUpdate(
    {
      user_id: Types.ObjectId(_id),
      name: file_name,
    },
    {
      $set: {
        data,
        last_commit: commitId(),
      },
    },
    { upsert: true, returnNewDocument: true }
  )
  return {
    status: 'File Saved.',
  }
}
