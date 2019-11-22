import React from 'react';
import { Link } from 'react-router-dom';
import '../gallery/gallery.css';
import ArtisteApiService from '../services/artisteApiService'
import { Card, CardHeader, CardContent, IconButton, CardMedia } from '@material-ui/core';
import EmptyFrame from '../media/frame-1455499_1920.png';
import UserContext from '../context/context'
import EditText from 'react-editext'

class Gallery extends React.Component {

  static contextType = UserContext;

  state = {
    isOpen: false,

  }

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

  };

  handleSubmit = e => {
    e.preventDefault();

    const galleryName = { name: e.target['update-gallery-name'].value };
    ArtisteApiService.updateGalleryName(galleryName, this.props.id)
      .then(gallery => {   
        //what is the better solution do another fetch after update like I do here or update state only (refresh will trigger fetchPrivateGalleries instead)
        //to do update state instead: loop thru privateGal array from context, if galId === this.props.id then updateName, then reset state with context function
        this.context.fetchPrivateGalleries();
      })
      .catch(error => {
        console.error({ error });
      });
    e.target['update-gallery-name'].value = '';

  }
  handleRenderForm = () => {
    console.log('edit ran')
    let open = !this.state.isOpen;
    this.setState(this.setState({ isOpen: open }))
  }

  render() {

    return (
      <div className="gallery">

        <Card className="gallery-card">

          <CardHeader
            className="gallery-card-header"
            title={this.state.isOpen ?
              (<form onSubmit={this.handleSubmit}>
                <input type="text" defaultValue={this.props.name} name="update-gallery-name" id="update-gallery-name" required />
                <button type="submit">Update</button>
              </form>) : (<Link className="gallery-name" to={`/gallery/${this.props.id}`}>{this.props.name}</Link>)}
            subheader={this.props.owner}
            action={<IconButton className="fas fa-edit" aria-label="edit" onClick={this.handleRenderForm}></IconButton>} />

          <CardMedia
            className="artpiece-thumbnail"
            image={this.props.artwork.length ? this.props.artwork[0].artpieceImage : EmptyFrame}
            title={this.props.artwork.length ? this.props.artwork[0].artpieceTitle : "Image by VictorianLady from Pixabay"} />
          <CardContent className="gallery-content">
            <p className="total-artwork">Artwork: {this.props.artwork.length}</p>

            <IconButton className="fas fa-trash-alt"
              aria-label="delete"
              onClick={this.handleDelete}            >
            </IconButton>

          </CardContent>

        </Card>
      </div>
    );
  }
}

export default Gallery;
