const mariadb = require('mariadb')

let pool = mariadb.createPool({
user:process.env.DBUSER,
    password:"example",
    user:"root",
    host:"127.0.0.1",
    port:"9000",
    database:"Books"
})

module.exports = pool
