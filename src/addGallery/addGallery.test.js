import React from 'react';
import ReactDOM from 'react-dom';
import AddGallery from './addGallery';
import {MemoryRouter} from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><AddGallery /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});