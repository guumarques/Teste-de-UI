describe("Teste de Orientador", () => {
  it('Cadastro normal com sucesso', () => {
    login()
    let infos = createUser()
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + "@gmail.com")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infos[2])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Usuário criado com sucesso!')
  })

  it('Cadastro com nome composto', () => {
    login()
    let infos = createUser()
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[0] + " " + infos[0] + " " + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + "@gmail.com")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infos[2])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Usuário criado com sucesso!')
  })

  it('Cadastro com e-mail institucional', () => {
    login()
    let infos = createUser()
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + "@orientador.inatel.br")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infos[2])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Usuário criado com sucesso!')
  })

  it('Cadastro com nome e e-mail com hífen', () => {
    login()
    let infos = createUser()
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("usuário" + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("usuário" + infos[1]  + "@orientador.inatel.br")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infos[2])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Usuário criado com sucesso!')
  })

  it('Cadastro com e-mail já cadastrado', () => {
    login()
    let infos = createUser()
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + "@gmail.com")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infos[2])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()

    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').clear()
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').clear()
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').clear()
    
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + "@gmail.com")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infos[2])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('#\\32  > .Toastify__toast-body > :nth-child(2)').should('contain.text', 'Falha ao criar usuário.')
  })

  it('Cadastro com e-mail em formato inválido', () => {
    login()
    let infos = createUser()

    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + "gmail.com")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infos[2])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Por favor, insira um endereço de email válido.')
  })

})


function login() 
{
  cy.visit('https://confianopai.com/adm/projetos')
  cy.get(':nth-child(2) > .sc-ktwOfi').type("gustavos@")
  cy.get(':nth-child(3) > .sc-ktwOfi').type("123")
  cy.get('.sc-csKJxZ').click()
  cy.get('[href="/adm/novo-usuario"]').click()
  cy.get('.sc-dsAqUS').select('Orientador')
}

function createUser()
{
  let hora = new Date().getHours().toString()
  let minuto = new Date().getMinutes().toString()
  let segundos = new Date().getSeconds().toString()
  let nome = hora + minuto + segundos
  let email = hora + minuto + segundos
  let senha = hora + minuto + segundos
  let infos = [nome, email, senha]

  return infos
}