import React from 'react'
import PublicArtpiece from '../publicArtpiece/publicArtpiece'


class PublicArtwork extends React.Component {
  

  render(){
    const {artwork} = this.props
        

    return (
      <div className="public-artwork-page">            
           {/* <h2>La Galerie d'Art</h2>         */}
       <ul className="public-artwork-list">         
          {artwork.map(artpiece => 
          <li key={artpiece.id}> 
          <PublicArtpiece 
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

export default PublicArtwork;