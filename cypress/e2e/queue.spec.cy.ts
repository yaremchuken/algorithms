import { CHANGING_COLOR, DEFAULT_COLOR } from '../utils/constant';

describe('E2E - тестирование Очереди', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="queue"]').click();
    cy.get('input').clear();
  });

  it('Если в инпуте пусто, то кнопка "Добавить" недоступна', () => {
    cy.contains('Добавить').should('be.disabled');
  });

  it('Добавление значений в очередь', () => {
    cy.clock();

    cy.get('input').type('10');
    cy.contains('Добавить').click();

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els.eq(0)).to.contain('10');
        expect($els.eq(0)).to.contain('head');
        expect($els.eq(0)).to.contain('tail');
      });

    cy.tick(300);

    cy.get('input').clear().type('5');
    cy.contains('Добавить').click();

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els.eq(0)).to.contain('10');
        expect($els.eq(0)).to.contain('head');
        expect($els.eq(1)).to.contain('5');
        expect($els.eq(1)).to.contain('tail');

        cy.get($els.eq(0).children()[1]).should('have.css', 'border-color', DEFAULT_COLOR);
        cy.get($els.eq(1).children()[1]).should('have.css', 'border-color', CHANGING_COLOR);
      });

    cy.tick(300);

    cy.get('input').clear().type('15');
    cy.contains('Добавить').click();

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els.eq(0)).to.contain('10');
        expect($els.eq(0)).to.contain('head');
        expect($els.eq(1)).to.contain('5');
        expect($els.eq(2)).to.contain('15');
        expect($els.eq(2)).to.contain('tail');

        cy.get($els.eq(0).children()[1]).should('have.css', 'border-color', DEFAULT_COLOR);
        cy.get($els.eq(1).children()[1]).should('have.css', 'border-color', DEFAULT_COLOR);
        cy.get($els.eq(2).children()[1]).should('have.css', 'border-color', CHANGING_COLOR);
      });
  });

  it('Удаление значений из очереди', () => {
    cy.clock();

    cy.get('input').type('10');
    cy.contains('Добавить').click();
    cy.tick(300);
    cy.get('input').clear().type('13');
    cy.contains('Добавить').click();
    cy.tick(300);
    cy.get('input').clear().type('27');
    cy.contains('Добавить').click();

    cy.tick(300);

    cy.contains('Удалить').click();

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els.eq(0)).not.to.contain('10');
        expect($els.eq(1)).to.contain('13');
        expect($els.eq(1)).to.contain('head');
        expect($els.eq(2)).to.contain('27');
        expect($els.eq(2)).to.contain('tail');

        cy.get($els.eq(0).children()[1]).should('have.css', 'border-color', CHANGING_COLOR);
      });

    cy.tick(300);

    cy.contains('Удалить').click();

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els.eq(0)).not.to.contain('10');
        expect($els.eq(1)).not.to.contain('13');
        expect($els.eq(2)).to.contain('27');
        expect($els.eq(2)).to.contain('head');
        expect($els.eq(2)).to.contain('tail');

        cy.get($els.eq(0).children()[1]).should('have.css', 'border-color', DEFAULT_COLOR);
        cy.get($els.eq(1).children()[1]).should('have.css', 'border-color', CHANGING_COLOR);
      });

    cy.tick(300);

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        cy.get($els.eq(1).children()[1]).should('have.css', 'border-color', DEFAULT_COLOR);
      });
  });

  it('Очистка очереди', () => {
    cy.clock();

    cy.get('input').type('10');
    cy.contains('Добавить').click();
    cy.tick(300);
    cy.get('input').clear().type('13');
    cy.contains('Добавить').click();
    cy.tick(300);
    cy.get('input').clear().type('27');
    cy.contains('Добавить').click();

    cy.tick(300);

    cy.contains('Очистить').click();

    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els.eq(0)).not.to.contain('10');
        expect($els.eq(1)).not.to.contain('13');
        expect($els.eq(2)).not.to.contain('27');
      });
  });
});
