const secretData = require("../../fixtures/secret.json");
import * as utils from "../../fixtures/utils"

// import {getRandomNum} from "../../fixtures/utils"
// console.log(getRandomNum(9));

const LONG_WAIT = 5000;
const SHORT_WAIT = 2000;

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
        cy.get('.MuiButtonBase-root').eq(0).click()
        //cy.get('.nav-item:nth-child(5) a').click()
        cy.get('a[href="/stress-index"]').click()
        cy.get('.btn').eq(5).click()
        cy.get('.round-nav-btn').click()
        const MAX_VALUE = 5;
        const MAX_QUEST = 9
        for (let i = 0; i < MAX_QUEST; i++) {
            let num = utils.getRandomNum(MAX_VALUE)
            cy.get('.btn').eq(num).click()
            cy.get('.round-nav-btn').eq(0).click()
        }
        cy.wait(5000)
        cy.get('.buttons-wrapper').click() 
        //END STRESS
        cy.get('.MuiButtonBase-root').eq(0).click()
        cy.get('a[href="/safe-circle"]').click()
        cy.get('.btn.btn-light').click()
        cy.get('input[type="email"]').type(secretData.test_user_login)
        cy.contains("Submit").click()
        cy.get('.yes-btn').contains("OK").click()
        cy.contains("Invitation sent")
        cy.get('.back-btn').click()
        cy.contains("Today")
        cy.get('.MuiButtonBase-root').eq(0).click()
        cy.get('a[href="/settings"]').click()
        cy.contains("Logout").click()
        cy.contains("uMore")
    }) // end main test
        
    it('Login for safe circle', () => {
        cy.fixture('secret')
            .then(data => {
                //cy.viewport(360, 640)
                cy.log(secretData)
                cy.log('Go to Main page')
                cy.visit(secretData.umore_url)
                cy.get('input[name="email"]').type(secretData.test_user_login)
                cy.get('input[name="password"]').type(secretData.test_user_pass)
                cy.get('.continue-btn').click()
                cy.get('.skip-btn').click()
                cy.contains("YES").click()
                cy.get('.yes-btn').click()
                cy.wait(SHORT_WAIT) 
            })
    }) // End Login for safe circle
});//End Cypress Tests



