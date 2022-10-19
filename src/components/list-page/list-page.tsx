import React, { Component, FormEvent } from 'react';
import { LinkedList } from '../../structs/LinkedList';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { ArrowIcon } from '../ui/icons/arrow-icon';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './list-page.module.css';

interface IndexedValue {
  index: number;
  value: number;
}

enum Operation {
  ADD_HEAD,
  ADD_TAIL,
  ADD_BY_INDEX,
  REMOVE_HEAD,
  REMOVE_TAIL,
  REMOVE_BY_INDEX,
}

interface ListPageProps {}

interface ListPageState {
  valueInput: string;
  indexInput: string;
  list: LinkedList<number>;
  insertion: IndexedValue | null;
  indexCounter: number;
  deleteAt: number;
  highlight: number;
  operation: Operation | null;
}

class ListPage extends Component<ListPageProps, ListPageState> {
  constructor(props: ListPageProps) {
    super(props);
    this.state = {
      valueInput: '',
      indexInput: '',
      list: new LinkedList<number>(),
      insertion: null,
      indexCounter: -1,
      deleteAt: -1,
      highlight: -1,
      operation: null,
    };
  }

  componentDidMount(): void {
    const list = new LinkedList<number>();
    for (let i = 0; i < 4; i++) list.append(Math.floor(Math.random() * 99));
    this.setState({
      list,
    });
  }

  onInputValue = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      valueInput: e.currentTarget.value,
    });
  };

  onInputIndex = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      indexInput: e.currentTarget.value,
    });
  };

  onAdd = (asHead: boolean = true) => {
    const input = this.getInput();
    if (isNaN(input)) return;

    this.playInsertAnimation(
      asHead ? 0 : this.state.list.getSize(),
      input,
      asHead ? Operation.ADD_HEAD : Operation.ADD_TAIL
    );
  };

  onAddByIndex = () => {
    const input = this.getInput();
    const index = this.getInput(true);
    if (isNaN(input) || isNaN(index) || index > this.state.list.getSize()) return;

    this.playInsertAnimation(index, input, Operation.ADD_BY_INDEX);
  };

  playInsertAnimation = (index: number, value: number, operation: Operation) => {
    const nList = this.state.list;
    this.setState(
      {
        insertion: { index: Math.min(index, nList.getSize() - 1), value },
        operation,
      },
      () =>
        setTimeout(() => {
          nList.addByIndex(value, index);
          this.setState(
            {
              list: nList,
              insertion: null,
              highlight: index,
            },
            () =>
              setTimeout(() => {
                this.setState({
                  highlight: -1,
                  operation: null,
                });
              }, 500)
          );
        }, 500)
    );
  };

  onRemove = (asHead: boolean = true) => {
    this.setState(
      {
        deleteAt: asHead ? 0 : this.state.list.getSize() - 1,
        indexCounter: 0,
        operation: asHead ? Operation.REMOVE_HEAD : Operation.REMOVE_TAIL,
      },
      () => this.playRemoveAnimation()
    );
  };

  onRemoveByIndex = () => {
    const index = this.getInput(true);
    if (isNaN(index) || index >= this.state.list.getSize()) return;

    this.setState(
      {
        deleteAt: index,
        indexCounter: 0,
        operation: Operation.REMOVE_BY_INDEX,
      },
      () => this.playRemoveAnimation()
    );
  };

  playRemoveAnimation = () => {
    const { indexCounter, deleteAt } = this.state;
    setTimeout(() => {
      if (indexCounter < deleteAt) {
        this.setState(
          {
            indexCounter: indexCounter + 1,
          },
          () => this.playRemoveAnimation()
        );
      } else {
        const nList = this.state.list;
        nList.deleteByIndex(deleteAt);
        this.setState({
          list: nList,
          indexCounter: -1,
          deleteAt: -1,
          operation: null,
        });
      }
    }, 500);
  };

  getInput = (index: boolean = false) => {
    return +(
      document.querySelector(`#${index ? 'index' : 'value'}-input-field`) as HTMLInputElement
    ).value;
  };

  render(): React.ReactNode {
    const { list, insertion, indexCounter, deleteAt, highlight, operation } = this.state;
    return (
      <SolutionLayout title="Связный список">
        <div className={styles.inputBlock}>
          <div className={styles.valueInputs}>
            <Input
              maxLength={4}
              isLimitText
              extraClass={styles.limitedWidth}
              id="value-input-field"
              onInput={this.onInputValue}
            />
            <Button
              text="Добавить в head"
              extraClass={styles.smallButton}
              onClick={() => this.onAdd()}
              isLoader={operation === Operation.ADD_HEAD}
              disabled={
                (operation !== null && operation !== Operation.ADD_HEAD) ||
                this.state.valueInput === ''
              }
            />
            <Button
              text="Добавить в tail"
              extraClass={styles.smallButton}
              onClick={() => this.onAdd(false)}
              isLoader={operation === Operation.ADD_TAIL}
              disabled={
                (operation !== null && operation !== Operation.ADD_TAIL) ||
                this.state.valueInput === ''
              }
            />
            <Button
              text="Удалить из head"
              extraClass={styles.smallButton}
              onClick={() => this.onRemove()}
              isLoader={operation === Operation.REMOVE_HEAD}
              disabled={operation !== null && operation !== Operation.REMOVE_HEAD}
            />
            <Button
              text="Удалить из tail"
              extraClass={styles.smallButton}
              onClick={() => this.onRemove(false)}
              isLoader={operation === Operation.REMOVE_TAIL}
              disabled={operation !== null && operation !== Operation.REMOVE_TAIL}
            />
          </div>
          <div className={styles.indexInputs}>
            <Input
              id="index-input-field"
              extraClass={styles.limitedWidth}
              onInput={this.onInputIndex}
            />
            <Button
              text="Добавить по индексу"
              extraClass={styles.wideButton}
              onClick={() => this.onAddByIndex()}
              isLoader={operation === Operation.ADD_BY_INDEX}
              disabled={
                (operation !== null && operation !== Operation.ADD_BY_INDEX) ||
                this.state.valueInput === '' ||
                this.state.indexInput === ''
              }
            />
            <Button
              text="Удалить по индексу"
              extraClass={styles.wideButton}
              onClick={() => this.onRemoveByIndex()}
              isLoader={operation === Operation.REMOVE_BY_INDEX}
              disabled={
                (operation !== null && operation !== Operation.REMOVE_BY_INDEX) ||
                this.state.indexInput === ''
              }
            />
          </div>
        </div>
        <div className={styles.listBlock} cy-key="result-holder">
          {list.toArray().map((v, idx) => (
            <div key={idx} className={styles.node}>
              <div>
                {insertion?.index === idx && (
                  <Circle
                    letter={`${insertion.value}`}
                    extraClass={styles.insertion}
                    state={ElementStates.Changing}
                    isSmall
                  />
                )}
                <Circle
                  letter={`${deleteAt === idx && indexCounter === idx ? '' : v}`}
                  index={idx}
                  state={
                    idx <= indexCounter
                      ? ElementStates.Changing
                      : idx === highlight
                      ? ElementStates.Modified
                      : ElementStates.Default
                  }
                  head={idx === 0 && insertion?.index !== idx ? 'head' : ''}
                  tail={idx === list.getSize() - 1 && idx !== indexCounter ? 'tail' : ''}
                />
                {deleteAt === idx && indexCounter === idx && (
                  <Circle
                    letter={`${v}`}
                    extraClass={styles.removal}
                    state={ElementStates.Changing}
                    isSmall
                  />
                )}
              </div>
              {idx < list.getSize() - 1 && <ArrowIcon />}
            </div>
          ))}
        </div>
      </SolutionLayout>
    );
  }
}

export default ListPage;
