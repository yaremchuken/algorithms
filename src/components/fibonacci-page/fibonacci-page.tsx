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
            sequence: this.getFibonacciNumbers(state.sequence.length),
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

  getFibonacciNumbers = (value: number) => {
    if (value === 0) return [0];
    const fib = [0, 1];
    for (let i = 2; i <= value; i++) {
      fib.push(fib[i - 2] + fib[i - 1]);
    }
    return fib;
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
          <Button
            text="Рассчитать"
            isLoader={this.state.started}
            disabled={this.state.input === 0}
            onClick={this.onPressStart}
          />
        </div>
        <div className={styles.fibonacciBlock} cy-key="result-holder">
          {this.state.sequence.map((v, idx) => (
            <Circle key={idx} letter={`${v}`} index={idx} />
          ))}
        </div>
      </SolutionLayout>
    );
  }
}

export default FibonacciPage;
