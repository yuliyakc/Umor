const secretData = require("../../fixtures/secret.json");

describe('Cypress Tests', () => {
    beforeEach(() => {
        cy.viewport(360, 640)
    })

    it('Login', () => {
        cy.fixture('secret')
            .then(data => {
                //cy.viewport(360, 640)
                cy.log(secretData)
                cy.log('Go to Main page')
                cy.visit(secretData.umore_url)
                cy.get('input[name="email"]').type(secretData.umor_login)
                cy.get('input[name="password"]').type(secretData.umor_pass)
                cy.get('.continue-btn').click()
            })
    })    //END LOGIN

    it('Mood and stress index', () => {
        //cy.viewport(360, 640)
        cy.contains('Mood Check-in')
        cy.get('a[data-rb-event-key=4]').click()
        cy.wait(1000)
        cy.get('.round-nav-btn').click()
        cy.contains('Current mood')
        cy.get('button[value=Excited]').click()
        cy.wait(1000)
        cy.get('.apply-btn').click()
        cy.get('.MuiButtonBase-root').eq(2).click()
        cy.get('g[id="Okay"]').should('exist')
        cy.get('.selected-day')
    })
});   
