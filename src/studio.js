import React from 'react';
import CanvasDraw from 'react-canvas-draw';



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

  // loadArt = e => {
  //   e.preventDefault();
    
  //   console.log(artwork)
 
    
    

  // }


  render() {    
    const {artwork} = this.props;
    
    return (
      <div className="studio">
        <form onSubmit={this.handleSubmit}>
          <label>Create Your Art:</label>
          <input type="text" name="art-title" id="art-title-input" required />
          <CanvasDraw   ref={canvasDraw => (this.saveableCanvas = canvasDraw)}/>   
        <button type="submit">Add Artwork</button>        
        </form> 
       
        {/* <button type="button" onClick={this.loadArt}>Load Artwork</button> */}
        <ul>
          {artwork.map((artpiece, index )=> 
          <li key={index}>{artpiece.title}<CanvasDraw disabled hideGrid immediateLoading saveData={artpiece.artImage}/></li>)}
        </ul>

        
    

      </div>
    );
  }
  
}

export default Studio;
