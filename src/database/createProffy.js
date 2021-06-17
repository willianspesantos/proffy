module.exports = async function(db, {proffyValue, classesValue, cronogramaValues}) {
    // inserir dados na tabela de proffys
    const inserirProffy = await db.run(`
        INSERT INTO proffys (
            nome,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.nome}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        )
    `)
    
    const proffy_id = inserirProffy.lastID
    
    // inserir dados na tabela de classes
    
    const inserirClasses = await db.run(`
        INSERT INTO classes (
            selecao,
            custo,
            proffy_id
        ) VALUES (
            "${classesValue.selecao}",
            "${classesValue.custo}",
            "${proffy_id}"
        )
    `)

    const classe_id = inserirClasses.lastID   
    
    const inseridoTodosValoresCronograma = cronogramaValues.map((cronogramaValue)=>{
        return db.run(`
            INSERT INTO cronograma (
                semana,
                nesse_tempo,
                ate_tempo,
                classe_id
            ) VALUES (
                "${cronogramaValue.semana}",
                "${cronogramaValue.nesse_tempo}",
                "${cronogramaValue.ate_tempo}", 
                "${classe_id}" 
            )        
        `)
    })
    
    // aqui vai executar todos os db.run() dos cronogramas
    
    await Promise.all(inseridoTodosValoresCronograma)
}