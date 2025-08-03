import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation menu', () => {
  render(<App />);
  const menuElement = screen.getByText(/home/i);
  expect(menuElement).toBeInTheDocument();
});
