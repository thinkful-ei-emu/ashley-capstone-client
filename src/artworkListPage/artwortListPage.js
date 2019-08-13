import React from 'react'
import Artpiece from '../artpiece/artpiece'
import './artworkListPage.css'

class ArtworkListPage extends React.Component {
  

  render(){
    const {artwork, currentUser} = this.props
        console.log(this.props.currentUser)

    return (
      <div className="artwork-page">
            
           <h1>La Galerie d'Art</h1>       
        
       <ul className="artwork-list">         
          {artwork.map(artpiece => 
          <li key={artpiece.id}> 
          <Artpiece 
          id={artpiece.id} 
          title={artpiece.title} 
          uploaded={artpiece.uploaded}
          user_name = {currentUser}         
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