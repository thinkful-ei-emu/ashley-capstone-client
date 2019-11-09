import React from 'react';
import './galleries.css';
import Gallery from '../gallery/gallery';
import UserContext from '../context/context'

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
    e.preventDefault();
    if (this.props.galleries.length >= 7) {
      this.setState({
        error:
          'Your galleries are full. Please delete a gallery to add a new one.'
      });
    } else {
      this.setState({ error: null });
      this.props.history.push('/add-gallery');
    }
  };

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
    // const { galleries, artwork } = this.props;
     const {privateGalleries} = this.context;   
    return (
      <div className="gallery-page">
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
                />
              </li>
            ))}
          </ul>
          <div className="error-message-gallery" role="alert">
            {error && <p id="error-message">{error}</p>}
          </div>
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
