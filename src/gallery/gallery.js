import React from 'react'
import {NavLink} from 'react-router-dom'
import '../gallery/gallery.css'


class Gallery extends React.Component {
  

  handleDelete = e => {
    e.preventDefault();
    this.props.deleteGallery(this.props.id);
    this.props.history.push("/");

  }

  render(){
 console.log(this.props.deleteArtpiece)

    return (
      <div className="gallery">   
        <div className="gallery-name">
        
          <NavLink className="name" to={`/gallery/${this.props.id}`}>{this.props.name}</NavLink> 
          <button type='button' className='delete' onClick={this.handleDelete}>Remove</button>   
          
  
          </div>    
      
       
        
        </div>          
       
        
   

    )
  }
}

export default Gallery;