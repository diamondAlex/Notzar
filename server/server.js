const Koa = require('koa')
const Router = require('koa-router')
const Logger = require('koa-logger')
const Cors = require('@koa/cors')

const app = new Koa()
const router = new Router()

if (process.env.NODE_ENV === 'development') {
  app.use(Logger())
}

app.use(Cors())


// API 
require('./api')(router)
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
