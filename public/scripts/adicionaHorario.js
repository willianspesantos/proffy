const campoHorario = document.querySelector('#itens-cronograma')

const botaoNovoHorario = document.querySelector('#adiciona-tempo')

botaoNovoHorario.addEventListener('click', adicionaCampo)

function adicionaCampo() {
    const novoCampo = document.querySelector('.item-cronograma').cloneNode(true)
    campoHorario.appendChild(novoCampo)
    const campos = novoCampo.querySelectorAll('input')
    campos.forEach(function(campo) {
        campo.value = ""
    })
}