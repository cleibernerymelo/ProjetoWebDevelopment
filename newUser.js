let url = 'http://localhost:3000/utilizadores'

// function mostraListaPerfumes(perfumes) {
//   let conteudo = ''
//   for (let perfume of perfumes) {
//     conteudo += `<tr data-id="${perfume.id}">`
//     conteudo += `<td>${perfume.marca}</td>`
//     conteudo += `<td>${perfume.nome}</td>`
//     conteudo += `<td>${perfume.preco}</td>`
//     conteudo += `<td>${perfume.destaque}</td>`
//     conteudo += `<td><button type="button" data-id="${perfume.id}" class="botaoDelete">X</button></td>`
//     conteudo += '</tr>'
//   }
//   document.querySelector('#tabelaDados tbody').innerHTML = conteudo
//   document.querySelector('#total').innerHTML = perfumes.length
// }
// function lePerfumes() {
//   fetch(url)
//     .then(function (resposta) {
//       if (resposta.ok) {
//         return resposta.json()
//       } else {
//         return Promise.reject('Erro na recepção de dados!')
//       }
//     })
//     .then(perfumes => {
//       mostraListaPerfumes(perfumes)
//     })
//     .catch(erro => {
//       alert('Ocorreu um erro: ' + erro)
//     })
// }

// document.querySelector('#tabelaDados').addEventListener('click', function (e) {
//   // if (e.target.nodeName==="BUTTON" && e.target.classList.contains("botaoDelete")) {
//   if (e.target.classList.contains('botaoDelete')) {
//     if (confirm('Pretende remover o perfume?')) {
//       let id = e.target.getAttribute('data-id')

//       fetch(`${url}/${id}`, { method: 'DELETE' })
//         .then(function (resposta) {
//           if (resposta.ok) {
//             return resposta.json()
//           } else {
//             return Promise.reject('Erro na recepção de dados!')
//           }
//         })
//         .then(() => {
//           lePerfumes()
//           alert('Perfume eliminado!')
//         })
//         .catch(erro => {
//           console.log('Ocorreu um erro: ' + erro)
//         })
//     }
//   }
// })

function insereNewUser() {
  let vnome = document.querySelector('#nome').value
  let vemail = document.querySelector('#email').value
  let vpassword = document.querySelector('#password').value
  let vconfirmPassword = document.querySelector('#confirmPassword').value
  let vmorada = document.querySelector('#morada').value
  let vcodigoPostal = document.querySelector('#codigoPostal').value
  let vpais = document.querySelector('#pais').value

  fetch('bd.json')
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error('Erro na recepção de dados!')
      }
      return resposta.json()
    })
    .then(function (data) {
      var utilizadores = data.utilizadores
      var email = document.querySelector('#email').value

      var utilizador = utilizadores.find(function (utilizador) {
        return utilizador.email === email
      })

      if (utilizador) {
        throw new Error('O email informado já está em uso.')
      }
    })
    .then(function () {
      var isValid = vpassword === vconfirmPassword
      if (!isValid) {
        throw new Error('As senhas não são iguais.')
      } else if (!validateEmail(vemail)) {
        throw new Error('O email informado não é válido.')
      } else if (!validatePasswordConstraints(vpassword)) {
        throw new Error(
          'A senha deve ter pelo menos 8 caracteres. Incluir uma letra maiúscula, uma letra minúscula, um número e um símbolo.'
        )
      } else if (!validatePostalCode(vcodigoPostal)) {
        throw new Error(
          'O formato do código postal inválido. Formato válido  9999-999'
        )
      } else {
        alert('Utilizador criado com sucesso!')
        window.location.href = 'index.html'

        let newUser = {
          name: vnome,
          email: vemail,
          password: vpassword,
          confirmPassword: vconfirmPassword,
          address: vmorada,
          postalCode: vcodigoPostal,
          country: vpais,
          administrator: false,
          active: false
        }

        return fetch(`${url}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newUser)
        })
      }
    })
    .then(function (resposta) {
      if (!resposta.ok) {
        throw new Error('Erro na recepção de dados!')
      }
      return resposta.json()
    })
    .catch(function (erro) {
      alert(erro)
    })
}

document
  .querySelector('#btInsereNewUser')
  .addEventListener('click', insereNewUser)

//Habilitar o botão de submissão do formulário apenas quando tods os campos estiverem preenchidos

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('formInsereNewUser')
  var btInsereNewUser = document.getElementById('btInsereNewUser')
  var selectPais = document.getElementById('pais')

  function checkFormValidity() {
    var isValid = true
    var fields = form.querySelectorAll('input[required]')
    fields.forEach(function (field) {
      if (!field.value.trim()) {
        isValid = false
      }
    })

    var selectedPais = selectPais.value
    if (!selectedPais || selectedPais === '') {
      isValid = false
    }

    btInsereNewUser.disabled = !isValid
  }

  form.addEventListener('input', checkFormValidity)
})

//valiar formato do email
document.addEventListener('DOMContentLoaded', function () {
  var emailInput = document.getElementById('email')
  var emailError = document.getElementById('emailError')

  function validateEmail() {
    var email = emailInput.value
    var isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) // Validação básica de email usando uma expressão regular

    emailError.style.display = isValid ? 'none' : 'inline'
    emailInput.setCustomValidity(isValid ? '' : 'Email inválido')
  }

  emailInput.addEventListener('input', validateEmail)
})

//validar se as passwords são iguais
document.addEventListener('DOMContentLoaded', function () {
  var passwordInput = document.getElementById('password')
  var confirmPasswordInput = document.getElementById('confirmPassword')
  var passwordError = document.getElementById('passwordError')

  function validatePassword() {
    var password = passwordInput.value
    var confirmPassword = confirmPasswordInput.value
    var isValid = password === confirmPassword

    passwordError.style.display = isValid ? 'none' : 'inline'
    confirmPasswordInput.setCustomValidity(
      isValid ? '' : 'As passwords não são iguais'
    )
  }

  passwordInput.addEventListener('input', validatePassword)
  confirmPasswordInput.addEventListener('input', validatePassword)
})

//Restrições na senha – mínimo 8 caracteres, e tem de conter uma letra maiúscula, uma letra minúscula, um algarismos e um símbolo.

function validatePasswordConstraints(password) {
  var passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

//função para validar o formato do email
function validateEmail(email) {
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

//função para validar o formato do código postal
function validatePostalCode(postalCode) {
  var postalCodeRegex = /^\d{4}-\d{3}$/
  return postalCodeRegex.test(postalCode)
}

//redirecionar para a pagina de login
document.querySelector('#icone-back').addEventListener('click', function () {
  window.location.href = 'index.html'
})
