import React, { Component } from 'react';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Column } from '../ui/column/column';
import { RadioInput } from '../ui/radio-input/radio-input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting-page.module.css';

interface SortingPageProps {}

interface SortingPageState {
  sortType: string;
  sortDirection: Direction;
  started: boolean;
  array: number[];
  sortedTill: number;
  currPointer: number;
  comparePointer: number;
  suitableIdx: number;
}

class SortingPage extends Component<SortingPageProps, SortingPageState> {
  constructor(props: SortingPageProps) {
    super(props);
    this.state = {
      sortType: 'choice',
      sortDirection: Direction.Ascending,
      started: false,
      array: [],
      sortedTill: -1,
      currPointer: -1,
      comparePointer: -1,
      suitableIdx: -1,
    };
  }

  componentDidMount(): void {
    this.refreshArray();
  }

  switchSortingType = (sortType: string) => {
    this.setState((state) => {
      return {
        sortType,
        sortedTill: sortType === 'choice' ? -1 : state.array.length,
      };
    });
  };

  onSortingChosed = (sortDirection: Direction) => {
    this.setState(
      (state) => {
        return {
          ...state,
          sortDirection,
          started: true,
          currPointer: 0,
          comparePointer: state.sortType === 'choice' ? 0 : 1,
          suitableIdx: -1,
          sortedTill: state.sortType === 'choice' ? -1 : state.array.length,
        };
      },
      () => {
        this.state.sortType === 'choice'
          ? this.processSortingChoice()
          : this.processSortingBubble();
      }
    );
  };

  refreshArray = () => {
    const len = 3 + Math.floor(Math.random() * 15);
    const array: number[] = [];
    for (let i = 0; i < len; i++) {
      array[i] = Math.floor(Math.random() * 101);
    }
    this.setState((state) => {
      return {
        array,
        started: false,
        sortedTill: state.sortType === 'choice' ? -1 : state.array.length,
        currPointer: -1,
        comparePointer: -1,
        suitableIdx: -1,
      };
    });
  };

  processSortingChoice = () => {
    setTimeout(() => {
      if (!this.state.started) return;
      let array = [...this.state.array];
      let comparePointer = this.state.comparePointer + 1;
      let currPointer = this.state.currPointer;
      let sortedTill = this.state.sortedTill;
      let suitableIdx =
        this.state.suitableIdx === -1 ? this.state.currPointer : this.state.suitableIdx;

      if (currPointer === array.length) {
        this.setState({
          started: false,
        });
      } else {
        if (comparePointer === array.length) {
          if (suitableIdx !== currPointer) {
            const tmp = array.splice(suitableIdx, 1)[0];
            array.splice(currPointer, 0, tmp);
          }
          currPointer++;
          sortedTill++;
          comparePointer = currPointer;
          suitableIdx = currPointer;
        }

        if (this.sortCondition(array[comparePointer], array[suitableIdx])) {
          suitableIdx = comparePointer;
        }

        this.setState(
          {
            array,
            comparePointer,
            currPointer,
            sortedTill,
            suitableIdx,
          },
          this.processSortingChoice
        );
      }
    }, 500);
  };

  processSortingBubble = () => {
    setTimeout(() => {
      if (!this.state.started) return;
      let array = [...this.state.array];
      let comparePointer = this.state.comparePointer;
      let currPointer = this.state.currPointer;
      let sortedTill = this.state.sortedTill;

      if (sortedTill === 0) {
        this.setState({
          started: false,
        });
      } else {
        if (comparePointer >= sortedTill) {
          sortedTill--;
          currPointer = 0;
          comparePointer = 1;
        } else {
          if (this.sortCondition(array[comparePointer], array[currPointer])) {
            const tmp = array[comparePointer];
            array[comparePointer] = array[currPointer];
            array[currPointer] = tmp;
          }
          comparePointer++;
          currPointer++;
        }
        this.setState(
          {
            array,
            comparePointer,
            currPointer,
            sortedTill,
          },
          this.processSortingBubble
        );
      }
    }, 500);
  };

  sortCondition = (a: number, b: number) => {
    return this.state.sortDirection === Direction.Ascending ? a < b : a > b;
  };

  render(): React.ReactNode {
    const { started, sortType, sortedTill, array, currPointer, comparePointer } = this.state;

    return (
      <SolutionLayout title="Сортировка массива">
        <div className={styles.inputBlock}>
          <div className={styles.radios}>
            <RadioInput
              label="Выбор"
              checked={sortType === 'choice'}
              onChange={() => this.switchSortingType('choice')}
            />
            <RadioInput
              label="Пузырёк"
              checked={sortType === 'bubble'}
              onChange={() => this.switchSortingType('bubble')}
            />
          </div>
          <div className={styles.sortChoose}>
            <Button
              text="По возрастанию"
              sorting={Direction.Ascending}
              onClick={() => {
                this.onSortingChosed(Direction.Ascending);
              }}
              isLoader={started}
            />
            <Button
              text="По убыванию"
              sorting={Direction.Descending}
              onClick={() => {
                this.onSortingChosed(Direction.Descending);
              }}
              isLoader={started}
            />
          </div>
          <Button text="Новый массив" onClick={this.refreshArray} isLoader={started} />
        </div>
        <div className={styles.sortingBlock}>
          {array.map((v, idx) => (
            <Column
              index={v}
              key={idx}
              state={
                (sortType === 'choice' && idx <= sortedTill) ||
                (sortType === 'bubble' && idx >= sortedTill)
                  ? ElementStates.Modified
                  : idx === currPointer || idx === comparePointer
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
          ))}
        </div>
      </SolutionLayout>
    );
  }
}

export default SortingPage;
