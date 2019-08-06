import React from 'react'
import './galleries.css'
import {NavLink} from 'react-router-dom'
import Gallery from '../gallery/gallery'

class Galleries extends React.Component {
  
 
  render(){
    const {galleries} = this.props

    return (
      <div className="gallery-page">
       
        <ul className="gallery-list">
         {galleries.map(gallery => 
          <li key={gallery.id} className="gallery-list-names" >
            <Gallery  id={gallery.id} 
            name={gallery.name} 
            deleteGallery={this.props.deleteGallery}
             history={this.props.history}/>
             </li>
             )} 
        </ul>
       
    
        
      </div>

    )
  }
}

export default Galleries;