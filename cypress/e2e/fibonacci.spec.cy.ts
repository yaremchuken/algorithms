describe('E2E - тестирование Фибоначчи', function () {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="fibonacci"]').click();
  });

  beforeEach(() => {
    cy.get('input').clear();
  });

  it('Если в инпуте пусто, то кнопка "Рассчитать" недоступна', () => {
    cy.contains('Рассчитать').should('be.disabled');
  });

  it('Корректность генерирования чисел', () => {
    const expectedValues = ['0', '1', '1', '2', '3', '5'];
    const expectedIndexes = ['0', '1', '2', '3', '4', '5'];

    cy.get('input').type('5');
    cy.contains('Рассчитать').click();

    const circles = cy.get('[cy-key="result-holder"]').children();

    circles.should('have.length', 6);
    circles.within(($els) => {
      for (let i = 0; i < expectedValues.length; i++) {
        expect($els.eq(i)).to.contain(expectedValues[i]).to.contain(expectedIndexes[i]);
      }
    });
  });
});
