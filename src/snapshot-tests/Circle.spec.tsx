import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Circle } from '../components/ui/circle/circle';
import { ElementStates } from '../types/element-states';

describe('Тестирование компонента Circle', () => {
  it('Без текста', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('С буквами', () => {
    const tree = renderer.create(<Circle letter="ABC" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('С head', () => {
    const tree = renderer.create(<Circle head="head" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('С react-элементом в head', () => {
    const tree = renderer.create(<Circle head={<Circle letter="top" />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('С tail', () => {
    const tree = renderer.create(<Circle tail="tail" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('С react-элементом в tail', () => {
    const tree = renderer.create(<Circle tail={<Circle letter="end" />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('С индексом', () => {
    const tree = renderer.create(<Circle index={2} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('С пропом isSmall', () => {
    const tree = renderer.create(<Circle isSmall />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('В состоянии default', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('В состоянии changing', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('В состоянии modified', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
