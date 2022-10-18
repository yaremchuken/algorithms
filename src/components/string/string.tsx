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

      const { input, startPointer, endPointer, changedIndexes } = this.state;

      const reversed = this.reverseStep(input, changedIndexes, startPointer, endPointer);

      this.setState(
        (state) => {
          return {
            ...state,
            input: reversed.input,
            changedIndexes: reversed.changedIndexes,
            startPointer: reversed.firstPointer,
            endPointer: reversed.secondPointer,
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

  reverseStep = (input: string, indexes: number[], firstPointer: number, secondPointer: number) => {
    return {
      input: this.rearrangeChars(input, firstPointer, secondPointer),
      changedIndexes: [...indexes, firstPointer, secondPointer],
      firstPointer: firstPointer + 1,
      secondPointer: secondPointer - 1,
    };
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
            data-testid={`input`}
          />
          <Button
            text="Развернуть"
            isLoader={this.state.started}
            disabled={this.state.input.length === 0}
            onClick={this.onPressStart}
            data-testid={`reversion-btn`}
          />
        </div>
        <div className={styles.reverseBlock} cy-key="result-holder">
          {this.state.input.split('').map((v, idx) => (
            <Circle
              data-testid={`circle-${idx}`}
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
