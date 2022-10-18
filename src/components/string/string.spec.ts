import StringComponent from './string';

describe('Корректность разворота строки', () => {
  const stringComponent = new StringComponent({});

  it('С чётным количеством элементов', () => {
    const toReverse = 'line';

    let result = stringComponent.reverseStep(toReverse, [], 0, toReverse.length - 1);
    expect(result.input).toEqual('einl');
    result = stringComponent.reverseStep(
      result.input,
      result.changedIndexes,
      result.firstPointer,
      result.secondPointer
    );
    expect(result.input).toEqual('enil');
  });

  it('С нечётным количеством элементов', () => {
    const toReverse = 'helio';

    let result = stringComponent.reverseStep(toReverse, [], 0, toReverse.length - 1);
    expect(result.input).toEqual('oelih');
    result = stringComponent.reverseStep(
      result.input,
      result.changedIndexes,
      result.firstPointer,
      result.secondPointer
    );
    expect(result.input).toEqual('oileh');
    result = stringComponent.reverseStep(
      result.input,
      result.changedIndexes,
      result.firstPointer,
      result.secondPointer
    );
    expect(result.input).toEqual('oileh');
  });

  it('С одним символом', () => {
    const toReverse = 'a';

    let result = stringComponent.reverseStep(toReverse, [], 0, toReverse.length - 1);
    expect(result.input).toEqual('a');
  });

  it('Пустая строка', () => {
    const toReverse = '';

    let result = stringComponent.reverseStep(toReverse, [], 0, toReverse.length - 1);
    expect(result.input).toEqual('');
  });
});
