import React, { Component, FormEvent, useState } from 'react';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './string.module.css';

type StringComponentProps = {};

type StringComponentState = {
  input: string;
  reverseStarted: boolean;
  changedIndexes: number[];
  startPointer: number;
  endPointer: number;
};

class StringComponent extends Component<StringComponentProps, StringComponentState> {
  constructor(props: StringComponentProps) {
    super(props);
    this.state = {
      input: '',
      reverseStarted: false,
      changedIndexes: [],
      startPointer: 0,
      endPointer: 0,
    };
  }

  onInput = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      reverseStarted: false,
      input: e.currentTarget.value,
      changedIndexes: [],
      startPointer: 0,
      endPointer: e.currentTarget.value.length - 1,
    });
  };

  onPressReverse = () => {
    this.setState({
      reverseStarted: true,
    });
    this.doReverse();
  };

  doReverse = () => {
    setTimeout(() => {
      if (!this.state.reverseStarted) return;
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
            this.doReverse();
          } else {
            this.setState({
              reverseStarted: false,
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
          <Input maxLength={11} isLimitText onInput={this.onInput} />
          <Button
            text="Развернуть"
            isLoader={this.state.reverseStarted}
            onClick={this.onPressReverse}
          />
        </div>
        <div className={styles.reverseBlock}>
          {this.state.input.split('').map((v, idx) => (
            <Circle
              key={idx}
              letter={v}
              state={
                this.state.changedIndexes.includes(idx)
                  ? ElementStates.Modified
                  : this.state.reverseStarted &&
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
