describe('E2E - тестирование Стэка', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="stack"]').click();
    cy.get('input').clear();
  });

  it('Если в инпуте пусто, то кнопка "Добавить" недоступна', () => {
    cy.contains('Добавить').should('be.disabled');
  });

  it('Добавление значений в стек', () => {
    cy.get('input').type('10');
    cy.contains('Добавить').click();

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(1);
        expect($els.eq(0)).to.contain('10');
        expect($els.eq(0)).to.contain('top');
      });

    cy.get('input').clear().type('23');
    cy.contains('Добавить').click();

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(2);
        expect($els.eq(0)).to.contain('10');
        expect($els.eq(1)).to.contain('23');
        expect($els.eq(1)).to.contain('top');
      });

    cy.get('input').clear().type('17');
    cy.contains('Добавить').click();

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(3);
        expect($els.eq(0)).to.contain('10');
        expect($els.eq(1)).to.contain('23');
        expect($els.eq(2)).to.contain('17');
        expect($els.eq(2)).to.contain('top');
      });
  });

  it('Удаление значений из стека', () => {
    cy.get('input').type('10');
    cy.contains('Добавить').click();
    cy.get('input').clear().type('23');
    cy.contains('Добавить').click();
    cy.get('input').clear().type('17');
    cy.contains('Добавить').click();

    cy.contains('Удалить').click();

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(2);
        expect($els.eq(0)).to.contain('10');
        expect($els.eq(1)).to.contain('23');
        expect($els.eq(1)).to.contain('top');
      });

    cy.contains('Удалить').click();

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(1);
        expect($els.eq(0)).to.contain('10');
        expect($els.eq(0)).to.contain('top');
      });
  });

  it('Очистка стека', () => {
    cy.get('input').type('10');
    cy.contains('Добавить').click();
    cy.get('input').clear().type('23');
    cy.contains('Добавить').click();
    cy.get('input').clear().type('17');
    cy.contains('Добавить').click();

    cy.contains('Очистить').click();

    cy.get('[cy-key="result-holder"]').children().should('have.length', 0);
  });
});
