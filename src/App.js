import React from 'react';

import './App.css';
import Studio from './studio'

class App extends React.Component {
  state = {
    artwork: [],
  };

  addArt = artPiece => {
    this.setState({
      artwork: [...this.state.artwork, artPiece]
    })
  }


  render(){
    return (
      <div className="App">
        <header>     
        </header>
        <Studio addArt={this.props.addArt}/>
      </div>
    );
  }
  
  
}

export default App;
