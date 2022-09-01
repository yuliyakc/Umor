/*
export function getRandomNum(max_value) {
    let res = Math.floor(Math.random() * Math.floor(max_value));
    return res === 0? 1 : res;
  }
*/
const PI = 3.14
function getRandomNum(max_value) {
  let res = Math.floor(Math.random() * Math.floor(max_value));
  return (res === 0) ? 1 : res;
}

export {
  getRandomNum,
  PI
}
const secretData = require("./secret.json");
function login(cy) {
  //cy.viewport(360, 640)
  //cy.log(secretData)
  cy.log('Go to Main page')
  cy.visit(secretData.umore_url)
  cy.get('input[name="email"]').type(secretData.umor_login)
  cy.get('input[name="password"]').type(secretData.umor_pass)
  cy.get('.continue-btn').click()
}    //END LOGIN

export {
  login
}

