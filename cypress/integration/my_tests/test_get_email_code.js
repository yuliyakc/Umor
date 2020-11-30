
it('Get Code From Gmail', () => {
    //email.getData();
    cy.request('http://localhost:3000/get_code_from_gmail')
        .then((response) => {
            console.log(response.body);
            cy.log("Code: " + response.body.code);
        })

});
