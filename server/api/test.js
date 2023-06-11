const Router = require('koa-router')
const db = require('../db')
const router = new Router()

router.get('test', (ctx) => {
    ctx.body = "wut?"
    db.getConnection().then( conn => {
        conn.query("insert into entry (entry,status) values ('test',1)")
    })
})

module.exports = router.routes()
