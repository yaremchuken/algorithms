import { CHANGING_COLOR, DEFAULT_COLOR, MODIFIED_COLOR } from '../utils/constant';

describe('E2E - тестирование разворота строки', function () {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="recursion"]').click();
  });

  beforeEach(() => {
    cy.get('input').clear();
  });

  it('Если в инпуте пусто, то кнопка "Развернуть" недоступна', () => {
    cy.contains('Развернуть').should('be.disabled');
  });

  it('Корректность разворота строки', () => {
    const initial = 'line';
    const expected = 'enil';

    cy.clock();

    cy.get('input').type('line');

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);
        for (let i = 0; i < 4; i++) {
          expect($els.eq(i)).to.contain(initial[i]);
          cy.get($els.eq(i).children()[1]).should('have.css', 'border-color', DEFAULT_COLOR);
        }
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
        cy.get($els.eq(0).children()[1]).should('have.css', 'border-color', MODIFIED_COLOR);
        cy.get($els.eq(1).children()[1]).should('have.css', 'border-color', CHANGING_COLOR);
        cy.get($els.eq(2).children()[1]).should('have.css', 'border-color', CHANGING_COLOR);
        cy.get($els.eq(3).children()[1]).should('have.css', 'border-color', MODIFIED_COLOR);
      });

    cy.tick(1000);

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);
        for (let i = 0; i < 4; i++) {
          expect($els.eq(i)).to.contain(expected[i]);
          cy.get($els.eq(i).children()[1]).should('have.css', 'border-color', MODIFIED_COLOR);
        }
      });
  });
});
