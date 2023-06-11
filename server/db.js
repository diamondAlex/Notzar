const mariadb = require('mariadb')

let pool = mariadb.createPool({
user:process.env.DBUSER,
    password:process.env.DBPASS,
    port:process.env.DBPORT,
    database:"Books"
})

module.exports = pool
