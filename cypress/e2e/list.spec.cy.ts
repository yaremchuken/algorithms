describe('E2E - тестирование Связанного списка', function () {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
    cy.get('a[href*="list"]').click();
  });

  it('Если в инпуте добавления числа пусто, то кнопки "Добавить в head" и "Добавить в tail" недоступны', () => {
    cy.contains('Добавить в head').should('be.disabled');
    cy.contains('Добавить в tail').should('be.disabled');
  });

  it('Если в инпуте добавления числа или индекса пусто, то кнопка "Добавить по индексу" недоступна', () => {
    cy.contains('Добавить по индексу').should('be.disabled');
  });

  it('Если в инпуте индекса пусто, то кнопка "Удалить по индексу" недоступна', () => {
    cy.contains('Удалить по индексу').should('be.disabled');
  });

  it('Отрисовка дефолтного списка', () => {
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);

        expect($els.eq(0)).to.contain('head');
        expect($els.eq(3)).to.contain('tail');

        cy.get($els.eq(0))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)');

        cy.get($els.eq(1))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)');

        cy.get($els.eq(2))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)');

        cy.get($els.eq(3))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)');
      });
  });

  it('Добавления элемента в head', () => {
    cy.get('[id=value-input-field]').type('10');

    cy.clock();

    cy.contains('Добавить в head').click();

    cy.tick(100);

    // Над позицией head появляется кружочек со вставляемым значением
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        cy.get($els.eq(0))
          .get('[class*=list-page_insertion]')
          .should('have.css', 'border-color', 'rgb(41, 41, 41)');

        expect($els.eq(0)).not.to.contain('head');
      });

    cy.tick(400);

    // Новое значение попадает в head с новым цветом кружка
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(5);

        expect($els.eq(0)).to.contain('head');
        expect($els.eq(0)).to.contain('10');

        cy.get($els.eq(0))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(127, 224, 81)');
      });

    cy.tick(500);

    // Кружок становится стандартного цвета
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(5);

        expect($els.eq(0)).to.contain('head');
        expect($els.eq(0)).to.contain('10');

        cy.get($els.eq(0))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)');
      });
  });

  it('Добавления элемента в tail', () => {
    cy.get('[id=value-input-field]').type('10');

    cy.clock();

    cy.contains('Добавить в tail').click();

    cy.tick(100);

    // Над позицией tail появляется кружочек со вставляемым значением
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        cy.get($els.eq(3))
          .get('[class*=list-page_insertion]')
          .should('have.css', 'border-color', 'rgb(41, 41, 41)');
      });

    cy.tick(400);

    // Новое значение попадает в tail
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(5);

        expect($els.eq(4)).to.contain('tail');
        expect($els.eq(4)).to.contain('10');
      });

    cy.tick(500);

    // Кружок становится стандартного цвета
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(5);

        expect($els.eq(4)).to.contain('tail');
        expect($els.eq(4)).to.contain('10');

        cy.get($els.eq(4))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)');
      });
  });

  it('Добавления элемента по индексу', () => {
    const index = 2;

    cy.get('[id=value-input-field]').type('10');
    cy.get('[id=index-input-field]').type(index.toString());

    cy.clock();

    cy.contains('Добавить по индексу').click();

    cy.tick(100);

    // Над позицией с нужным индексом появляется кружочек со вставляемым значением
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        cy.get($els.eq(index))
          .get('[class*=list-page_insertion]')
          .should('have.css', 'border-color', 'rgb(41, 41, 41)');

        cy.get($els.eq(index)).get('[class*=list-page_insertion]').contains('10');
      });

    cy.tick(400);

    // Новое значение попадает в нужный индекс
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(5);
        expect($els.eq(index)).to.contain('10');
      });

    cy.tick(500);

    // Кружок становится стандартного цвета
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(5);
        expect($els.eq(index)).to.contain('10');
        cy.get($els.eq(index))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(0, 50, 255)');
      });
  });

  it('Удаления элемента из head', () => {
    cy.clock();
    cy.contains('Удалить из head').click();

    // Подсвечиваем удаляемое значение и переносим его в нижний кружок
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);

        cy.get($els.eq(0))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)');

        cy.get($els.eq(0))
          .get('[class*=removal]')
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)');
      });

    cy.tick(500);

    // Количество элементов уменьшается на один
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(3);
      });
  });

  it('Удаления элемента из tail', () => {
    cy.clock();
    cy.contains('Удалить из tail').click();

    // Подсвечиваем кружоки начиная с head
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);

        cy.get($els.eq(0))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)');
      });

    cy.tick(500);

    // Подсвечиваем следующие кружочки
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);

        cy.get($els.eq(0))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)');

        cy.get($els.eq(1))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)');
      });

    cy.tick(1000);

    // Подсвечиваем удаляемое значение и переносим его в нижний кружок
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);

        cy.get($els.eq(3))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)');

        cy.get($els.eq(3))
          .get('[class*=removal]')
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)');
      });

    cy.tick(500);

    // Количество элементов уменьшается на один
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(3);
      });
  });

  it('Удаления элемента по индексу', () => {
    cy.clock();

    const index = 2;

    cy.get('[id=index-input-field]').type(index.toString());

    cy.contains('Удалить по индексу').click();

    // Подсвечиваем кружоки начиная с head
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);

        cy.get($els.eq(0))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)');
      });

    cy.tick(500);

    // Подсвечиваем следующие кружочки
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);

        cy.get($els.eq(0))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)');

        cy.get($els.eq(1))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)');
      });

    cy.tick(500);

    // Подсвечиваем удаляемое значение и переносим его в нижний кружок
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(4);

        cy.get($els.eq(index))
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)');

        cy.get($els.eq(index))
          .get('[class*=removal]')
          .get('[class^=circle_circle]')
          .should('have.css', 'border-color', 'rgb(210, 82, 225)');
      });

    cy.tick(500);

    // Количество элементов уменьшается на один
    cy.get('[cy-key="result-holder"]')
      .children()
      .within(($els) => {
        expect($els).to.have.length(3);
      });
  });
});
