const http = require("http")
const pool = require('./db')

http.createServer((req,res) => {
    res.setHeader('Access-Control-Allow-Origin',"*")    
    let url = new URL(req.url,'https://whatever.org/')
    console.log(url)
    if(url.pathname == '/getcards'){
        getInfo(res)
    }else if(url.pathname.includes("/setcard")){
        setInfo(req, res)
    }else if(url.pathname.includes("delcard")){
        deleteCard(req, res)
    }
}).listen(9001, () => console.log('listening on 9001'))

async function deleteCard(req, res){
    let body = ""
    req.on('data', chunk =>{
        body += chunk
    })
    .on('end', async () => {
        body = JSON.parse(body)
        console.log(body)
        let qry = `delete from cards where id=${body.id}`
        await pool.query(qry)
        res.end()
    })
}

async function setInfo(req, res){
    let body = ""
    req.on('data', chunk =>{
        body += chunk
    })
    .on('end', async () => {
        body = JSON.parse(body)
        let qry = `insert into cards(question,answer) values('${body.question}','${body.answer}');`
        await pool.query(qry)
        res.end()
    })
}
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
