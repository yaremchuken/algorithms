import { onBubbleSort, onChoiceSort } from '../../utils/utils';

describe('Корректность сортировки массива', () => {
  it('Сортировка Пузырьком - пустой массив', () => {
    const { array } = onBubbleSort([], 0, 0, 1);
    expect(array).toHaveLength(0);
  });

  it('Сортировка Пузырьком - один элемент', () => {
    const { array } = onBubbleSort([7], 0, 1, 1);
    expect(array[0]).toEqual(7);
  });

  it('Сортировка Пузырьком - несколько элементов', () => {
    const initialArray = [7, 34, 5, 12, 23];

    let result = onBubbleSort(initialArray, 0, 5, 1);

    for (let i = 0; i < 5; i++) {
      result = onBubbleSort(
        result.array,
        result.currPointer,
        result.sortedTill,
        result.comparePointer
      );
    }

    expect(result.array).toEqual([5, 7, 12, 23, 34]);
  });

  it('Сортировка Выбором - пустой массив', () => {
    let result = onChoiceSort([], 0, -1, 0, -1);
    expect(result.array).toHaveLength(0);
  });

  it('Сортировка Выбором - один элемент', () => {
    let result = onChoiceSort([7], 0, -1, 0, -1);
    expect(result.array[0]).toEqual(7);
  });

  it('Сортировка Выбором - несколько элементов', () => {
    const initialArray = [7, 34, 5, 12, 23];

    let result = onChoiceSort(initialArray, 0, -1, 0, -1);

    // Для 5 элементов требуется 13 шагов, т.к. туда включены не только переставления,
    // но и проход по всем индексам от последнего отсортированного значения до конца массива
    for (let i = 0; i < 13; i++) {
      result = onChoiceSort(
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
