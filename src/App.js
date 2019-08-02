import React from 'react';

import './App.css';
import Studio from './studio'

class App extends React.Component {
  state = {
    artwork: [],
  };

  addArt = (artPiece) => {
    console.log('addart ran')
    this.setState({
      artwork: [...this.state.artwork, artPiece]      
    })   
    
  }


  render(){
   const {artwork} = this.state;
    return (
      <div className="App">
        
        <Studio addArt={this.addArt} artwork={artwork}/>
   
        
    
      </div>
    );
  }
  
  
}

export default App;
