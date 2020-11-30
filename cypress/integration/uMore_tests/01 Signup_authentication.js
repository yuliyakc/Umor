const secretData = require("../../fixtures/secret.json");

describe('Cypress Tests', () => {
    beforeEach(() => {
        cy.viewport(360, 640)
    })

    it('Signup', () => {
        cy.fixture('secret')
            .then(data => {
                //cy.viewport(360, 640)
                cy.log(secretData)
                cy.log('Go to Signup page')
                cy.visit(secretData.umore_url_signup)
                cy.get('input[name="email"]').type(secretData.wrong_signup_login)
                cy.get('input[name="password"]').type(secretData.wrong_signup_password)
                cy.contains("email needs to be correct format")
                //cy.get('.continue-btn').click()
            })
    })    //END Signup
});
