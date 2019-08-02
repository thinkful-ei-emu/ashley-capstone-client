import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import { EEXIST } from 'constants';


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

  loadArt = e => {
    e.preventDefault();
    const {artwork} = this.props;
    console.log(artwork)
 
    artwork.map(artpiece => this.loadableCanvas.loadSaveData(artpiece.artImage, true));
    

  }


  render() {
    
   
    return (
      <div className="studio">
        <form onSubmit={this.handleSubmit}>
          <label>Create Your Art:</label>
          <input type="text" name="art-title" id="art-title-input" required />
          <CanvasDraw   ref={canvasDraw => (this.saveableCanvas = canvasDraw)}/>   
        <button type="submit">Add Artwork</button>        
        </form> 
       
        <button type="button" onClick={this.loadArt}>Load Artwork</button>

        <CanvasDraw disabled hideGrid ref={canvasDraw => (this.loadableCanvas = canvasDraw)}/>
        
    

      </div>
    );
  }
  
}

export default Studio;
