import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import {CompactPicker, SwatchesPicker, CirclePicker} from 'react-color';
import './studio.css'



class Studio extends React.Component {  
  
  // static defaultProps = {
  //   loadTimeOffset: 5,
  //   lazyRadius: 30,
  //   brushRadius: 12,
  //   brushColor: "#444",
  //   catenaryColor: "#0a0302",
  //   gridColor: "rgba(150,150,150,0.17)",
  //   hideGrid: false,
  //   canvasWidth: 400,
  //   canvasHeight: 400,
  //   disabled: false,
  //   imgSrc: "",
  //   saveData: null,
  //   immediateLoading: false
  // };

 
  handleSubmit = e => {
    e.preventDefault();
    let artData = this.saveableCanvas.getSaveData()
    
    const artpiece = {title: e.target["art-title"].value, artImage: artData}
    this.props.addArt(artpiece)
  }

onChangeComplete = (color, event) => {
  console.log(color);
  this.props.updateColor(color.hex);
}

clearArt = e => {
  e.preventDefault();
  this.saveableCanvas.clear();
}
undoArt = e => {
  e.preventDefault();
  this.saveableCanvas.undo();
}


  render() {    
    const {artwork, color} = this.props;
    
    return (
      <div className="studio">
        
        <form onSubmit={this.handleSubmit}>
          
        <CompactPicker onChangeComplete={this.onChangeComplete}/><br></br>
          <label>Title:</label>
          <input type="text" name="art-title" id="art-title-input" required />
          
          <CanvasDraw className="saved-canvas" hideGrid={true} lazyRadius={0} brushColor={color} ref={canvasDraw => (this.saveableCanvas = canvasDraw)}/>   
          <toolbar>
            <button type="button" onClick={this.clearArt}>Clear</button>
            <button type="button" onClick={this.undoArt}>Undo</button>
            <button type="submit">Add Artwork</button>
            </toolbar>       
        </form>  
             
        
        <ul>
          {artwork.map((artpiece, index )=> 
          <li key={index}>{artpiece.title}<CanvasDraw className="loaded-canvas" disabled={true} hideGrid={true} immediateLoading={true} saveData={artpiece.artImage}/></li>)}
        </ul>

        
    

      </div>
    );
  }
  
}

export default Studio;
