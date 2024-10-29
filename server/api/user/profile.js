import { defineEventHandler } from 'h3'
import Users from '~/server/models/user.model'
import { Hash } from '~/server/utils/Hash'

export default defineEventHandler(async (event) => {
  try {
    const req = event.node.req
    const res = event.node.res
    const session = event.context.session
    res.setHeader('Content-Type', 'application/json')
    if (req.method === 'PATCH') {
      const body = await readBody(event)
      if (!body._id || !session._id || body._id != session._id) {
        res.statusCode = 400
        return res.end(str({ error: 'Invalid request' }))
      }
      if (body.update === 'profile') {
        if (!body._id || !body.name || !body.email) {
          res.statusCode = 400
          return res.end(str({ error: 'Missing parameters' }))
        }
        const response = await patchProfile(body)
        return res.end(str(response))
      } else if (body.update === 'passwd') {
        if (!body._id || !body.passwd || !body.npasswd) {
          res.statusCode = 400
          return res.end(str({ error: 'Missing parameters' }))
        }
        const responce = await patchPasswd(body)
        return res.end(str(responce))
      } else {
        return res.end(str({ error: 'Invalid Request' }))
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

async function patchProfile({ _id, name, email }) {
  const user = await Users.findById(_id, { passwd: 0 })
  if (user === null) {
    return {
      error: 'Update Failed',
    }
  }
  if (email?.trim()) {
    user.email = email
  }
  if (name?.trim()) {
    user.name = name
  }
  await user.save()
  return {
    status: 'Profile Updated.',
  }
}

async function patchPasswd({ _id, passwd, npasswd }) {
  const user = await Users.findById(_id)
  if (user === null) {
    return {
      error: 'Update Failed',
    }
  }
  const hash = await Hash(user.username + passwd + config.SALT)
  if (hash !== user.passwd) {
    return {
      error: 'Password Incorrect.',
    }
  }
  if (!npasswd || npasswd.length < 8) {
    return {
      error: 'Password Should contains atleast 8 characters.',
    }
  }
  const newHash = await Hash(user.username + npasswd + config.SALT)
  user.passwd = newHash
  await user.save()
  return {
    status: 'Password Updated.',
  }
}
