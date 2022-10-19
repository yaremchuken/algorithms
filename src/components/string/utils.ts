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
