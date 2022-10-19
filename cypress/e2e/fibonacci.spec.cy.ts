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
    cy.clock();

    cy.get('input').type('5');
    cy.contains('Рассчитать').click();

    cy.tick(3000);

    const circles = cy.get('[cy-key="result-holder"]').children();

    circles.should('have.length', 6);

    circles.within(($els) => {
      expect($els.eq(0)).to.contain('0');
      expect($els.eq(1)).to.contain('1');
      expect($els.eq(2)).to.contain('1');
      expect($els.eq(3)).to.contain('2');
      expect($els.eq(4)).to.contain('3');
      expect($els.eq(5)).to.contain('5');
    });

    // Индексы под кружками
    circles.within(($els) => {
      expect($els.eq(0)).to.contain('0');
      expect($els.eq(1)).to.contain('1');
      expect($els.eq(2)).to.contain('2');
      expect($els.eq(3)).to.contain('3');
      expect($els.eq(4)).to.contain('4');
      expect($els.eq(5)).to.contain('5');
    });
  });
});
