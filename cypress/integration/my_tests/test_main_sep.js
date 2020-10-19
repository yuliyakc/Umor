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
        cy.get('.menu').click()
        //cy.get('.nav-item:nth-child(5) a').click()
        cy.get('a[href="/stress-index"]').click()
        cy.get('.btn').eq(5).click()
        cy.get('.round-nav-btn').click()
        const MAX_VALUE = 5;
        const MAX_QUEST = 9
        for (let i = 0; i < MAX_QUEST; i++) {
            let num = getRandomNum(MAX_VALUE)
            cy.get('.btn').eq(num).click()
            cy.get('.round-nav-btn').eq(0).click()
        }
        cy.wait(5000)
        cy.get('.buttons-wrapper').click()
    })  //END STRESS    
});
function getRandomNum(max_value) {
    let res = Math.floor(Math.random() * Math.floor(max_value));
    return res == 0? 1 : res;
  }


