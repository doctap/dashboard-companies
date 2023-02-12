import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('My Test', () => {
  test('test TexT', async () => {
    render(<Component />);
    screen.debug();
    const componentText = await screen.findByText(/data/i);
    expect(componentText).toBeInTheDocument();
    expect(componentText).toHaveStyle({ color: 'red' });
    screen.debug();
  });

  test('Click EVENT', () => {
    render(<Component />);
    const but = screen.getByTestId('testId-button');
    expect(screen.queryByTestId('testId-div')).toBeNull();
    fireEvent.click(but);
    expect(screen.queryByTestId('testId-div')).toBeInTheDocument();
  });
});
