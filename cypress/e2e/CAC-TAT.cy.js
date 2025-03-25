describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('src/index.html')
  })

  it('verifica o titulo da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatorios e envia o formulario', () => {
    const longText = Cypress._.repeat('abcdefeghijhijlmnopqrstuvwxz', 10)
    //variavel para digitar um texto longo no campo de texto

    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('walmyr@talkingabouttesting.com')
    // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()
    cy.get('#open-text-area').type(longText, { delay: 0 })

    // cy.get('.success').should('be.visible')
  })


  it('exibe mensagem de erro ao submeter o formulario com um email com formatação invalida', () => {

    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('walmyr@talkingabouttesting,com')
    cy.get('#open-text-area').type('Testes')
    // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

  })

  it('campo telefone continua vazio quando preenchido com um valor não-numerico', () => {
    cy.get('#phone')
      .type('abcedfg')
      .should('have.value', '')
  }
  )

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('walmyr@talkingabouttesting,com')
    cy.get('#open-text-area').type('Testes')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Walmyr')
      .should('have.value', 'Walmyr')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Filho')
      .should('have.value', 'Filho')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('walmyr@talkingabouttesting.com')
      .should('have.value', 'walmyr@talkingabouttesting.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  // it('envia o formuário com sucesso usando um comando customizado', () => {
  // const data = {
  //   firstName: 'Walmyr',
  //   lastName: 'Filho',
  //   email: 'walmyr@talkingabouttesting.com',
  //   text: 'Teste.'
  // }

  //  cy.fillMandatoryFieldsAndSubmit(data)

  // cy.fillMandatoryFieldsAndSubmit()
  // })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })


  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {

    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')

  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Walmyr')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('walmyr@talkingabouttesting,com')
    cy.get('#open-text-area').type('Testes')
    cy.get('#phone-checkbox').check()

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')

  })


  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should((input) => {
        // console.log(input[0].files[0].name)
        expect(input[0].files[0].name).to.eq('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should((input) => {
        expect(input[0].files[0].name).to.eq('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('h1', 'Política de Privacidade')
      .should('be.visible')
  })

// it('')

})

