describe('Landing Page Tests', function() {
    it('Should match image snapshot', function() {
        cy.visit('https://dev-w1.umore.app/landing');
        cy.get('.image-wrapper').eq(0).matchImageSnapshot('imageLanding1');
    });
});