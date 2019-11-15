import React from 'react';
import ArtisteApiService from '../services/artisteApiService';
import './addGallery.css';
import UserContext from '../context/context'

class AddGallery extends React.Component {

  static contextType = UserContext;

  handleSubmit = e => {
    e.preventDefault();

    const gallery = { name: e.target['gallery-name'].value };
    ArtisteApiService.postGallery(gallery)
      .then(gallery => {
        this.props.addGallery(gallery);
        this.props.history.goBack();
        this.context.fetchPrivateGalleries();        
      })
      .catch(error => {
        console.error({ error });
      });
    e.target['gallery-name'].value = '';
  };

  render() {
    return (
      <div>
        <form id="gallery-form" onSubmit={this.handleSubmit}>
          <label className="gallery-label" htmlFor="gallery-name-input">
            Gallery Name:
          </label>
          <br />
          <input
            type="text"
            name="gallery-name"
            id="gallery-name-input"
            required
          />
          <button type="submit">Add Gallery</button>
        </form>
      </div>
    );
  }
}

export default AddGallery;
