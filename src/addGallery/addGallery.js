import React from 'react'

class AddGallery extends React.Component {
  
  handleSubmit = e => {
    e.preventDefault();
    
    
    const gallery = {name: e.target["gallery-name"].value}
    this.props.addGallery(gallery)
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