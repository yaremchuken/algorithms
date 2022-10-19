import { stringReverse } from '../../utils/utils';

describe('Корректность разворота строки', () => {
  it('С чётным количеством элементов', () => {
    const toReverse = 'line';

    let result = stringReverse(toReverse, [], 0, toReverse.length - 1);
    expect(result.input).toEqual('einl');
    result = stringReverse(
      result.input,
      result.changedIndexes,
      result.firstPointer,
      result.secondPointer
    );
    expect(result.input).toEqual('enil');
  });

  it('С нечётным количеством элементов', () => {
    const toReverse = 'helio';

    let result = stringReverse(toReverse, [], 0, toReverse.length - 1);
    expect(result.input).toEqual('oelih');
    result = stringReverse(
      result.input,
      result.changedIndexes,
      result.firstPointer,
      result.secondPointer
    );
    expect(result.input).toEqual('oileh');
    result = stringReverse(
      result.input,
      result.changedIndexes,
      result.firstPointer,
      result.secondPointer
    );
    expect(result.input).toEqual('oileh');
  });

  it('С одним символом', () => {
    const toReverse = 'a';
    let result = stringReverse(toReverse, [], 0, toReverse.length - 1);
    expect(result.input).toEqual('a');
  });

  it('Пустая строка', () => {
    const toReverse = '';
    let result = stringReverse(toReverse, [], 0, toReverse.length - 1);
    expect(result.input).toEqual('');
  });
});
