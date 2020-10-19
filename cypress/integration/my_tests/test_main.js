const secretData = require ("../../fixtures/secret.json");
describe('Cypress Tests', () => {
    it('Searching', () => {
        cy.fixture('secret') 
        .then(data =>{            
            cy.viewport(360, 640)
            cy.log(secretData)
            cy.log('Go to Main page')
            cy.visit(secretData.umore_url)
            cy.get('input[name="email"]').type(secretData.umor_login)
            cy.get('input[name="password"]').type(secretData.umor_pass)
            cy.get('.continue-btn').click()
            //END LOGIN
            cy.contains('Mood Check-in')
            cy.get('a[data-rb-event-key=4]').click()
            cy.wait(1000)
            cy.get('.round-nav-btn').click()
            cy.contains('Current mood')
            cy.get('button[value=Excited]').click()
            cy.wait(1000)
            cy.get('.apply-btn').click()
            //END MOOD
            cy.get('.menu').click()
            //cy.get('.nav-item:nth-child(5) a').click()
            cy.get('a[href="/stress-index"]').click()
            ////////steps for stress index
            cy.get('.btn').eq(5).click()
            cy.get('.round-nav-btn').click()
            cy.get('.btn').eq(1).click()
            cy.get('.round-nav-btn').eq(0).click()
            cy.get('.btn').eq(1).click()
            cy.get('.round-nav-btn').eq(0).click()
            cy.get('.btn').eq(1).click()
            cy.get('.round-nav-btn').eq(0).click()
            cy.get('.btn').eq(1).click()
            cy.get('.round-nav-btn').eq(0).click()
            cy.get('.btn').eq(1).click()
            cy.get('.round-nav-btn').eq(0).click()
            cy.get('.btn').eq(1).click()
            cy.get('.round-nav-btn').eq(0).click()
            cy.get('.btn').eq(1).click()
            cy.get('.round-nav-btn').eq(0).click()
            cy.get('.btn').eq(1).click()
            cy.get('.round-nav-btn').eq(0).click()
            cy.get('.btn').eq(1).click()
            cy.get('.round-nav-btn').eq(0).click()
            cy.wait(5000)
            //END STRESS TEST
            cy.get('.buttons-wrapper').click()
            
        });
    });
})