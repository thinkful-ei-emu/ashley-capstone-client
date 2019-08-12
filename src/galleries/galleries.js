import React from 'react'
import './galleries.css'
import Gallery from '../gallery/gallery'
import TokenService from '../services/tokenService'
import { tsImportEqualsDeclaration } from '@babel/types';

class Galleries extends React.Component {


  goBack = e => {
    e.preventDefault();
    console.log(this.props.location.pathname)
    if(this.props.location.pathname === "/gallery/:galleryId"){
      this.props.history.push('/gallery/:galleryId')
    }
    else {
      this.props.history.goBack()
    }
   
  }

  goToAddGallery = e => {
    e.preventDefault();
    this.props.history.push("/add-gallery")
  }
  
  goToHomepage = e => {
    e.preventDefault();
    this.props.history.push("/homepage")
  }
  Logout = e => {
    e.preventDefault();
    TokenService.clearAuthToken();
    this.props.history.push("/")
  }
  
 
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
        <div className="buttons-container">
        <button type="button" onClick={this.goBack}>Back</button>
        <button type="button" onClick={this.goToAddGallery}>Add Gallery</button>
        {/* <button type="button" onClick={this.goToHomepage}>Homepage</button><br></br> */}
        <button onClick={this.Logout}>Logout</button> 
        
        </div>
        
      
       
    
        
      </div>

    )
  }
}

export default Galleries;