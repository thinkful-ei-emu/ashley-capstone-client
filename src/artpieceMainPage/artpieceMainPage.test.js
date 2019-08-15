import React from 'react';
import ReactDOM from 'react-dom';
import ArtpieceMainPage from './artpieceMainPage';
import {MemoryRouter} from 'react-router-dom';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ArtpieceMainPage /></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});