describe('Тестирование работоспособности приложения', () => {
  it('Приложение поднимается', () => {
    cy.visit('http://localhost:3000');
  });
});

describe('Тестирование переходов по страницам', () => {
  it('Есть переход на страницу разворота строки', () => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="recursion"]').click();
    cy.visit('http://localhost:3000/recursion');
  });

  it('Есть переход на страницу Фибоначи', () => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="fibonacci"]').click();
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('Есть переход на страницу сортировки', () => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="sorting"]').click();
    cy.visit('http://localhost:3000/sorting');
  });

  it('Есть переход на страницу стэка', () => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="stack"]').click();
    cy.visit('http://localhost:3000/stack');
  });

  it('Есть переход на страницу очереди', () => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="queue"]').click();
    cy.visit('http://localhost:3000/queue');
  });

  it('Есть переход на страницу списка', () => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="list"]').click();
    cy.visit('http://localhost:3000/list');
  });
});
