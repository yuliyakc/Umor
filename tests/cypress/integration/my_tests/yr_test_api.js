it('cy.request() - make an XHR request', () => {
    cy.request('https://rozetka.com.ua/')
        .then((response) => {
            console.log(response);
            // https://on.cypress.io/assertions
            expect(response).property('status').to.equal(200);
            expect(response).property('body').to.have.property('length').and.be.greaterThan(0);
            expect(response).to.include.keys('headers', 'duration')
        })
});

it('cy.request() - verify POST request', () => {
    cy.request('POST', 'https://rozetka.com.ua/', {
        userId: '1257ojh',
        title: 'Cypress Test Runner',
        body: 'Fast, easy and reliable testing for anything that runs in a browser.',
    })
        .then((response) => {
            console.log(response);
            // https://on.cypress.io/assertions
            expect(response).property('status').to.equal(200)
        })
});