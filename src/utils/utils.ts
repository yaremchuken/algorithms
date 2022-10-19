import { Direction } from '../types/direction';

export const onChoiceSort = (
  array: number[],
  currPointer: number,
  sortedTill: number,
  comparePointer: number,
  suitableIdx: number,
  direction: Direction = Direction.Ascending
) => {
  const tmpArray = [...array];
  let tmpCurrPointer = currPointer;
  let tmpSortedTill = sortedTill;
  let tmpComparePointer = comparePointer + 1;
  let tmpSuitableIdx = suitableIdx === -1 ? currPointer : suitableIdx;

  if (tmpComparePointer === tmpArray.length) {
    if (tmpSuitableIdx !== tmpCurrPointer && tmpArray.length > 0) {
      const tmp = tmpArray.splice(tmpSuitableIdx, 1)[0];
      tmpArray.splice(tmpCurrPointer, 0, tmp);
    }
    tmpCurrPointer++;
    tmpSortedTill++;
    tmpComparePointer = tmpCurrPointer;
    tmpSuitableIdx = tmpCurrPointer;
  }

  if (sortCondition(tmpArray[tmpComparePointer], tmpArray[tmpSuitableIdx], direction)) {
    tmpSuitableIdx = tmpComparePointer;
  }

  return {
    array: tmpArray,
    currPointer: tmpCurrPointer,
    sortedTill: tmpSortedTill,
    comparePointer: tmpComparePointer,
    suitableIdx: tmpSuitableIdx,
  };
};

export const onBubbleSort = (
  array: number[],
  currPointer: number,
  sortedTill: number,
  comparePointer: number,
  direction: Direction = Direction.Ascending
) => {
  const tmpArray = [...array];
  let tmpCurrPointer = currPointer;
  let tmpSortedTill = sortedTill;
  let tmpComparePointer = comparePointer;

  if (comparePointer >= sortedTill) {
    tmpSortedTill--;
    tmpCurrPointer = 0;
    tmpComparePointer = 1;
  } else {
    if (sortCondition(array[comparePointer], array[currPointer], direction)) {
      const tmp = array[comparePointer];
      tmpArray[comparePointer] = tmpArray[currPointer];
      tmpArray[currPointer] = tmp;
    }
    tmpComparePointer++;
    tmpCurrPointer++;
  }

  return {
    array: tmpArray,
    currPointer: tmpCurrPointer,
    sortedTill: tmpSortedTill,
    comparePointer: tmpComparePointer,
  };
};

const sortCondition = (a: number, b: number, direction: Direction) => {
  return direction === Direction.Ascending ? a < b : a > b;
};

export const stringReverse = (
  input: string,
  indexes: number[],
  firstPointer: number,
  secondPointer: number
) => {
  return {
    input: rearrangeChars(input, firstPointer, secondPointer),
    changedIndexes: [...indexes, firstPointer, secondPointer],
    firstPointer: firstPointer + 1,
    secondPointer: secondPointer - 1,
  };
};

const rearrangeChars = (str: string, first: number, second: number) => {
  const arr = str.split('');
  const tmp = arr[first];
  arr[first] = arr[second];
  arr[second] = tmp;
  return arr.join('');
};
