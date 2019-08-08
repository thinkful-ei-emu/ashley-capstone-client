import React from 'react'
import {NavLink} from 'react-router-dom'
import '../gallery/gallery.css'
import {totalArtworkInGallery} from '../artwork-helpers/artwork-helpers'
import ApiService from '../services/ApiService'
import config from '../config'


class Gallery extends React.Component {
  

  handleDelete = e => {
    e.preventDefault();
    
    // ApiService.deleteGallery(this.props.id)
    fetch(`${config.API_ENDPOINT}/galleries/${this.props.id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
     
    })
      .then(res => {
        if (!res.ok){
          console.log('res not okay', res)
          return res.json().then(e => Promise.reject(e))
         
        }    
        console.log('res okay', res)
        return res.json()
      })
      .then(() => {
        console.log(this.props)
         this.props.deleteGallery(this.props.id);
         this.props.history.push("/");
       })
       .catch(error => {
         console.error({error})
       })   
   
     }
   

  
   
  render(){


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