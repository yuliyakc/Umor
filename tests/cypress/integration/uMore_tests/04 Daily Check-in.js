import {login} from "../../support/commands" 

describe('Cypress Tests', () => {
    beforeEach(() => {
        cy.viewport(360, 640)
    })

    it('Positive test - Mood check for Okay', () => {
        login(cy)
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
    })
    it('Negative test- Mood check for Anxious', () => {
        login(cy) 
        cy.contains('Mood Check-in')
        cy.get('a[data-rb-event-key=1]').click()
        cy.wait(1000)
        cy.get('.round-nav-btn').click()
        cy.contains('Current mood')
        cy.get('button[value=Frustrated]').click()
        cy.wait(1000)
        cy.get('.apply-btn').click()
        cy.get('.MuiButtonBase-root').eq(2).click()
        cy.get('g[id="Anxious"]').should('not.exist')
       }) 
});   
