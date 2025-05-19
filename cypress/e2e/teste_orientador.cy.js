describe("Teste de Orientador", () => {
  it('cadastro normal com sucesso', () => {
    let fazerLogin = login()
    let infos = createUser()
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + "@gmail.com")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infos[2])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Usuário criado com sucesso!')
  })

  it('Cadastro com nome composto', () => {
    let fazerLogin = login()
    let infos = createUser()
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[0] + " " + infos[0] + " " + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + "@gmail.com")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infos[2])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Usuário criado com sucesso!')
  })

  it.skip('Cadastro com campos preenchidos no limite máximo permitido', () => {

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