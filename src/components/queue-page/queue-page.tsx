import React, { Component, FormEvent } from 'react';
import { Queue } from '../../structs/Queue';
import { ElementStates } from '../../types/element-states';
import { Button } from '../ui/button/button';
import { Circle } from '../ui/circle/circle';
import { Input } from '../ui/input/input';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue-page.module.css';

interface QueuePageProps {}

interface QueuePageState {
  input: string;
  queue: Queue<number>;
  head: number;
  tail: number;
  highlight: number;
}

class QueuePage extends Component<QueuePageProps, QueuePageState> {
  private readonly queueSize: number = 7;

  constructor(props: QueuePageProps) {
    super(props);
    this.state = {
      input: '',
      queue: new Queue(this.queueSize),
      head: -1,
      tail: -1,
      highlight: -1,
    };
  }

  onInput = (e: FormEvent<HTMLInputElement>) => {
    this.setState({
      input: e.currentTarget.value,
    });
  };

  onAdd = () => {
    const { queue, head, tail, highlight } = this.state;

    if (queue.isFull() || highlight !== -1) return;

    const el = document.querySelector('#queue-input-field') as HTMLInputElement;
    if (!el.value) return;

    const input = +el.value;
    el.value = '';
    if (isNaN(input)) return;

    queue.enqueue(input);

    const nTail = tail + 1 === this.queueSize ? 0 : tail + 1;

    this.setState(
      {
        queue,
        head: head === -1 ? 0 : head,
        tail: nTail,
        highlight: nTail,
      },
      () =>
        setTimeout(() => {
          this.setState({
            input: '',
            highlight: -1,
          });
        }, 300)
    );
  };

  onRemove = () => {
    const { queue, head, highlight } = this.state;
    if (queue.isEmpty() || highlight !== -1) return;
    queue.dequeue();
    const oldHead = head;
    this.setState(
      {
        queue,
        head: head + 1 === this.queueSize ? 0 : head + 1,
        highlight: oldHead,
      },
      () =>
        setTimeout(() => {
          this.setState({
            highlight: -1,
          });
        }, 300)
    );
  };

  onClear = () => {
    if (this.state.highlight !== -1) return;
    this.setState({
      queue: new Queue(this.queueSize),
      head: -1,
      tail: -1,
    });
  };

  render(): React.ReactNode {
    const { queue, head, tail, highlight } = this.state;
    return (
      <SolutionLayout title="Очередь">
        <div className={styles.inputBlock}>
          <div className={styles.operationInputs}>
            <Input maxLength={4} isLimitText id="queue-input-field" onInput={this.onInput} />
            <Button
              text="Добавить"
              onClick={this.onAdd}
              disabled={highlight !== -1 || this.state.input === ''}
            />
            <Button text="Удалить" onClick={this.onRemove} disabled={highlight !== -1} />
          </div>
          <Button text="Очистить" onClick={this.onClear} disabled={highlight !== -1} />
        </div>
        <div className={styles.queueBlock} cy-key="result-holder">
          {queue.elements().map((v, idx) => (
            <Circle
              key={idx}
              letter={`${v ?? ''}`}
              index={idx}
              head={`${!queue.isEmpty() && idx === head ? 'head' : ''}`}
              tail={`${!queue.isEmpty() && idx === tail ? 'tail' : ''}`}
              state={idx === highlight ? ElementStates.Changing : ElementStates.Default}
            />
          ))}
        </div>
      </SolutionLayout>
    );
  }
}

export default QueuePage;
