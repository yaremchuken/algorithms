import React, { Component, FormEvent } from 'react';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';

interface StringComponentProps {}

interface StringComponentState {
  input: string;
  started: boolean;
  changedIndexes: number[];
  startPointer: number;
  endPointer: number;
}

class StringComponent extends Component<StringComponentProps, StringComponentState> {
  constructor(props: StringComponentProps) {
    super(props);
    this.state = {
      input: '',
      started: false,
      changedIndexes: [],
      startPointer: 0,
      endPointer: 0,
    };
  }

  onInput = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      started: false,
      input: e.currentTarget.value,
      changedIndexes: [],
      startPointer: 0,
      endPointer: e.currentTarget.value.length - 1,
    });
  };

  onPressStart = () => {
    this.setState(
      {
        started: true,
      },
      this.processReverse
    );
  };

  processReverse = () => {
    setTimeout(() => {
      if (!this.state.started) return;
      this.setState(
        (state) => {
          return {
            ...state,
            input: this.rearrangeChars(state.input, state.startPointer, state.endPointer),
            changedIndexes: [...state.changedIndexes, state.startPointer, state.endPointer],
            startPointer: state.startPointer + 1,
            endPointer: state.endPointer - 1,
          };
        },
        () => {
          if (this.state.startPointer <= this.state.endPointer) {
            this.processReverse();
          } else {
            this.setState({
              started: false,
            });
          }
        }
      );
    }, 1000);
  };

  rearrangeChars = (str: string, first: number, second: number) => {
    const arr = str.split('');
    const tmp = arr[first];
    arr[first] = arr[second];
    arr[second] = tmp;
    return arr.join('');
  };

  render(): React.ReactNode {
    return (
      <SolutionLayout title="Строка">
        <div className={styles.inputBlock}>
          <Input
            maxLength={11}
            isLimitText
            extraClass={styles.limitedWidth}
            onInput={this.onInput}
          />
          <Button
            text="Развернуть"
            isLoader={this.state.started}
            disabled={this.state.input.length === 0}
            onClick={this.onPressStart}
          />
        </div>
        <div className={styles.reverseBlock} cy-key="result-holder">
          {this.state.input.split('').map((v, idx) => (
            <Circle
              key={idx}
              letter={v}
              state={
                this.state.changedIndexes.includes(idx)
                  ? ElementStates.Modified
                  : this.state.started &&
                    (idx === this.state.startPointer || idx === this.state.endPointer)
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

export default StringComponent;
