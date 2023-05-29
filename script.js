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
  var iconePefil = document.getElementById('icone-perfil')
  var icone3 = document.getElementById('icone3')

  iconeLogout.parentNode.removeChild(iconeLogout)
  iconePefil.parentNode.removeChild(iconePefil)
  icone3.parentNode.removeChild(icone3)
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
    if (event.target == modal) {
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
        } else {
          mostrarMensagem('Conta não activa!', 'error')
          limparCampos()
        }
      } else {
        mostrarMensagem('Utilizador inexistente!', 'error')
        limparCampos()
      }
    })
    .catch(function (error) {
      console.error('Erro ao carregar o arquivo bd.json:', error)
    })
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
