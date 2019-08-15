
import React from 'react';
import CanvasDraw from 'react-canvas-draw';
import {CompactPicker} from 'react-color';
import './studio.css'
import ArtisteApiService from '../services/artisteApiService'






class Studio extends React.Component {  
  
  state = {    
    color: '',
    brushSize: 10,
    error: null,
  }
   
  handleSubmit = e => {
    e.preventDefault(); 
    this.setState({error: null})  
    let canvas = document.querySelector("#studio-form canvas:nth-of-type(2)").toDataURL();
    const artpiece = {title: e.target["art-title"].value, gallery_id: e.target["art-gallery-id"].value, artpiece_image: canvas}
     if(this.props.galleries.length === 0){      
      this.setState({ error: "Your galleries are empty. Please create a gallery to add your artwork." })
    }
    else{
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
    
  }

  onChangeComplete = (color, event) => {   
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



  render() {    
    const {color, brushSize, error} = this.state; 
    const {galleries} = this.props;
    
    
    return (
      <div className="studio">      
      
           <h1 className="studio-header">L'Studio</h1>
        
           <main>
              <div className="error-message-studio" role='alert'>
          {error && <p id='error-studio-message'>{error}</p>}
          </div>
           <form id="studio-form"onSubmit={this.handleSubmit}>
          <div className="flex-container">
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
          <label className="select-label">Save to Gallery:</label><br></br>
            <select id="art-gallery-select" name="art-gallery-id" >           
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
           
            <button className="add-button" type="submit">Add Artwork</button>       
        </form> 
             </main> 
      </div>
    );
  }
  
}

export default Studio;
