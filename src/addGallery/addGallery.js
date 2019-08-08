import React from 'react'
import Cuid from 'cuid'
import ApiService from '../services/ApiService';

class AddGallery extends React.Component {
  
  handleSubmit = e => {
    e.preventDefault();
    
    
    const gallery = {name: e.target["gallery-name"].value}
    ApiService.postGallery(gallery)
    .then(gallery => {
      this.props.addGallery(gallery)
    })
    .catch(error => {
      console.error({error})
    })    
    e.target["gallery-name"].value = ""; 


  }
  

  render(){
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <label>
          Gallery Name:
          <input
            type="text"
            name="gallery-name"
            id="gallery-name-input"
            required
          />
        </label>
        <button type="submit">Add Gallery</button>
        </form>
      </div>

    )
  }

  
}

export default AddGallery;