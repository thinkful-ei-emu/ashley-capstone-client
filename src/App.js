import React from 'react';
import './App.css';
import Studio from './studio/studio'

class App extends React.Component {
  state = {
    artwork: [],
    color: '',
  };

  addArt = (artPiece) => {
    console.log('addart ran')
    this.setState({
      artwork: [...this.state.artwork, artPiece]      
    })   
    
  }

  updateColor = (color) => {
    console.log('updateColor ran')
    this.setState({
      color: color,     
    })   
  }


  render(){
   const {artwork, color} = this.state;   
    return (
      <div className="App">
        
        <Studio updateColor={this.updateColor} color={color} addArt={this.addArt} artwork={artwork}/>
   
        
    
      </div>
    );
  }
  
  
}

export default App;
