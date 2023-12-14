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
                cy.visit(secretData.umoreUrlSignup)
                cy.get('input[name="email"]').type(secretData.wrongSignupLogin)
                cy.get('input[name="password"]').type(secretData.wrongSignupPass)
                cy.contains("email needs to be correct format")
                //cy.get('.continue-btn').click()
            })
    })    //END Signup wrong credentials

    it('Signup', () => {
        cy.fixture('secret')
            .then(data => {
                cy.viewport(360, 640)
                cy.log(secretData)
                cy.log('Go to Signup page')
                cy.visit(secretData.umoreUrlSignup)
                cy.get('input[name="firstName"]').type(secretData.FirstName)
                cy.get('input[name="lastName"]').type(secretData.LastName)
                //let newNum = parseInt(secretData.lastEmailNum) + 1;
                //let emailForCode = secretData.signupLogin.replace("@", "+" + newNum + "@")
                //saveNewLastEmailNum(newNum);
                cy.get('input[name="email"]').type(secretData.signupLogin)
                // cy.get('input[name="email"]').type(emailForCode);
                cy.get('input[name="password"]').type(secretData.signupPassword)
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



// function saveNewLastEmailNum(newNum) {
//     const fs = require('fs');
//     secretData.lastEmailNum = newNum
//     fs.writeFile('file.json', secretData, "utf-8", function () {
//         console.log('Error!');
//     });
//
//
// }
