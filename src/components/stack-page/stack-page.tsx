import React, { Component, FormEvent } from 'react';
import { Stack } from '../../structs/Stack';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack-page.module.css';

interface StackPageProps {}

interface StackPageState {
  input: string;
  stack: Stack<number>;
}

class StackPage extends Component<StackPageProps, StackPageState> {
  constructor(props: StackPageProps) {
    super(props);
    this.state = {
      input: '',
      stack: new Stack(),
    };
  }

  onInput = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      input: e.currentTarget.value,
    });
  };

  onAdd = (e: FormEvent<HTMLButtonElement>) => {
    const input = +(document.querySelector('#stack-input-field') as HTMLInputElement).value;
    if (isNaN(input)) return;
    const { stack } = this.state;
    stack.push(input);
    this.setState({
      stack,
    });
  };

  onRemove = () => {
    const { stack } = this.state;
    stack.pop();
    this.setState({
      stack,
    });
  };

  onClear = () => {
    this.setState({
      stack: new Stack(),
    });
  };

  render(): React.ReactNode {
    const { stack } = this.state;
    return (
      <SolutionLayout title="Стек">
        <div className={styles.inputBlock}>
          <div className={styles.operationInputs}>
            <Input maxLength={4} isLimitText id="stack-input-field" onInput={this.onInput} />
            <Button text="Добавить" onClick={this.onAdd} disabled={this.state.input === ''} />
            <Button text="Удалить" onClick={this.onRemove} />
          </div>
          <Button text="Очистить" onClick={this.onClear} />
        </div>
        <div className={styles.stackBlock} cy-key="result-holder">
          {stack.elements().map((v, idx) => (
            <Circle
              key={idx}
              letter={`${v}`}
              index={idx}
              head={idx === stack.getSize() - 1 ? 'top' : ''}
            />
          ))}
        </div>
      </SolutionLayout>
    );
  }
}

export default StackPage;
