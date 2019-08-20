import React from 'react';
import { NavLink } from 'react-router-dom';
import '../gallery/gallery.css';
import { totalArtworkInGallery } from '../artwork-helpers/artwork-helpers';
import ArtisteApiService from '../services/artisteApiService';

class Gallery extends React.Component {
  handleDelete = e => {
    e.preventDefault();

    ArtisteApiService.deleteGallery(this.props.id)
      .then(() => {
        this.props.deleteGallery(this.props.id);
        this.props.history.push('/gallery/:gallerId');
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    return (
      <div className="gallery">
        <div className="gallery-name">
          <div>
            <NavLink className="name" to={`/gallery/${this.props.id}`}>
              {this.props.name}
            </NavLink>
          </div>

          <div className="count">
            Artwork: {totalArtworkInGallery(this.props.artwork, this.props.id)}
          </div>
          <button
            type="button"
            className="delete"
            aria-label="delete"
            onClick={this.handleDelete}
          >
            <i className="fas fa-trash-alt" />
          </button>
        </div>
      </div>
    );
  }
}

export default Gallery;
