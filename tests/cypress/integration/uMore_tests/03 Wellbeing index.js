import * as commands from "../../support/commands"

describe('Cypress Tests', () => {
    beforeEach(() => {
        cy.viewport(360, 640)
    })

    it('Wellbeing index random', () => {
        commands.login(cy)
        cy.contains('Mood Check-in')
        cy.get('.skip-btn').click()
        cy.get('.ok-modal-btn').eq(1).click()
        cy.get('.MuiButtonBase-root').eq(0).click()
        cy.get('a[href="/stress-index"]').click()
        cy.wait(1000)
        cy.get('.btn').eq(5).click()
        cy.get('.round-nav-btn').click()
        const maxValue = 5;
        const maxQuest = 9;
        for (let i = 0; i < maxQuest; i++) {
            let num = commands.getRandomNum(maxValue)
            cy.get('.btn').eq(num).click()
            cy.get('.round-nav-btn').eq(0).click()
        }
        cy.wait(5000)
        cy.get('.buttons-wrapper').click()
    })

    it('Wellbeing index high', () => {
        commands.login(cy)
        cy.wait(1000)
        cy.contains('Mood Check-in')
        cy.get('.skip-btn').click()
        cy.get('.ok-modal-btn').eq(1).click()
        cy.get('.MuiButtonBase-root').eq(0).click()
        cy.get('a[href="/stress-index"]').click()
        cy.wait(1000)
        for (let i = 0; i < 3; i++) {
            cy.get('.btn').eq(5).click()
            cy.get('.round-nav-btn').eq(0).click()
        }
        for (let i = 0; i < 2; i++) {
            cy.get('.btn').eq(1).click()
            cy.get('.round-nav-btn').eq(0).click()
        }
        cy.get('.btn').eq(5).click()
        cy.get('.round-nav-btn').eq(0).click()
        for (let i = 0; i < 2; i++) {
            cy.get('.btn').eq(1).click()
            cy.get('.round-nav-btn').eq(0).click()
        }
        for (let i = 0; i < 2; i++) {
            cy.get('.btn').eq(5).click()
            cy.get('.round-nav-btn').eq(0).click()
        }
        cy.wait(5000)
        cy.get('.buttons-wrapper').click()
    })
})     