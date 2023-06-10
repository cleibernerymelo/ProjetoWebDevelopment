// Obtém o nome do usuário logado do localStorage (assumindo que foi armazenado lá durante o login)
var nomeUsuarioLogado = sessionStorage.getItem('nomeUtilizador')

// Localiza o elemento HTML onde o nome do usuário será exibido
var nomeUsuarioElemento = document.getElementById('nome-usuario')

// Define o conteúdo do elemento com o nome do usuário
nomeUsuarioElemento.textContent = 'Bem-vindo(a), ' + nomeUsuarioLogado

//Renderizar os dados do usuário na página de edição
document.addEventListener('DOMContentLoaded', function () {
  if (sessionStorage.getItem('nomeUtilizador')) {
    var nomeUtilizador = sessionStorage.getItem('nomeUtilizador')

    // Fazer a requisição para buscar o usuário no arquivo bd.json
    fetch('bd.json')
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Erro na recepção de dados!')
        }
        return response.json()
      })
      .then(function (data) {
        var utilizadores = data.utilizadores

        // Procurar o usuário correspondente pelo ID
        var utilizadorEncontrado = utilizadores.find(function (utilizador) {
          return utilizador.name === nomeUtilizador
        })

        if (utilizadorEncontrado) {
          renderizarDadosUtilizador(utilizadorEncontrado)
        } else {
          alert('Usuário não encontrado!')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  } else {
    console.log('ID do usuário não encontrado na sessionStorage!')
  }
})

function renderizarDadosUtilizador(utilizador) {
  var userDetails = document.getElementById('user-details')

  // Limpar o conteúdo existente
  userDetails.innerHTML = ''

  // var heading = document.createElement('h2')
  // heading.textContent = 'User Details'
  // userDetails.appendChild(heading)

  var table = document.createElement('table')
  table.classList.add('table', 'table-hover')

  var tbody = document.createElement('tbody')

  // Nome
  var nameRow = document.createElement('tr')
  var nameHeader = document.createElement('th')
  nameHeader.textContent = 'Name'
  var nameData = document.createElement('td')
  nameData.textContent = utilizador.name
  nameRow.appendChild(nameHeader)
  nameRow.appendChild(nameData)
  tbody.appendChild(nameRow)

  // Email
  var emailRow = document.createElement('tr')
  var emailHeader = document.createElement('th')
  emailHeader.textContent = 'Email'
  var emailData = document.createElement('td')
  emailData.textContent = utilizador.email
  emailRow.appendChild(emailHeader)
  emailRow.appendChild(emailData)
  tbody.appendChild(emailRow)

  // Senha
  var passwordRow = document.createElement('tr')
  var passwordHeader = document.createElement('th')
  passwordHeader.textContent = 'Senha'
  var passwordData = document.createElement('td')
  passwordData.textContent = utilizador.password
  passwordRow.appendChild(passwordHeader)
  passwordRow.appendChild(passwordData)
  tbody.appendChild(passwordRow)

  // Address
  var addressRow = document.createElement('tr')
  var addressHeader = document.createElement('th')
  addressHeader.textContent = 'Address'
  var addressData = document.createElement('td')
  addressData.textContent = utilizador.address
  addressRow.appendChild(addressHeader)
  addressRow.appendChild(addressData)
  tbody.appendChild(addressRow)

  // Postal Code
  var postalCodeRow = document.createElement('tr')
  var postalCodeHeader = document.createElement('th')
  postalCodeHeader.textContent = 'Postal Code'
  var postalCodeData = document.createElement('td')
  postalCodeData.textContent = utilizador.postalCode
  postalCodeRow.appendChild(postalCodeHeader)
  postalCodeRow.appendChild(postalCodeData)
  tbody.appendChild(postalCodeRow)

  // Country
  var countryRow = document.createElement('tr')
  var countryHeader = document.createElement('th')
  countryHeader.textContent = 'Country'
  var countryData = document.createElement('td')
  countryData.textContent = utilizador.country
  countryRow.appendChild(countryHeader)
  countryRow.appendChild(countryData)
  tbody.appendChild(countryRow)

  table.appendChild(tbody)
  userDetails.appendChild(table)
}

//botão editar
var editButton = document.getElementById('edit-button')
editButton.addEventListener('click', function () {
  var nameCell = document.getElementById('name-cell')
  var emailCell = document.getElementById('email-cell')

  nameCell.contentEditable = true
  emailCell.contentEditable = true

  nameCell.focus()

  editButton.disabled = true
})

// Event listener para salvar as alterações quando a tecla Enter for pressionada
document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    var activeElement = document.activeElement
    if (activeElement.isContentEditable) {
      activeElement.contentEditable = false
      editButton.disabled = false

      // Aqui você pode chamar uma função para salvar as alterações no backend
      console.log('Alterações salvas:', activeElement.textContent)
    }
  }
})

//ação do botão alterar informação para habilitar os campos da tabela
var editButton = document.getElementById('edit-button')

editButton.addEventListener('click', function () {
  var tableDataCells = document.querySelectorAll('#user-details td')
  if (tableDataCells.length > 0) {
    for (var i = 0; i < tableDataCells.length; i++) {
      tableDataCells[i].contentEditable = true
    }
    tableDataCells[0].focus()
  }
})

//logout voltar para a página de login
var iconePerfil = document.getElementById('icone-logout')
iconePerfil.addEventListener('click', function () {
  sessionStorage.clear()
  window.location.href = 'index.html'
})
