import React from 'react'
import CanvasDraw from 'react-canvas-draw'


class ArtworkMainPage extends React.Component {
  

  render(){
    const {artwork} = this.props

    return (
      <div className="artwork-page">
       
       {/* <CanvasDraw className="loaded-canvas" disabled={true} hideGrid={true} immediateLoading={true} saveData={artpiece.artImage}/> */}
        
       <ul>
          {artwork.map((artpiece, index )=> 
          <li key={index}>{artpiece.title}</li>)}
        </ul>
    
        
      </div>

    )
  }
}

export default ArtworkMainPage;