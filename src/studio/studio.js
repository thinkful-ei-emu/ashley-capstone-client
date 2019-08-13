
import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import {CompactPicker} from 'react-color';
import './studio.css'
import ArtisteApiService from '../services/artisteApiService'






class Studio extends React.Component {  
  
  state = {
    // images: []
    color: '',
    brushSize: 10,
  }
   
  handleSubmit = e => {
    e.preventDefault();
    //userid is temp, should update to get id from users table
    let canvas = document.querySelector("#studio-form canvas:nth-of-type(2)").toDataURL();
    const artpiece = {title: e.target["art-title"].value, gallery_id: e.target["art-gallery-id"].value, artpiece_image: canvas}
    ArtisteApiService.postArtpiece(artpiece)
    .then(artpiece => {
      this.props.addArt(artpiece)
    })
    .catch(error => {
      console.error({error})
    })    
   
    e.target["art-title"].value='';
    e.target["art-gallery-select"].value= null;
    this.saveableCanvas.clear();
  }

  onChangeComplete = (color, event) => {
    console.log(color);
    this.updateColor(color.hex);
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
    
    this.updateBrushSize(parseInt(e.target.value, 10)); 
  
  }
  updateColor = (color) => {
    console.log('updateColor ran')
    this.setState({
      color: color,     
    })   
  }

  updateBrushSize = (brushSize) => {
    this.setState({
      brushSize: brushSize,
    })
  }


  savePNG = e => {
   
    // let artData = document.querySelectorAll("#studio-form canvas").toDataURL()
    let canvases = [...document.querySelectorAll("#studio-form canvas:nth-of-type(2)")]
    
    this.setState({
      images: canvases.map(canvas => canvas.toDataURL())
    })


    // let artData = this.saveableCanvas.getSaveData()
    // console.log('save length:', artData.length)
    // console.log('png length:', png.length)
   
  }
 


  render() {    
    const {color, brushSize} = this.state; 
    const {galleries} = this.props;
    
    
    return (
      <div className="studio">      
        <header className="studio-header">
           <h1>L'Studio</h1>
           </header> 
           <main>
           <form id="studio-form"onSubmit={this.handleSubmit}>
          
            <div className="color-picker-container">
             <CompactPicker  onChangeComplete={this.onChangeComplete}/>         
            </div> 
            <div className="brush-size-container">
              <label className="brush-label"><i className="fas fa-paint-brush"></i></label>
              <input onChange={this.adjustBrushSize} defaultValue={"10"} type="range" name="brush-size" min="1" max="100"></input>
            </div>
          <div className="title-container">
          <label className="title-label">Title:</label>
            <input type="text" name="art-title" id="art-title-input" required />
          </div>
          <div className="gallery-select-container">          
          <label>Save to Gallery:</label><br></br>
            <select id="art-gallery-select" name="art-gallery-id">
            {/* <option name="select-default" value={null}>Select a Gallery</option> */}
            {galleries.map(gallery => (
              <option key={gallery.id} value={gallery.id}>{gallery.name}</option>
            ))}
            </select>
              </div>
          
         
          <CanvasDraw  brushRadius={brushSize} canvasWidth= {750} canvasHeight= {550} className="saved-canvas" hideGrid={true} lazyRadius={12} brushColor={color} ref={canvasDraw => (this.saveableCanvas = canvasDraw)}/>   
                   
          <div>
            <button className="tool-button" type="button" onClick={this.clearArt}>Clear</button>
            <button  className="tool-button" type="button" onClick={this.undoArt}>Undo</button>            
            </div><br></br>
            {/* <button type="button" onClick={this.savePNG}>Save As PNG</button> */}
            <button className="add-button" type="submit">Add Artwork</button>       
        </form> 
             </main>          
        
        {/* <ul>
          {
            this.state.images.map((image, index) => <li key={index}><img src={image}></img></li>)
          }

        </ul> */}


      
      </div>
    );
  }
  
}

export default Studio;
