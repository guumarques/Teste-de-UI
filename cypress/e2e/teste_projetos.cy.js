const User = {
    NOME: 0,
    EMAIL: 1,
    SENHA: 2
}

describe("Teste de projetos", () => {
    // teste negativo
    it('Criação de projeto vazio', () => {
        login()
        cy.get('[href="/adm/projetos"]').click()
        cy.get('.sc-jdHILj > svg').click()
        cy.get('[href="/adm/add-projeto/cadastro"]').click()
        cy.get('.sc-eGgGjL > :nth-child(1)').click() // botão de criar equipe
        cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Por favor, adicione o nome do projeto')
    })

    // testes positivos
    it('Criação de projeto', () => {
        login()
        let users = gerarListaDeUsers(4)
        let nomeProjeto = gerarNomeProjeto()
        let orientador = gerarUser()
        criarUser(orientador, true)

        criarProjeto(users, nomeProjeto, orientador)
    })

    it('Busca de projeto', () => {
        login()
        let users = gerarListaDeUsers(4)
        let nomeProjeto = gerarNomeProjeto()
        let orientador = gerarUser()
        criarUser(orientador, true)

        criarProjeto(users, nomeProjeto, orientador)
        acessarProjetoExistente(nomeProjeto)
    })

    it('Modificar nome do projeto', () => {
        login()
        let users = gerarListaDeUsers(4)
        let nomeProjeto = gerarNomeProjeto()
        let orientador = gerarUser()
        criarUser(orientador, true)

        criarProjeto(users, nomeProjeto, orientador)
        acessarProjetoExistente(nomeProjeto)
        modificarNomeProjeto(nomeProjeto)
    })


    it('Deletar projeto', () => {
        login()
        let users = gerarListaDeUsers(4)
        let nomeProjeto = gerarNomeProjeto()
        let orientador = gerarUser()
        criarUser(orientador, true)

        criarProjeto(users, nomeProjeto, orientador)
        acessarProjetoExistente(nomeProjeto)

        cy.get('.sc-iCKXBC > [viewBox="0 0 448 512"]').click() // deletar
        cy.get('.sc-cZpZpK > :nth-child(1)').click()

        cy.get('[href="/adm/projetos"]').click()
        cy.get('.sc-ckdEwu').type(nomeProjeto)
        cy.get('.sc-gjLLEI').should('not.exist')
    })

    it('Deletar membros do projeto', () => {
        login()
        let users = gerarListaDeUsers(4)
        let nomeProjeto = gerarNomeProjeto()
        let orientador = gerarUser()
        criarUser(orientador, true)

        criarProjeto(users, nomeProjeto, orientador)
        acessarProjetoExistente(nomeProjeto)

        // index de membro a partir de 0
        const BotaoDeletarMembro = (n) => ':nth-child(' + n + 2 + ') > .sc-jiaSqj > .sc-hVcFVo'

        for (let i = 0; i < 5; i++) {
            cy.get(BotaoDeletarMembro(0)).click()
            cy.get('.sc-bbxCgr > :nth-child(1)').click()
        }
        cy.get('.sc-cPtzlb > .sc-irLvIq > .sc-csKJxZ').should('exist')
    })

})

function modificarNomeProjeto(nome) {
    cy.get('.sc-iCKXBC > [viewBox="0 0 576 512"]').click() // editar
    cy.get('.sc-iVheDh').clear().type(nome + 'modified')
    cy.get('.sc-iCKXBC > [viewBox="0 0 448 512"]').click() // salvar nome
    cy.get('.iTLMzn > .sc-csKJxZ').click() // salvar Projeto
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Projeto atualizado com sucesso!')
}

function acessarProjetoExistente(nome) {
    cy.get('[href="/adm/projetos"]').click()
    cy.get('.sc-ckdEwu').type(nome)
    cy.get('.sc-gjLLEI').should('contain.text', nome)
    cy.get('.sc-gjLLEI').click()
}

function criarProjeto(users, nome, orientador) {
    cy.get('[href="/adm/projetos"]').click()
    cy.get('.sc-jdHILj > svg').click()
    cy.get('[href="/adm/add-projeto/cadastro"]').click()
    cy.get('.sc-fYrVWQ > .sc-hsaIUA').type(nome)
    cy.get(':nth-child(2) > :nth-child(2) > .sc-hsaIUA').type(users[0][User.EMAIL])
    cy.get(':nth-child(3) > :nth-child(2) > .sc-hsaIUA').type(users[1][User.EMAIL])
    cy.get(':nth-child(4) > :nth-child(2) > .sc-hsaIUA').type(users[2][User.EMAIL])
    cy.get(':nth-child(5) > :nth-child(2) > .sc-hsaIUA').type(users[3][User.EMAIL])
    cy.get(':nth-child(6) > :nth-child(2) > .sc-hsaIUA').type(orientador[User.EMAIL])
    cy.get(':nth-child(1) > .sc-bZTyFN > .sc-hlqirL').select('Sem pendências')
    cy.get(':nth-child(2) > .sc-bZTyFN > .sc-hlqirL').select('Outro')
    cy.get('.sc-eGgGjL > :nth-child(1)').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Equipe criada com sucesso!')
}

function login() {
    cy.visit('https://confianopai.com/adm/projetos')
    cy.get(':nth-child(2) > .sc-ktwOfi').type("gustavos@")
    cy.get(':nth-child(3) > .sc-ktwOfi').type("123")
    cy.get('.sc-csKJxZ').click()
    cy.get('[href="/adm/novo-usuario"]').click()
}

function gerarUser() {
    let hora = new Date().getHours().toString()
    let min = new Date().getMinutes().toString()
    let mil = new Date().getMilliseconds().toString()

    let nome = 'userprojeto' + hora + min + mil
    let email = 'userprojeto' + hora + min + mil + '@gmail.com'
    let senha = 'userprojeto' + mil + min + hora

    return [nome, email, senha]
}

function gerarNomeProjeto() {
    let hora = new Date().getHours().toString()
    let min = new Date().getMinutes().toString()
    let mil = new Date().getMilliseconds().toString()

    return 'projeto_' + hora + min + mil
}


function criarUser(user, orientador = false) {
    if (orientador)
        cy.get('.sc-dsAqUS').select('Orientador')
    else
        cy.get('.sc-dsAqUS').select('Aluno')

    cy.get(':nth-child(1) > .sc-bqOYya > .sc-gHjVMF').clear().type(user[User.NOME])
    cy.get(':nth-child(2) > .sc-bqOYya > .sc-gHjVMF').clear().type(user[User.EMAIL])
    cy.get(':nth-child(3) > .sc-bqOYya > .sc-gHjVMF').clear().type(user[User.SENHA])
    cy.get(':nth-child(4) > .sc-irLvIq > .sc-csKJxZ').click()
    cy.get('.Toastify__toast-body > :nth-child(2)').should('contain.text', 'Usuário criado com sucesso!')
}

function gerarListaDeUsers(quantidade) {
    let users = []
    for (let i = 0; i < quantidade; i++) {
        users[i] = gerarUser()
        criarUser(users[i])
    }

    return users
}