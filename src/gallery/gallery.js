import React from 'react';
import { Link } from 'react-router-dom';
import '../gallery/gallery.css';
import ArtisteApiService from '../services/artisteApiService';

class Gallery extends React.Component {
  handleDelete = e => {
    e.preventDefault();

    ArtisteApiService.deleteGallery(this.props.id)
      .then(() => {
        this.props.deleteGallery(this.props.id);
        this.props.history.push('/gallery/:galleryId');
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
            <Link className="name" to={`/gallery/${this.props.id}`}>
              {this.props.name}
            </Link>
          </div>

          <div className="count">
            Artwork: {this.props.artwork.length}
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
