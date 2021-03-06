import React from 'react';
import './galleries.css';
import Gallery from '../gallery/gallery';
import UserContext from '../context/context'
import { Card, CardHeader, CardActionArea } from '@material-ui/core';
//try putting card/cardheader in gallery componenet
class Galleries extends React.Component {
  static contextType = UserContext;
  state = { error: null };
  goBack = e => {
    e.preventDefault();
    if (this.props.location.pathname === '/gallery/:galleryId') {
      this.props.history.push('/gallery/:galleryId');
    } else {
      this.props.history.goBack();
    }
  };

  goToAddGallery = e => {

    this.props.history.push('/add-gallery');
    // e.preventDefault();
    // if (this.props.galleries.length >= 7) {
    //   this.setState({
    //     error:
    //       'Your galleries are full. Please delete a gallery to add a new one.'
    //   });
    // } else {
    //   this.setState({ error: null });
    //   this.props.history.push('/add-gallery');
    // }
  };


  setErrorMessage = errorMessage => {
    this.setState({
      error: errorMessage
    });
  }

  goToStudio = e => {
    e.preventDefault();
    if (this.props.galleries.length === 0) {
      this.setState({
        error: 'You must create a gallery first to display your artwork'
      });
    } else {
      this.setState({ error: null });
      this.props.history.push('/studio');
    }
  };
  Logout = e => {
    e.preventDefault();
    this.context.processLogout();
    this.props.clearData();
    this.props.history.push('/');
  };

  render() {
    const { error } = this.state;
    const { privateGalleries } = this.context;
    return (
      <div className="gallery-page">
        <h1>My Galleries</h1>
        <div className="error-message-gallery" role="alert">
            {error && <p id="error-message">{error}</p>}
          </div>
        <div>
          <ul className="gallery-list">
            {privateGalleries.map(gallery => (

              <li key={gallery.galleryId} className="gallery-list-names">
                <Gallery
                  id={gallery.galleryId}
                  name={gallery.galleryName}
                  deleteGallery={this.props.deleteGallery}
                  artwork={gallery.artwork}
                  owner={gallery.galleryOwner}
                  history={this.props.history}
                  setErrorMessage={this.setErrorMessage}
                />
              </li>


            ))}
          </ul>

         
          {/* <div>
            <button
              type="button"
              className="button add-gallery"
              onClick={this.goToAddGallery}
            >
              Add Gallery
              </button>
          </div> */}



          {/* <div className="buttons-container">
            <div className="top-buttons">
              <button
                type="button"
                className="button back"
                onClick={this.goBack}
              >
                Back
              </button>
              <button
                type="button"
                className="button add-gallery"
                onClick={this.goToAddGallery}
              >
                Add Gallery
              </button>
              <button
                type="button"
                className="button studio"
                onClick={this.goToStudio}
              >
                Studio
              </button>
            </div>
            <div className="logout-container">
              <button
                type="button"
                className="button logout"
                onClick={this.Logout}
              >
                Logout
              </button>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Galleries;
