// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:

// https://on.cypress.io/writing-first-test
/// <reference types="Cypress" />

    describe('Central de Atendimento ao Cliente TAT', function(){
        beforeEach(function(){
            cy.visit('./src/index.html')
        })
        it('verifica o título da aplicação', function() {
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
              
})
        
        it('Preenche os campos obrigatorios e envia o formulário', function(){
            const textLong = 'Teste, teste, teste, teste, teste, teste, teste, teste.'
            cy.get('#firstName').type('Luciano')
            cy.get('#lastName').type('Saito')
            cy.get('#email').type('teste@teste.com.br')
            cy.get('#open-text-area').type(textLong, {delay: 10} )
            cy.contains('button', 'Enviar').click()
            cy.get('.success').should('be.visible')
    })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
            cy.get('#firstName').type('Luciano')
            cy.get('#lastName').type('Saito')
            cy.get('#email').type('teste,teste.com.br')
            cy.get('#open-text-area').type('teste')
            cy.contains('button', 'Enviar').click()
            cy.get('.error').should('be.visible')
        })
      it('campo telefone continua vazio quando preenchido com valor não numerico', function(){
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value', '')
      })
      it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Luciano')
        cy.get('#lastName').type('Saito')
        cy.get('#email').type('lcn.saito@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste Telefone')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
      })
      it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
          .type('Luciano') /**O valor que será incluido*/ 
          .should('have.value', 'Luciano') /**Verifica se o valor digitado no type está igual*/
          .clear() /**Limpa o campo*/
          .should('have.value','') /**Verifica se o valor do campo está em Branco*/
        cy.get('#lastName').type('Saito').should('have.value','Saito').clear().should('have.value','')
        cy.get('#email').type('lcn.saito@gmail.com').should('have.value','lcn.saito@gmail.com').clear().should('have.value','')
        cy.get('#phone').type('952432895').should('have.value', '952432895').clear().should('have.value','')
      })
      it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
      })
      it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
      })
      it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
      })
      it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
      })
      it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value', 'blog')
      })
      it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
      })
      it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
      })
      it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
      })
      it('mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Luciano')
        cy.get('#lastName').type('Saito')
        cy.get('#email').type('lcn.saito@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste Telefone')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
      })
      it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]') //colocando o #file-upload, que é o nome do campo apos o ] pode ser usado tambem
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json')
          .should(function($input){ //verifica se o nome do arquivo é persistido ao ser selecionado pelo console de inspecionar
            expect($input[0].files[0].name).to.equal('example.json')
                   
          })
      })
      it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
          .should('not.have.value')
          .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
          .should(function($input){ 
            expect($input[0].files[0].name).to.equal('example.json')
          })
      })
      it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFIle')
        cy.get('input[type="file"]')
          .selectFile('@sampleFIle')
          .should(function($input){ 
            expect($input[0].files[0].name).to.equal('example.json')
          })
      })
      it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
      })
      it.only('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
      })
    })
  