import React from 'react';
import { Link } from 'react-router-dom';
import '../gallery/gallery.css';
import ArtisteApiService from '../services/artisteApiService'
import { Card, CardHeader, CardContent, IconButton, CardMedia } from '@material-ui/core';
import EmptyFrame from '../media/frame-1455499_1920.png';
import UserContext from '../context/context'

class Gallery extends React.Component {

  static contextType = UserContext;

  handleDelete = e => {
    e.preventDefault();

    if (this.props.artwork.length) {
      this.props.setErrorMessage('You can only delete an empty gallery. Please move or sell all of your artwork before deleting a gallery.')
    }
    else {
      ArtisteApiService.deleteGallery(this.props.id)
        .then(() => {
          this.props.deleteGallery(this.props.id);
          this.props.history.push('/gallery');
          this.context.fetchPrivateGalleries();
        })
        .catch(error => {
          console.error({ error });
        });
    }

    // ArtisteApiService.deleteGallery(this.props.id)
    //   .then(() => {
    //     this.props.deleteGallery(this.props.id);
    //     this.props.history.push('/gallery/:galleryId');
    //   })
    //   .catch(error => {
    //     console.error({ error });
    //   });
  };

  render() {

    return (
      <div className="gallery">

        <Card className="gallery-card">

          <CardHeader title={<Link className="name" to={`/gallery/${this.props.id}`}>{this.props.name}</Link>} subheader={this.props.owner} />

          <CardMedia
            className="artpiece-thumbnail"
            //need to add conditional for if no artwork in gallery
            image={this.props.artwork.length ? this.props.artwork[0].artpieceImage : EmptyFrame}
            title={this.props.artwork.length ? this.props.artwork[0].artpieceTitle : "Image by VictorianLady from Pixabay"} />
          <CardContent className="gallery-content">
            <p className="total-artwork">Artwork: {this.props.artwork.length}</p>

            <IconButton className="fas fa-trash-alt"
              aria-label="delete"
              onClick={this.handleDelete}
            >
            </IconButton>

          </CardContent>

        </Card>
      </div>
    );
  }
}

export default Gallery;
