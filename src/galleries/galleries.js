import React from 'react'
import './galleries.css'
import {Link} from 'react-router-dom'
import Gallery from '../gallery/gallery'

class Galleries extends React.Component {
  
 
  render(){
    const {galleries, artwork} = this.props

    return (
      <div className="gallery-page">
       
        <ul className="gallery-list">
         {galleries.map(gallery => 
          <li key={gallery.id} className="gallery-list-names" >
            <Gallery  id={gallery.id} 
            name={gallery.name} 
            deleteGallery={this.props.deleteGallery}
            artwork={artwork}
             history={this.props.history}/>
             </li>
             )} 
        </ul>
        <button> <Link to="/add-gallery">Add Gallery</Link></button>
       
    
        
      </div>

    )
  }
}

export default Galleries;