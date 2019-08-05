
import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import {CompactPicker, SwatchesPicker, CirclePicker} from 'react-color';
import './studio.css'
import Cuid from 'cuid'





class Studio extends React.Component {  
  
   
  handleSubmit = e => {
    e.preventDefault();
    let artData = this.saveableCanvas.getSaveData()
    // let png = document.querySelector("#studio-form canvas").toDataURL()
    const artpiece = {id: Cuid(), title: e.target["art-title"].value, gallery_id: e.target["art-gallery-id"].value, uploaded: new Date(), artImage: artData}
    this.props.addArt(artpiece)
    e.target["art-title"].value=""
    this.saveableCanvas.clear()
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

  adjustBrushSize = e => {
    e.preventDefault(); 
    
    this.props.updateBrushSize(parseInt(e.target.value, 10)); 
  
  }

  // savePNG = e => {
   
    
  //   let artData = this.saveableCanvas.getSaveData()
  //   console.log('save length:', artData.length)
  //   console.log('png length:', png.length)
   
  // }


  render() {    
    const {color, brushSize, galleries} = this.props; 
    
    
    return (
      <div className="studio">
        
        <form id="studio-form"onSubmit={this.handleSubmit}>
          <div className="flex-container">
          <div className="color-picker-container">
         <CompactPicker  onChangeComplete={this.onChangeComplete}/>         
           </div> 
           <div className="brush-size-container">
           <label className="brush-label">Brush Size:</label>
           <input onChange={this.adjustBrushSize} defaultValue={"10"} type="range" name="brush-size" min="1" max="100"></input>
             </div>

        <div className="title-container">
        <label className="title-label">Title:</label>
          <input type="text" name="art-title" id="art-title-input" required />
        </div>
        <div className="gallery-select-container">          
        <label>Save to Gallery:</label><br></br>
          <select id="art-gallery-select" name="art-gallery-id">
          <option value={null}>Select a Gallery</option>
          {galleries.map(gallery => (
            <option key={gallery.id} value={gallery.id}>{gallery.name}</option>
          ))}
          </select>
          </div>
          </div>           
         
          <CanvasDraw  brushRadius={brushSize} canvasWidth= {750} canvasHeight= {550} className="saved-canvas" hideGrid={true} lazyRadius={12} brushColor={color} ref={canvasDraw => (this.saveableCanvas = canvasDraw)}/>   
         
          
          <div>
            <button className="tool-button" type="button" onClick={this.clearArt}>Clear</button>
            <button  className="tool-button" type="button" onClick={this.undoArt}>Undo</button>            
            </div><br></br>
            {/* <button type="button" onClick={this.savePNG}>Save As PNG</button> */}
            <button className="add-button" type="submit">Add Artwork</button>       
        </form>  
      

        
    

      </div>
    );
  }
  
}

export default Studio;
