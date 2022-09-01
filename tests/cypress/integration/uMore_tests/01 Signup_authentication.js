const secretData = require("../../fixtures/secret.json");

describe('Cypress Tests', () => {
    beforeEach(() => {
        cy.viewport(360, 640)
    })

    it('Signup_wrong_credentials', () => {
        cy.fixture('secret')
            .then(data => {
                //cy.viewport(360, 640)
                cy.log(secretData)
                cy.log('Go to SignUp page')
                cy.visit(secretData.umore_url_signup)
                cy.get('input[name="email"]').type(secretData.wrong_signup_login)
                cy.get('input[name="password"]').type(secretData.wrong_signup_password)
                cy.contains("email needs to be correct format")
                //cy.get('.continue-btn').click()
            })
    })    //END Signup wrong credentials

    it('Signup', () => {
        cy.fixture('secret')
            .then(data => {
                //cy.viewport(360, 640)
                cy.log(secretData)
                cy.log('Go to Signup page')
                cy.visit(secretData.umore_url_signup)
                cy.get('input[name="firstName"]').type(secretData.FirstName)
                cy.get('input[name="lastName"]').type(secretData.LastName)
                cy.get('input[name="email"]').type(secretData.signup_login)
                cy.get('input[name="password"]').type(secretData.signup_password)
                cy.get('.continue-btn').click()
                cy.request('http://localhost:3000/get_code_from_gmail')
                    .then((response) => {
                    console.log(response.body);
                    cy.log("Code: " + response.body.code);
                    let code = response.body.code;
                    cy.log(code);
                    cy.wait(1000);
                   // cy.get('.styles_react-code-input__CRulA').click();
                    cy.get('input[data-id="0"]').click();
                    cy.get('input[data-id="0"]').type(code);
                })
                
            })
    })    //END Signup
});
