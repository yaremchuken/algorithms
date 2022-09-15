import React, { Component } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './sorting-page.module.css';

interface SortingPageProps {}

interface SortingPageState {}

class SortingPage extends Component<SortingPageProps, SortingPageState> {
  render(): React.ReactNode {
    return (
      <SolutionLayout title="Сортировка массива">
        <div className={styles.inputBlock}></div>
        <div className={styles.sortingBlock}></div>
      </SolutionLayout>
    );
  }
}

export default SortingPage;
