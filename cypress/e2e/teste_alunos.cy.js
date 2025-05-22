describe("cadastro de alunos", () => {

  //testes positivos
  it('cadastro completo com sucesso', () => {
    let fazerLogin = login()
    let infos = createUser()
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + "@gmail.com")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infos[2])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Usuário criado com sucesso!')
  })

  it('cadastro com hífen no nome', () => {
    let fazerLogin = login()
    let infos = createUser()
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user-" + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + "@gmail.com")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infos[2])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Usuário criado com sucesso!')
  })

  it('cadastro com senha complexa e grande', () => {
    let fazerLogin = login()
    let infos = createUser()
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + "@gmail.com")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type("@" + infos[2] + "_S3nh@C0mpl3xa!!2025")
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Usuário criado com sucesso!')
  })

  //---------------------------------------------------------------------------------------------------------

  //testes negativos
  it('cadastro com email já cadastrado', () => {
    let fazerLogin = login()
    let infos = createUser()

  // primeiro cadastro (deve passar)
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + "@gmail.com")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infos[2])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Usuário criado com sucesso!')

    // segundo cadastro com o MESMO email (deve falhar)
    cy.reload() //recarega a página
    let infosReloadPage = createUser()

    cy.get('.sc-dsAqUS').select('Aluno')
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("userReload-" + infosReloadPage[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + "@gmail.com")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infosReloadPage[2] + "Reload")
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Falha ao criar usuário.')
  })

  it('cadastro com email inválido', () => {
    let fazerLogin = login()
    let infos = createUser()
    
    cy.get('.sc-dsAqUS').select('Aluno')
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + ".gmail.com")
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').type(infos[2])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Por favor, insira um endereço de email válido.')
  })

  it('cadastro com pelo menos um campo vazio', () => {
    let fazerLogin = login()
    let infos = createUser()
    
    cy.get('.sc-dsAqUS').select('Aluno')
    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[0])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').type("user" + infos[1]  + ".gmail.com")
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body').should('not.exist') //aqui não aconteceu nada
  })
})

function login() 
{
  cy.visit('https://confianopai.com/adm/projetos')
  cy.get(':nth-child(2) > .sc-ktwOfi').type("gustavos@")
  cy.get(':nth-child(3) > .sc-ktwOfi').type("123")
  cy.get('.sc-csKJxZ').click()
  cy.get('[href="/adm/novo-usuario"]').click()
  cy.get('.sc-dsAqUS').select('Aluno')
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