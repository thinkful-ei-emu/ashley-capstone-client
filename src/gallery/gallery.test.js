import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './gallery';
import { MemoryRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <Gallery />
    </MemoryRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
