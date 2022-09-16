import React, { Component } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './stack-page.module.css';

interface StackPageProps {}

interface StackPageState {}

class StackPage extends Component<StackPageProps, StackPageState> {
  constructor(props: StackPageProps) {
    super(props);
    this.state = {};
  }

  render(): React.ReactNode {
    return (
      <SolutionLayout title="Стек">
        <div className={styles.inputBlock}></div>
        <div className={styles.stackBlock}></div>
      </SolutionLayout>
    );
  }
}

export default StackPage;
