const http = require("http")
const pool = require('./db')


http.createServer((req,res) => {
    res.setHeader('Access-Control-Allow-Origin',"*")    
    let url = new URL(req.url,'https://whatever.org/')
    console.log(url)
    if(url.pathname == '/getcards'){
        getCards(res)
    }else if(url.pathname.includes("/setcard")){
        setCard(req, res)
    }else if(url.pathname.includes("delcard")){
        deleteCard(req, res)
    }else if(url.pathname.includes("/getjournal")){
        getJournal(res)
    }
}).listen(9020, () => console.log(`listening on 9020, ${process.env.NODE_ENV}`))

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

async function setCard(req, res){
    let body = ""
    req.on('data', chunk =>{
        body += chunk
    })
    .on('end', async () => {
        body = JSON.parse(body)
        let qry = `insert into cards(question,answer) values('${body.question.replaceAll("'","''")}','${body.answer.replaceAll("'","''")}');`
        await pool.query(qry)
        res.end()
    })
}

async function getCards(res){
    let qry = "select * from cards;"
    let rows = await pool.query(qry)
    let ret_data = []
    for(let row of rows){
        ret_data.push(row)
    }
    
    res.write(JSON.stringify(ret_data))
    res.end()
}

async function getJournal(res){
    let qry = "select * from journal;"
    let rows = await pool.query(qry)
    let ret_data = []
    for(let row of rows){
        ret_data.push(row)
    }
    
    console.log("sup?")
    res.write(JSON.stringify(ret_data))
    res.end()
}

async function getCards(res){
    let qry = "select * from cards;"
    let rows = await pool.query(qry)
    let ret_data = []
    for(let row of rows){
        ret_data.push(row)
    }
    
    res.write(JSON.stringify(ret_data))
    res.end()
}
