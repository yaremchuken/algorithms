describe('E2E - тестирование Фибоначчи', function () {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="fibonacci"]').click();
  });

  it('Если в инпуте пусто, то кнопка "Рассчитать" недоступна', () => {
    cy.contains('Рассчитать').should('be.disabled');
  });

  it('Корректность генерирования чисел', () => {
    cy.clock();

    cy.get('input').type('5');
    cy.contains('Рассчитать').click();

    cy.tick(500);

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(1);
        expect($els.eq(0)).to.contain('0');
      });

    cy.tick(500);

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(2);
        expect($els.eq(0)).to.contain('0');
        expect($els.eq(1)).to.contain('1');
      });

    cy.tick(500);

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(3);
        expect($els.eq(0)).to.contain('0');
        expect($els.eq(1)).to.contain('1');
        expect($els.eq(2)).to.contain('1');
      });

    cy.tick(500);

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);
        expect($els.eq(0)).to.contain('0');
        expect($els.eq(1)).to.contain('1');
        expect($els.eq(2)).to.contain('1');
        expect($els.eq(3)).to.contain('2');
      });

    cy.tick(500);

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(5);
        expect($els.eq(0)).to.contain('0');
        expect($els.eq(1)).to.contain('1');
        expect($els.eq(2)).to.contain('1');
        expect($els.eq(3)).to.contain('2');
        expect($els.eq(4)).to.contain('3');
      });

    cy.tick(500);

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(6);
        expect($els.eq(0)).to.contain('0');
        expect($els.eq(1)).to.contain('1');
        expect($els.eq(2)).to.contain('1');
        expect($els.eq(3)).to.contain('2');
        expect($els.eq(4)).to.contain('3');
        expect($els.eq(5)).to.contain('5');
      });

    // Индексы под кружками
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(6);
        expect($els.eq(0)).to.contain('0');
        expect($els.eq(1)).to.contain('1');
        expect($els.eq(2)).to.contain('2');
        expect($els.eq(3)).to.contain('3');
        expect($els.eq(4)).to.contain('4');
        expect($els.eq(5)).to.contain('5');
      });
  });
});
