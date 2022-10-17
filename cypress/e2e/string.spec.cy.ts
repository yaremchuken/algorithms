describe('E2E - тестирование разворота строки', function () {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="recursion"]').click();
  });

  it('Если в инпуте пусто, то кнопка "Развернуть" недоступна', () => {
    cy.contains('Развернуть').should('be.disabled');
  });

  it('Корректность разворота строки', () => {
    cy.clock();

    cy.get('input').type('line');

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);
        expect($els.eq(0)).to.contain('l');
        expect($els.eq(1)).to.contain('i');
        expect($els.eq(2)).to.contain('n');
        expect($els.eq(3)).to.contain('e');
        cy.get($els.eq(0).children()[1]).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.get($els.eq(1).children()[1]).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.get($els.eq(2).children()[1]).should('have.css', 'border-color', 'rgb(0, 50, 255)');
        cy.get($els.eq(3).children()[1]).should('have.css', 'border-color', 'rgb(0, 50, 255)');
      });

    cy.contains('Развернуть').click();

    cy.tick(1000);

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);
        expect($els.eq(0)).to.contain('e');
        expect($els.eq(1)).to.contain('i');
        expect($els.eq(2)).to.contain('n');
        expect($els.eq(3)).to.contain('l');
        cy.get($els.eq(0).children()[1]).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.get($els.eq(1).children()[1]).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.get($els.eq(2).children()[1]).should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.get($els.eq(3).children()[1]).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      });

    cy.tick(1000);

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);
        expect($els.eq(0)).to.contain('e');
        expect($els.eq(1)).to.contain('n');
        expect($els.eq(2)).to.contain('i');
        expect($els.eq(3)).to.contain('l');
        cy.get($els.eq(0).children()[1]).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.get($els.eq(1).children()[1]).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.get($els.eq(2).children()[1]).should('have.css', 'border-color', 'rgb(127, 224, 81)');
        cy.get($els.eq(3).children()[1]).should('have.css', 'border-color', 'rgb(127, 224, 81)');
      });
  });
});
