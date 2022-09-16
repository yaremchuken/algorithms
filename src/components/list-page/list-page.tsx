import React, { Component } from 'react';
import { SolutionLayout } from '../ui/solution-layout/solution-layout';
import styles from './list-page.module.css';

interface ListPageProps {}

interface ListPageState {}

class ListPage extends Component<ListPageProps, ListPageState> {
  constructor(props: ListPageProps) {
    super(props);
    this.state = {};
  }

  render(): React.ReactNode {
    return (
      <SolutionLayout title="Связный список">
        <div className={styles.inputBlock}></div>
        <div className={styles.listBlock}></div>
      </SolutionLayout>
    );
  }
}

export default ListPage;
