import { defineEventHandler } from 'h3'

export default defineEventHandler(async (/* event */) => {
  // console.log(event.context.session)
  return { message: `Api [${getSiteName()}]` }
})
