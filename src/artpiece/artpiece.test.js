import React from 'react';
import ReactDOM from 'react-dom';
import Artpiece from './artpiece';
import {MemoryRouter} from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Artpiece /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});