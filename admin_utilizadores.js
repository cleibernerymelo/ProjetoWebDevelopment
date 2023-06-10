//redirecionar para a pagina de login
document.querySelector('#icone-back').addEventListener('click', function () {
  window.location.href = 'index.html'
})

//Listar utilizadores em uma tabela

// fetch('bd.json')
//   .then(function (response) {
//     if (!response.ok) {
//       throw new Error('Erro na recepção de dados!')
//     }
//     return response.json()
//   })
//   .then(function (data) {
//     var utilizadores = data.utilizadores
//     var utilizadoresBody = document.getElementById('utilizadores-body')

//     utilizadores.forEach(function (utilizador) {
//       var row = document.createElement('tr')

//       var nomeCell = document.createElement('td')
//       nomeCell.textContent = utilizador.name
//       row.appendChild(nomeCell)

//       var emailCell = document.createElement('td')
//       emailCell.textContent = utilizador.email
//       row.appendChild(emailCell)

//       var addressCell = document.createElement('td')
//       addressCell.textContent = utilizador.address
//       row.appendChild(addressCell)

//       var postalCodeCell = document.createElement('td')
//       postalCodeCell.textContent = utilizador.postalCode
//       row.appendChild(postalCodeCell)

//       var countryCell = document.createElement('td')
//       countryCell.textContent = utilizador.country
//       row.appendChild(countryCell)

//       var administradorCell = document.createElement('td')
//       administradorCell.textContent = utilizador.administrator ? 'Sim' : 'Não'
//       row.appendChild(administradorCell)

//       var ativoCell = document.createElement('td')
//       ativoCell.textContent = utilizador.active ? 'Sim' : 'Não'
//       row.appendChild(ativoCell)

//       utilizadoresBody.appendChild(row)
//     })
//   })
//   .catch(function (error) {
//     console.log(error)
//   })

//ckeckbox administrador e active da tabela

// fetch('bd.json')
//   .then(function (response) {
//     if (!response.ok) {
//       throw new Error('Erro na recepção de dados!')
//     }
//     return response.json()
//   })
//   .then(function (data) {
//     var utilizadores = data.utilizadores
//     var utilizadoresBody = document.getElementById('utilizadores-body')

//     utilizadores.forEach(function (utilizador) {
//       var row = document.createElement('tr')

//       var nomeCell = document.createElement('td')
//       nomeCell.textContent = utilizador.name
//       row.appendChild(nomeCell)

//       var emailCell = document.createElement('td')
//       emailCell.textContent = utilizador.email
//       row.appendChild(emailCell)

//       var addressCell = document.createElement('td')
//       addressCell.textContent = utilizador.address
//       row.appendChild(addressCell)

//       var postalCodeCell = document.createElement('td')
//       postalCodeCell.textContent = utilizador.postalCode
//       row.appendChild(postalCodeCell)

//       var countryCell = document.createElement('td')
//       countryCell.textContent = utilizador.country
//       row.appendChild(countryCell)

//       var administradorCell = document.createElement('td')
//       var administradorCheckbox = document.createElement('input')
//       administradorCheckbox.type = 'checkbox'
//       administradorCheckbox.checked = utilizador.administrator
//       administradorCheckbox.addEventListener('change', function () {
//         utilizador.administrator = this.checked
//         saveChanges(utilizadores)
//       })
//       administradorCell.appendChild(administradorCheckbox)
//       row.appendChild(administradorCell)

//       var ativoCell = document.createElement('td')
//       var ativoCheckbox = document.createElement('input')
//       ativoCheckbox.type = 'checkbox'
//       ativoCheckbox.checked = utilizador.active
//       ativoCheckbox.addEventListener('change', function () {
//         utilizador.active = this.checked
//         saveChanges(utilizadores)
//       })
//       ativoCell.appendChild(ativoCheckbox)
//       row.appendChild(ativoCell)

//       utilizadoresBody.appendChild(row)
//     })
//   })
//   .catch(function (error) {
//     console.log(error)
//   })

// function saveChanges(utilizadores) {
//   fetch('bd.json', {
//     method: 'PUT',
//     body: JSON.stringify({ utilizadores: utilizadores }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(function (response) {
//       if (!response.ok) {
//         throw new Error('Erro ao salvar as alterações!')
//       }
//       return response.json()
//     })
//     .then(function () {
//       alert('Alterações salvas com sucesso!')
//     })
//     .catch(function (error) {
//       console.log(error)
//     })
// }

//emitr alerta de alteração de dados da checkbox administrador e active

fetch('bd.json')
  .then(function (response) {
    if (!response.ok) {
      throw new Error('Erro na recepção de dados!')
    }
    return response.json()
  })
  .then(function (data) {
    var utilizadores = data.utilizadores
    var utilizadoresBody = document.getElementById('utilizadores-body')

    utilizadores.forEach(function (utilizador) {
      var row = document.createElement('tr')

      var nomeCell = document.createElement('td')
      nomeCell.textContent = utilizador.name
      row.appendChild(nomeCell)

      var emailCell = document.createElement('td')
      emailCell.textContent = utilizador.email
      row.appendChild(emailCell)

      var addressCell = document.createElement('td')
      addressCell.textContent = utilizador.address
      row.appendChild(addressCell)

      var postalCodeCell = document.createElement('td')
      postalCodeCell.textContent = utilizador.postalCode
      row.appendChild(postalCodeCell)

      var countryCell = document.createElement('td')
      countryCell.textContent = utilizador.country
      row.appendChild(countryCell)

      var administradorCell = document.createElement('td')
      var administradorCheckbox = document.createElement('input')
      administradorCheckbox.type = 'checkbox'
      administradorCheckbox.checked = utilizador.administrator
      administradorCheckbox.addEventListener('change', function () {
        utilizador.administrator = this.checked
        saveChanges(utilizadores)
        alert('Alterações salvas com sucesso!')
      })
      administradorCell.appendChild(administradorCheckbox)
      row.appendChild(administradorCell)

      var ativoCell = document.createElement('td')
      var ativoCheckbox = document.createElement('input')
      ativoCheckbox.type = 'checkbox'
      ativoCheckbox.checked = utilizador.active
      ativoCheckbox.addEventListener('change', function () {
        utilizador.active = this.checked
        saveChanges(utilizadores)
        alert('Alterações salvas com sucesso!')
      })
      ativoCell.appendChild(ativoCheckbox)
      row.appendChild(ativoCell)

      utilizadoresBody.appendChild(row)
    })
  })
  .catch(function (error) {
    console.log(error)
  })

//utilizdor logado na pagina de login
// Obtém o nome do usuário logado do localStorage (assumindo que foi armazenado lá durante o login)
var nomeUsuarioLogado = sessionStorage.getItem('nomeUtilizador')

// Localiza o elemento HTML onde o nome do usuário será exibido
var nomeUsuarioElemento = document.getElementById('nome-usuario')

// Define o conteúdo do elemento com o nome do usuário
nomeUsuarioElemento.textContent = 'Bem-vindo(a), ' + nomeUsuarioLogado

//logout voltar para a página de login
var iconePerfil = document.getElementById('icone-logout')
iconePerfil.addEventListener('click', function () {
  sessionStorage.clear()
  window.location.href = 'index.html'
})
