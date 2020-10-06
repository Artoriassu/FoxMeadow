import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import SocialNetApp from './App';

/* test('renders learn react link', () => {
  const { getByText } = render(<SocialNetApp />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SocialNetApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});