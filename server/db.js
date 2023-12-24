const mariadb = require('mariadb')

let port = process.env.NODE_ENV == 'dev' ? 9021 : 9000;

let pool = mariadb.createPool({
user:process.env.DBUSER,
    password:"example",
    user:"root",
    host:"127.0.0.1",
    port:port,
    database:"Books"
})

module.exports = pool
