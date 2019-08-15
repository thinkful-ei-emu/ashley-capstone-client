import React from 'react'
import './galleries.css'
import Gallery from '../gallery/gallery'
import TokenService from '../services/tokenService'




class Galleries extends React.Component {

  state = {error: null}
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
    if(this.props.galleries.length >= 7){     
      this.setState({ error: "Your galleries are full. Please delete a gallery to add a new one." })
    }
    else{
      this.setState({error: null})
      this.props.history.push("/add-gallery")
    }
    
  }
  
  goToStudio = e => {
    e.preventDefault();
    this.props.history.push("/studio")
  }
  Logout = e => {
    e.preventDefault();
    TokenService.clearAuthToken();
    this.props.clearData();
    this.props.history.push("/login")
  }
  
 
  render(){
    const {error} = this.state;
    const {galleries, artwork} = this.props;
    TokenService.getAuthToken();  
    return (
      <div className="gallery-page">
       <div>
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
        <div className="error-message-gallery" role='alert'>
          {error && <p id='error-message'>{error}</p>}
        </div>
        <div className="buttons-container">
          <div className="top-buttons">
          <button type="button" className="button back" onClick={this.goBack}>Back</button>
          <button type="button" className="button add-gallery" onClick={this.goToAddGallery}>Add Gallery</button>
          <button type="button" className="button studio" onClick={this.goToStudio}>Studio</button>
          </div>
          <div className="logout-container">
          <button type="button" className="button logout"onClick={this.Logout}>Logout</button>        
          </div>     
        
        </div>        
      </div>
      
       
    
        
      </div>

    )
  }
}

export default Galleries;