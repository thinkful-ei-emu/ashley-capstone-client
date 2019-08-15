import React from 'react';
import ReactDOM from 'react-dom';
import NavLanding from './navLanding';
import {MemoryRouter} from 'react-router-dom';
;


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><NavLanding /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});