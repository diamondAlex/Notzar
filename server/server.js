const http = require("http")
const pool = require('./db')

http.createServer((req,res) => {
    res.setHeader('Access-Control-Allow-Origin',"*")    
    getInfo(res)
}).listen(9001, () => console.log('listening on 9001'))

async function getInfo(res){
    let qry = "select * from cards;"
    let rows = await pool.query(qry)
    let ret_data = []
    for(let row of rows){
        ret_data.push(row)
    }
    
    res.write(JSON.stringify(ret_data))
    res.end()
}
