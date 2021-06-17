
const selecoes = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
    ]
    
    const semanas = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sabado"
    ]
    
    //funções
    function pegaselecao(numeroSelecao){
        const posicao = +numeroSelecao -1
        return selecoes[posicao]
    }

    function converteHorasEmMinutos(tempo){
        const [hora, minutos] = tempo.split(":")
        return Number((hora * 60) + minutos)
    }

    module.exports = {
        selecoes,
        semanas,
        pegaselecao,
        converteHorasEmMinutos
    }