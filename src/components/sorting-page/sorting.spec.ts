import SortingPage from './sorting-page';

describe('Корректность сортировки массива', () => {
  const sortingComponent = new SortingPage({});

  it('Сортировка Пузырьком - пустой массив', () => {
    const { array } = sortingComponent.onBubbleSort([], 0, 0, 1);
    expect(array).toHaveLength(0);
  });

  it('Сортировка Пузырьком - один элемент', () => {
    const { array } = sortingComponent.onBubbleSort([7], 0, 1, 1);
    expect(array[0]).toEqual(7);
  });

  it('Сортировка Пузырьком - несколько элементов', () => {
    const initialArray = [7, 34, 5, 12, 23];

    let result = sortingComponent.onBubbleSort(initialArray, 0, 5, 1);

    result = sortingComponent.onBubbleSort(
      result.array,
      result.currPointer,
      result.sortedTill,
      result.comparePointer
    );
    expect(result.array).toEqual([7, 5, 34, 12, 23]);

    result = sortingComponent.onBubbleSort(
      result.array,
      result.currPointer,
      result.sortedTill,
      result.comparePointer
    );
    expect(result.array).toEqual([7, 5, 12, 34, 23]);

    result = sortingComponent.onBubbleSort(
      result.array,
      result.currPointer,
      result.sortedTill,
      result.comparePointer
    );
    expect(result.array).toEqual([7, 5, 12, 23, 34]);

    result = sortingComponent.onBubbleSort(
      result.array,
      result.currPointer,
      result.sortedTill,
      result.comparePointer
    );
    result = sortingComponent.onBubbleSort(
      result.array,
      result.currPointer,
      result.sortedTill,
      result.comparePointer
    );
    expect(result.array).toEqual([5, 7, 12, 23, 34]);
  });

  it('Сортировка Выбором - пустой массив', () => {
    let result = sortingComponent.onChoiceSort([], 0, -1, 0, -1);
    expect(result.array).toHaveLength(0);
  });

  it('Сортировка Выбором - один элемент', () => {
    let result = sortingComponent.onChoiceSort([7], 0, -1, 0, -1);
    expect(result.array[0]).toEqual(7);
  });

  it('Сортировка Выбором - несколько элементов', () => {
    const initialArray = [7, 34, 5, 12, 23];

    let result = sortingComponent.onChoiceSort(initialArray, 0, -1, 0, -1);

    // Для 5 элементов требуется 13 шагов, т.к. туда включены не только переставления,
    // но и проход по всем индексам от последнего отсортированного значения до конца массива
    for (let i = 0; i < 13; i++) {
      result = sortingComponent.onChoiceSort(
        result.array,
        result.currPointer,
        result.sortedTill,
        result.comparePointer,
        result.suitableIdx
      );
    }

    expect(result.array).toEqual([5, 7, 12, 23, 34]);
  });
});
