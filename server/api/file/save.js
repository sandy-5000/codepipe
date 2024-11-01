import { defineEventHandler } from 'h3'
import Files from '~/server/models/file.model'
import { commitId } from '~/server/utils/uniqid'

export default defineEventHandler(async (event) => {
  const req = event.node.req
  const res = event.node.res
  const session = event.context.session
  res.setHeader('Content-Type', 'application/json')
  try {
    if (req.method === 'POST' || req.method === 'PUT') {
      const body = await readBody(event)
      if (!body._id || !session._id || body._id != session._id) {
        res.statusCode = 400
        return res.end(str({ error: 'Invalid request' }))
      }
      if (!body._id || !body.file_name || !body.data) {
        res.statusCode = 400
        return res.end(str({ error: 'Missing parameters' }))
      }
      if (req.method === 'POST') {
        const response = await CreateFile(body)
        return res.end(str(response))
      } else {
        const response = await UpdateFile(body)
        return res.end(str(response))
      }
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
      user_id: _id,
      name: file_name,
    },
    {
      $set: {
        data,
        last_commit: commitId(),
        last_modified: Date.now(),
      },
    },
    { upsert: true, returnNewDocument: true }
  )
  return {
    status: 'File Saved.',
    code: 200,
  }
}

async function CreateFile({ _id, file_name, data }) {
  let file = new Files({
    user_id: _id,
    name: file_name,
    data,
    last_commit: commitId(),
    last_modified: Date.now(),
  })
  let errors = {
    11000: 'File name already exists, File not Created!',
  }
  try {
    await file.save()
    return { code: 200, status: 'File Created Successfully.' }
  } catch (e) {
    console.log(e)
    return {
      code: 400,
      status: errors[e.code] || 'File Creation failed!',
    }
  }
}

async function UpdateFile({ _id, file_name, data }) {
  console.log({ _id, file_name })
  const file = await Files.findOne({
    user_id: _id,
    name: file_name,
  })
  if (!file) {
    return {
      code: 400,
      status: 'Updating File Failed',
    }
  }
  file.data = data
  file.last_commit = commitId()
  file.last_modified = Date.now()
  await file.save()
  return {
    code: 200,
    status: 'File Updated successfully',
  }
}
