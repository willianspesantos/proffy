const Database = require('./db.js')
const createProffy = require('./createProffy.js')

Database.then(async (db) => {
    //inserir dados
    proffyValue = {
        nome: "Mayk Brito",
        avatar: "https://avatars.githubusercontent.com/u/6643122?v=4",
        whatsapp: "21988556699",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.00 pessoas já passaram por uma das minhas explosões.",
    }
    
    classesValue = {
        selecao: 1,
        custo: "20.00"

    }
    
    cronogramaValues = [ 
        
        {
            semana: 1,
            nesse_tempo: 720,
            ate_tempo: 1220
        },
        {
            semana: 0,
            nesse_tempo: 520,
            ate_tempo: 1220
        }
    ]
    
    //await createProffy(db, {proffyValue, classesValue, cronogramaValues})
    
    //consultar os dados inseridos
   const selecionarProffys = await db.all("SELECT * FROM proffys")
   //console.log(selecionarProffys)

   //consultar as classes de um determinador professor e trazer junto os dados do professor
   const selecionarProffysEClasses = await db.all(`   
   SELECT classes.*,proffys.*
   FROM proffys
   JOIN classes ON (classes.proffy_id = proffys.id)
   WHERE classes.proffy_id = 1;
   `)
   //console.log(selecionarProffysEClasses)

   //o horário que a pessoa trabalha, por exemplo, é das 08h -18h

   const selecionarCronogramaClasses = await db.all(`
        SELECT cronograma.*
        FROM cronograma
        WHERE cronograma.classe_id = "1"
        AND cronograma.semana = "0"
        AND cronograma.nesse_tempo <= "520"
        AND cronograma.ate_tempo > "520"
   `)
   console.log(selecionarCronogramaClasses)
})