import React from 'react'
import {NavLink} from 'react-router-dom'
import '../gallery/gallery.css'
import {galleryAverageRating, totalArtworkInGallery} from '../artwork-helpers/artwork-helpers'


class Gallery extends React.Component {
  

  handleDelete = e => {
    e.preventDefault();
    this.props.deleteGallery(this.props.id);
    this.props.history.push("/");

  }

  render(){
console.log(this.props.artwork)

    return (
      <div className="gallery">   
        <div className="gallery-name">        
          <NavLink className="name" to={`/gallery/${this.props.id}`}>{this.props.name}</NavLink> 
          {/* <span>{galleryAverageRating(this.props.artwork, this.props.id)}</span> */}
          <span> Artwork: 
          {totalArtworkInGallery(this.props.artwork, this.props.id)}</span>
          <button type='button' className='delete' onClick={this.handleDelete}>Remove</button>   
            
          </div>    
       
        
        </div>          
       
        
   

    )
  }
}

export default Gallery;