import React from 'react'
import Artpiece from '../artpiece/artpiece'
import './artworkListPage.css'

class ArtworkListPage extends React.Component {
  

  render(){
    const {artwork} = this.props
        

    return (
      <div className="artwork-page">
       
       <header className="artwork-header">
           <h1>La Galerie d'Art</h1>
           </header> 
        
       <ul className="artwork-list">         
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