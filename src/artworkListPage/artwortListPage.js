import React from 'react'
import CanvasDraw from 'react-canvas-draw'
import Artpiece from '../artpiece/artpiece'


class ArtworkListPage extends React.Component {
  

  render(){
    const {artwork} = this.props
        

    return (
      <div className="artwork-page">
       
       
        
       <ul>         
          {artwork.map(artpiece => 
          <li key={artpiece.id}> 
          <Artpiece 
          id={artpiece.id} 
          title={artpiece.title} 
          uploaded={artpiece.uploaded}
         
          deleteArtpiece={this.props.deleteArtpiece}
          history={this.props.history}
          />
          </li>)}
        </ul>
    
        
      </div>

    )
  }
}

export default ArtworkListPage;