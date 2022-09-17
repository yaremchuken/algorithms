interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error('Maximum length exceeded');
    }

    this.container[this.tail] = item;
    this.tail++;
    this.length++;
    if (this.tail > this.container.length - 1) {
      this.tail = 0;
    }
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }

    this.container[this.head] = null;
    this.head++;
    this.length--;
    if (this.head > this.container.length - 1) {
      this.head = 0;
    }
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error('No elements in the queue');
    }
    return this.container[this.head];
  };

  isEmpty = () => this.length === 0;

  isFull = () => this.length === this.size;

  map<U>(callbackfn: (value: T | null, index: number, array: (T | null)[]) => U): U[] {
    return Array.from(Array(this.size).keys())
      .map((i) => this.container[i] ?? null)
      .map(callbackfn);
  }
}
