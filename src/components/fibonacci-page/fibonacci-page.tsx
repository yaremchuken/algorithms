import React, { Component, FormEvent } from 'react';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './fibonacci-page.module.css';

interface FibonacciPageProps {}

interface FibonacciPageState {
  input: number;
  started: boolean;
  sequence: number[];
}

class FibonacciPage extends Component<FibonacciPageProps, FibonacciPageState> {
  constructor(props: FibonacciPageProps) {
    super(props);
    this.state = {
      input: 0,
      started: false,
      sequence: [],
    };
  }

  onInput = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      input: +e.currentTarget.value,
      started: false,
      sequence: [],
    });
  };

  onPressStart = () => {
    if (this.state.input === 0) return;
    this.setState(
      {
        started: true,
      },
      this.processNextDigit
    );
  };

  processNextDigit = () => {
    setTimeout(() => {
      if (!this.state.started) return;
      this.setState(
        (state) => {
          return {
            ...state,
            sequence: [...state.sequence, this.calcNextDigit(state.sequence)],
          };
        },
        () => {
          if (this.state.input >= this.state.sequence.length) {
            this.processNextDigit();
          } else {
            this.setState({
              started: false,
            });
          }
        }
      );
    }, 500);
  };

  calcNextDigit = (sequence: number[]) => {
    if (sequence.length === 0) return 0;
    if (sequence.length === 1) return 1;
    return sequence[sequence.length - 2] + sequence[sequence.length - 1];
  };

  render(): React.ReactNode {
    return (
      <SolutionLayout title="Последовательность Фибоначчи">
        <div className={styles.inputBlock}>
          <Input
            type="digit"
            max={19}
            isLimitText
            extraClass={styles.limitedWidth}
            onInput={this.onInput}
          />
          <Button text="Рассчитать" isLoader={this.state.started} onClick={this.onPressStart} />
        </div>
        <div className={styles.fibonacciBlock}>
          {this.state.sequence.map((v, idx) => (
            <Circle key={idx} letter={`${v}`} index={idx} />
          ))}
        </div>
      </SolutionLayout>
    );
  }
}

export default FibonacciPage;
