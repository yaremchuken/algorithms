import React, { Component } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './queue-page.module.css';

interface QueuePageProps {}

interface QueuePageState {}

class QueuePage extends Component<QueuePageProps, QueuePageState> {
  render(): React.ReactNode {
    return (
      <SolutionLayout title="Очередь">
        <div className={styles.inputBlock}></div>
        <div className={styles.queueBlock}></div>
      </SolutionLayout>
    );
  }
}

export default QueuePage;
