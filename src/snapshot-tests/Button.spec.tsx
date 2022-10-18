import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Button } from '../components/ui/button/button';

describe('Тестирование компонента Button', () => {
  it('Кнопка с текстом', () => {
    const tree = renderer.create(<Button text="Выполнить" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Кнопка без текста', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Заблокированная кнопка', () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Кнопка с индикацией загрузки', () => {
    const tree = renderer.create(<Button isLoader />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Корректность вызова колбэка при клике', () => {
    let clicked = false;

    const callMe = () => {
      clicked = true;
    };

    const { getByTestId } = render(<Button data-testid={'button'} onClick={callMe} />);

    const button = getByTestId('button');
    expect(button).toBeTruthy();
    fireEvent.click(button);

    expect(clicked).toEqual(true);
  });
});
