export class Node<T> {
  value: T;
  next: Node<T> | null;
  constructor(value: T, next?: Node<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  remove: (element: T) => void;
  insertAt: (element: T, index: number) => void;
  removeAt: (index: number) => void;
  getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null;
  private size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(element: T) {
    const node = new Node(element);
    let current;

    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }

    this.size++;
  }

  remove(element: T) {
    if (this.head === null) return;

    if (element === this.head.value) {
      this.head = this.head.next;
    } else {
      let prev;
      let curr = this.head;

      while (curr.next) {
        prev = curr;
        curr = curr.next;
        if (curr.value === element) {
          prev.next = curr.next;
          break;
        }
      }
    }

    this.size--;
  }

  insertAt(element: T, index: number) {
    if (index < 0 || index > this.size) return;

    const node = new Node(element);

    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let curr = this.head;
      let currIndex = 0;

      while (curr) {
        if (!curr) {
          break;
        }
        if (currIndex === index - 1) {
          node.next = curr.next;
          curr.next = node;

          break;
        }

        curr = curr.next;
        currIndex++;
      }
    }

    this.size++;
  }

  removeAt = (index: number) => {
    if (index < 0 || index > this.size) return;
    if (this.head === null) return;

    if (index === 0) {
      this.head = this.head.next;
    } else {
      let prev;
      let curr = this.head;
      let currIndex = 0;

      while (curr.next) {
        prev = curr;
        curr = curr.next;
        currIndex++;

        if (currIndex === index) {
          prev.next = curr.next;
          break;
        }
      }
    }

    this.size--;
  };

  getSize() {
    return this.size;
  }

  map<U>(callbackfn: (value: T | null, index: number, array: (T | null)[]) => U): U[] {
    if (this.head === null) return [];

    const array: T[] = [];

    let curr: Node<T> | null = this.head;
    while (curr) {
      array.push(curr.value);
      curr = curr.next;
    }

    return array.map(callbackfn);
  }
}
