// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
  failureThreshold: 0.03, // threshold for entire image
  failureThresholdType: 'percent', // percent of image or number of pixels
  customDiffConfig: { threshold: 0.1 }, // threshold for each pixel
  capture: 'viewport', // capture viewport in screenshot
});
//////////////////////////////////////
//const PI = 3.14
// function getRandomNum(maxValue) {
//   let res = Math.floor(Math.random() * Math.floor(maxValue));
//   return (res === 0) ? 1 : res;
// }

// export {
//   getRandomNum,
//   PI
// }

// const secretData = require("../fixtures/secret.json");
// function login(cy) {
//   cy.log('Go to Main page')
//   cy.visit(secretData.umoreUrl)
//   cy.get('input[name="email"]').type(secretData.umoreLogin)
//   cy.get('input[name="password"]').type(secretData.umorePass)
//   cy.get('.continue-btn').click()
// }    

// export {
//   login
// }

//////////Login////////////////
Cypress.Commands.add("login", () => {
  cy.fixture('secret').then(({ umoreUrl, umoreLogin, umorePass }) => {
    cy.log('Go to Main page');
    cy.visit(umoreUrl);
    cy.get('input[name="email"]').type(umoreLogin);
    cy.get('input[name="password"]').type(umorePass);
    cy.get('.continue-btn').click();
  }) 
 })

//////////Random for stress index////////////
function getRandomNum(maxValue) {
  let res = Math.floor(Math.random() * Math.floor(maxValue));
  return (res === 0) ? 1 : res;
}
export {
  getRandomNum
}