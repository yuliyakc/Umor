describe('Cypress Tests', () => {
    it('Searching', () => {
        cy.fixture('cypressTest') // выполняется ассинхронное получение данных из файла, 
                                  // результатом выполнения этой строки явл. объект - промис
        .then(data =>{            // на объекте промиса вызывается метод then
            cy.log('Переход на главную страницу')
            cy.visit(data.main_url)
            cy.get('input[name="search"]').type(data.search)
            cy.get('.search-form__submit').click()
        });
    });

    it('Registration', () => {
        cy.log('Начинаем регистрацию')
        cy.viewport(1920, 1080)
    });
});     