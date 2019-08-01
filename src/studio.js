import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import { EEXIST } from 'constants';


class Studio extends React.Component {  
  
  static defaultProps = {
    loadTimeOffset: 5,
    lazyRadius: 30,
    brushRadius: 12,
    brushColor: "#444",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 400,
    canvasHeight: 400,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false
  };

  handleSubmit = e => {
    e.preventDefault();
    let artString = this.savedCanvas.getSaveData()
    const artpiece = {title: e.target["art-title"].value, artpiece: artString}
    console.log(artpiece);
  }

  saveArt = e => {
    e.preventDefault();
    // localStorage.setItem(
    //   "savedDrawing",
    //   this.saveableCanvas.getSaveData()
    // );
    

    
  }

  render() {
    return (
      <div className="studio">
        <form onSubmit={this.handleSubmit}>
          <label>Create Your Art:</label>
          <input type="text" name="art-title" id="art-title-input" required />
          <CanvasDraw  ref={canvasDraw => (this.savedCanvas = canvasDraw)}/>   
        <button type="submit">Add Artwork</button>
       
        </form>  
           
        {/* <button onClick={this.saveArt}>
            Save
          </button> */}
      </div>
    );
  }
  
}

export default Studio;
