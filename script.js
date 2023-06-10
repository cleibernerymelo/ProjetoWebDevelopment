//Mostra o numero de telefone quando o utilizador passa o rato por cima do icone

function exibirNumero() {
  var telefoneTexto = document.getElementById('telefone-texto')
  telefoneTexto.classList.remove('hidden')
}

function ocultarNumero() {
  var telefoneTexto = document.getElementById('telefone-texto')
  telefoneTexto.classList.add('hidden')
}

//Quando o utilizador clica na seta, a pagina faz scroll para o topo

document
  .querySelector('.seta-link')
  .addEventListener('click', function (event) {
    event.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })

//Esconder os icones perfil e logout quando a pagina for carregada
window.addEventListener('DOMContentLoaded', function () {
  var iconeLogout = document.getElementById('icone-logout')
  var iconePerfil = document.getElementById('icone-perfil')
  var iconeConfig = document.getElementById('icone-config')

  iconeLogout.style.display = 'none'
  iconePerfil.style.display = 'none'
  iconeConfig.style.display = 'none'

  iconeLogout.addEventListener('click', logout)

  // iconeLogout.parentNode.removeChild(iconeLogout)
  // iconePefil.parentNode.removeChild(iconePefil)
})

//Validação do formulario de login

window.onload = function () {
  var modal = document.getElementById('login-modal')
  var closeButton = document.getElementsByClassName('close')[0]
  var loginForm = document.getElementById('login-form')
  var loginIcon = document.getElementById('login-icon')
  var body = document.body

  loginIcon.onclick = function () {
    modal.style.display = 'block'
    body.classList.add('modal-open')
    body.style.overflow = 'hidden'
  }

  closeButton.onclick = function () {
    modal.style.display = 'none'
    loginForm.reset()
    body.classList.remove('modal-open') // Remove a classe modal-open do corpo
    body.style.overflow = 'auto'
  }

  window.onclick = function (event) {
    if (
      event.target === modal ||
      event.target.getAttribute('data-modal') === 'login-modal'
    ) {
      modal.style.display = 'none'
    }
  }

  loginForm.onsubmit = function (e) {
    e.preventDefault() // Impede o envio do formulário
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    console.log('Email: ' + email)
    console.log('Password: ' + password)
    loginForm.reset()
  }

  var iconeLogout = document.getElementById('icone-logout')
  iconeLogout.onclick = logout
}

function validateEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

//Validar o preenchimento do campo de email e password. Mostrar mensagem de erro
function validarLogin(event) {
  event.preventDefault()

  var emailInput = document.getElementById('email')
  var passwordInput = document.getElementById('password')

  if (emailInput.value.trim() === '' && passwordInput.value.trim() === '') {
    var emailError = document.getElementById('email-error')
    emailError.innerHTML = 'Os dois campos são de preenchimento obrigatório!'
    emailInput.classList.add('error')
    emailInput.focus()
    return
  }

  if (emailInput.value.trim() !== '' && passwordInput.value.trim() === '') {
    var emailError = document.getElementById('email-error')
    emailError.innerHTML = 'O campo password é de preenchimento obrigatório!'
    emailInput.classList.add('error')
    emailInput.focus()
    return
  }

  if (emailInput.value.trim() === '') {
    var emailError = document.getElementById('email-error')
    emailError.innerHTML = 'O campo email é de preenchimento obrigatório!'
    emailInput.classList.add('error')
    emailInput.focus()
    return
  }

  if (passwordInput.value.trim() === '') {
    var passwordError = document.getElementById('password-error')
    passwordError.innerHTML = 'O campo password é de preenchimento obrigatório!'
    passwordInput.classList.add('error')
    passwordInput.focus()
    return
  }

  //condição para validar o formato do email
  if (!validateEmail(emailInput.value)) {
    var emailError = document.getElementById('email-error')
    emailError.innerHTML =
      'O email tem um formato incorrecto! Ex: username@dominio.com'
    emailInput.classList.add('error')
    emailInput.focus()
    return
  }

  // utilizar o fetch para carregar o arquivo bd.json/utilizadores e verificar se o email e password existem no ficheiro e se estão corretos mas não usar alert e sim o innerHTML para mostrar as mensagens
  fetch('bd.json')
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo bd.json')
      }
      return response.json()
    })
    .then(function (data) {
      var utilizadores = data.utilizadores
      var email = emailInput.value
      var password = passwordInput.value

      var utilizador = utilizadores.find(function (utilizador) {
        return utilizador.email === email && utilizador.password === password
      })

      if (utilizador) {
        if (utilizador.active === true) {
          mostrarMensagem('Login efetuado com sucesso!', 'success')
          limparCampos()
          var nomeUtilizador = document.getElementById('nome-utilizador')
          nomeUtilizador.textContent = 'Bem-vindo(a), ' + utilizador.name

          // Armazenar os dados de login na sessionStorage
          sessionStorage.setItem('isLoggedIn', true)
          sessionStorage.setItem('id', utilizador.id)
          sessionStorage.setItem('nomeUtilizador', utilizador.name)

          // Fechar a modal
          var modal = document.getElementById('login-modal')
          var body = document.body
          modal.style.display = 'none'
          body.classList.remove('modal-open')
          body.style.overflow = 'auto'

          // Mostrar os icones perfil e logout
          var iconeLogin = document.getElementById('login-icon')
          var iconeRecord = document.getElementById('icone-record')
          iconeLogin.style.display = 'none'
          iconeRecord.style.display = 'none'

          var iconeLogout = document.getElementById('icone-logout')
          var iconePerfil = document.getElementById('icone-perfil')

          iconeLogout.style.display = 'block'
          iconePerfil.style.display = 'block'
        }
        if (utilizador.active === true && utilizador.administrator === true) {
          mostrarMensagem('Login efetuado com sucesso!', 'success')
          limparCampos()
          var nomeUtilizador = document.getElementById('nome-utilizador')
          nomeUtilizador.textContent = 'Bem-vindo(a), ' + utilizador.name

          // Armazenar os dados de login na sessionStorage
          sessionStorage.setItem('isLoggedIn', true)
          sessionStorage.setItem('nomeUtilizador', utilizador.name)

          // Fechar a modal
          var modal = document.getElementById('login-modal')
          var body = document.body
          modal.style.display = 'none'
          body.classList.remove('modal-open')
          body.style.overflow = 'auto'

          // Mostrar os icones perfil e logout
          var iconeLogin = document.getElementById('login-icon')
          var iconeRecord = document.getElementById('icone-record')
          var iconeSearch = document.getElementById('icone-pesquisa')
          iconeLogin.style.display = 'none'
          iconeRecord.style.display = 'none'
          iconeSearch.style.display = 'none'

          var iconeLogout = document.getElementById('icone-logout')
          var iconePerfil = document.getElementById('icone-perfil')
          var iconeConfig = document.getElementById('icone-config')

          iconeLogout.style.display = 'block'
          iconePerfil.style.display = 'block'
          iconeConfig.style.display = 'block'
        } else {
          mostrarMensagem('Conta não ativa!', 'error')
          limparCampos()
        }
      } else {
        mostrarMensagem('Utilizador inexistente!', 'error')
        limparCampos()
      }
    })
    .catch(function (error) {
      console.error(error)
    })
}

function logout() {
  sessionStorage.clear()
  var nomeUtilizador = document.getElementById('nome-utilizador')
  nomeUtilizador.textContent = ''

  var iconeLogout = document.getElementById('icone-logout')
  var iconePerfil = document.getElementById('icone-perfil')
  var iconeConfig = document.getElementById('icone-config')

  iconeLogout.style.display = 'none'
  iconePerfil.style.display = 'none'
  iconeConfig.style.display = 'none'

  var iconeLogin = document.getElementById('login-icon')
  var iconeRecord = document.getElementById('icone-record')
  var iconeSearch = document.getElementById('icone-pesquisa')
  iconeLogin.style.display = 'block'
  iconeRecord.style.display = 'block'
  iconeSearch.style.display = 'block'
  iconeRecord.title = 'Registo'
  iconeLogin.title = 'Login'
}

function mostrarMensagem(mensagem, tipo) {
  var mensagemElemento = document.getElementById('mensagem')
  mensagemElemento.textContent = mensagem
  mensagemElemento.classList.add(tipo)
}

function limparCampos() {
  var emailInput = document.getElementById('email')
  var passwordInput = document.getElementById('password')
  var emailError = document.getElementById('email-error')
  var passwordError = document.getElementById('password-error')

  emailInput.value = ''
  passwordInput.value = ''
  emailError.innerHTML = ''
  passwordError.innerHTML = ''
}

// Função para quando o utiizador cicar para fechar a modal ou clicar fora da modal, limpar os campos email e password e as mensagens de erro

function fecharModal(event) {
  var modal = document.getElementById('login-modal')
  var emailInput = document.getElementById('email')
  var passwordInput = document.getElementById('password')
  var emailError = document.getElementById('email-error')
  var passwordError = document.getElementById('password-error')
  var mensagemElement = document.getElementById('mensagem')

  // Verifica se o elemento clicado está dentro da modal
  if (
    !modal.contains(event.target) &&
    event.target !== emailInput &&
    event.target !== passwordInput
  ) {
    emailInput.value = ''
    passwordInput.value = ''
    emailError.innerHTML = ''
    passwordError.innerHTML = ''
    mensagemElement.innerHTML = ''
  }
}

document.addEventListener('click', fecharModal)

// Evento de clique no botão de fechar a modal
var fecharModalButton = document.getElementById('fechar-modal-button')
fecharModalButton.addEventListener('click', fecharModal)

// Validação search lupa
function exibirInputPesquisa() {
  var inputPesquisa = document.getElementById('pesquisa')
  if (inputPesquisa.style.display === 'none') {
    inputPesquisa.style.display = 'inline-block'
    inputPesquisa.focus()
    document.addEventListener('click', fecharInputPesquisa)
  } else {
    inputPesquisa.style.display = 'none'
  }
}

function fecharInputPesquisa(event) {
  var iconePesquisa = document.getElementById('icone-pesquisa')
  var inputPesquisa = document.getElementById('pesquisa')

  if (
    !iconePesquisa.contains(event.target) &&
    !inputPesquisa.contains(event.target)
  ) {
    inputPesquisa.style.display = 'none'
    inputPesquisa.value = ''
    document.removeEventListener('click', fecharInputPesquisa)
  }
}

// slider automatico
document.addEventListener('DOMContentLoaded', function () {
  var slides = document.getElementsByClassName('carousel-item')
  var currentIndex = 0

  function showSlide(index) {
    // Remove a classe 'active' de todos os slides
    for (var i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active')
    }

    // Adiciona a classe 'active' ao slide atual
    slides[index].classList.add('active')
  }

  function nextSlide() {
    currentIndex++
    if (currentIndex === slides.length) {
      currentIndex = 0
    }
    showSlide(currentIndex)
  }

  // Mostra o primeiro slide
  showSlide(currentIndex)

  // Inicia a transição automática a cada 5 segundos
  setInterval(nextSlide, 5000)
})

// fechar a mensagem de cookies e remover o fundo semi-transparente
var button = document.querySelector('.cookie-message-button')
var message = document.querySelector('.cookie-message')
var overlay = document.createElement('div')
overlay.classList.add('cookie-overlay')

button.addEventListener('click', function () {
  message.style.display = 'none'
  overlay.style.display = 'none'
  document.body.style.overflow = 'auto' // Restaura a capacidade de fazer scroll na página
})

document.body.addEventListener('click', function (event) {
  if (message.style.display !== 'none') {
    event.stopPropagation()
  }
})

// Adiciona a camada overlay acima da página
document.body.appendChild(overlay)

//Ao clicar no icone record id=icone-record redirecinar para a pagina newUser.html
var iconeRecord = document.getElementById('icone-record')
iconeRecord.addEventListener('click', function () {
  window.location.href = 'newUser.html'
})

// Ao clicar no icone config icone-config redirecionar para a pagina admin_utilizadores.html
var iconeConfig = document.getElementById('icone-config')
iconeConfig.addEventListener('click', function () {
  window.location.href = 'admin_utilizadores.html'
})

// Ao clicar no icone perfil icone-perfil redirecionar para a pagina editUser.html
var iconePerfil = document.getElementById('icone-perfil')
iconePerfil.addEventListener('click', function () {
  window.location.href = 'editUser.html'
})
