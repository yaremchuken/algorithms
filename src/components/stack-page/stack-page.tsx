import React, { Component, FormEvent } from 'react';
import { Stack } from '../../structs/Stack';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack-page.module.css';

interface StackPageProps {}

interface StackPageState {
  stack: Stack<number>;
}

class StackPage extends Component<StackPageProps, StackPageState> {
  constructor(props: StackPageProps) {
    super(props);
    this.state = {
      stack: new Stack(),
    };
  }

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
            <Input maxLength={4} isLimitText id="stack-input-field" />
            <Button text="Добавить" onClick={this.onAdd} />
            <Button text="Удалить" onClick={this.onRemove} />
          </div>
          <Button text="Очистить" onClick={this.onClear} />
        </div>
        <div className={styles.stackBlock}>
          {stack.map((v, idx) => (
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
