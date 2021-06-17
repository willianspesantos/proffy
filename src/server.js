//servidor
const express = require('express')
const server = express()

const { paginaEnsinar, paginaEstudo, paginaIndex, salvarClasses } = require('./paginas.js')
//configurar nunjucks(template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,

})
//inicio e configuração do servidor
server
//receber os dados do req.body
.use(express.urlencoded({ extended:true }))
//configurar arquivos estáticos(css, scripts, imagens)
.use(express.static("public"))
//rotas de apicação
.get("/", paginaIndex)
.get("/estudo", paginaEstudo)
.get("/ensinar", paginaEnsinar)
.post("/salva-classe", salvarClasses)
//start do servidor
.listen(5500)