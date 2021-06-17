const Database = require('./database/db.js')

const { selecoes, semanas, pegaselecao, converteHorasEmMinutos } = require('./utils/format.js')

function paginaIndex(req, res) {
    return res.render("index.html")
}

async function paginaEstudo(req, res) {
    const filtros = req.query

    if (!filtros.selecao || !filtros.semana || !filtros.tempo) {
        return res.render("estudo.html", { filtros, selecoes, semanas })
    }

    //converter horas em minutos
    const tempoEmMinutos = converteHorasEmMinutos(filtros.tempo)

    const query = `
        SELECT classes.*,proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT cronograma.*
            FROM cronograma
            WHERE cronograma.classe_id = classes.id
            AND cronograma.semana = ${filtros.semana}
            AND cronograma.nesse_tempo <= ${tempoEmMinutos}
            AND cronograma.ate_tempo > ${tempoEmMinutos}
        )
        AND classes.selecao = '${filtros.selecao}'
    `

    // caso haja erro na consulta do banco de dados.
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy)=>{
            proffy.selecao = pegaselecao(proffy.selecao)
        })
        
        return res.render('estudo.html', {proffys, selecoes, semanas, filtros, })
    } catch (error) {
        console.log(error)
    }
}

function paginaEnsinar(req, res) {
    return res.render("ensinar.html",  { selecoes, semanas })
}

async function salvarClasses(req, res) {
    const createProffy = require('./database/createProffy')
    
    const proffyValue = {
        nome: req.body.nome,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classesValue = {
        selecao: req.body.selecao,
        custo: req.body.custo
    }

    const cronogramaValues = req.body.semana.map((semana, index)=>{
        return {
            semana,
            nesse_tempo: converteHorasEmMinutos(req.body.nesse_tempo[index]),
            ate_tempo: converteHorasEmMinutos(req.body.ate_tempo[index])
        }
    })
    
    try {
        const db = await Database
        await createProffy(db, { proffyValue, classesValue, cronogramaValues })
        
        let queryString = "?selecao=?" + req.body.selecao
        queryString += "semana=" + req.body.semana[0] 
        queryString += "&tempo=" + req.body.nesse_tempo[0] 
        return res.redirect("/estudo")
        
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    paginaEnsinar, paginaEstudo, paginaIndex, salvarClasses
}