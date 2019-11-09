import React from 'react';
import Artpiece from '../artpiece/artpiece';
import UserContext from '../context/context'
import { findArtpiece } from '../artwork-helpers/artwork-helpers'
import ArtisteApiService from '../services/artisteApiService'

import '../artpieceMainPage/artpieceMainPage.css';

class ArtpieceMainPage extends React.Component {
  static contextType = UserContext;
  state = {
    currentArtpiece: {},
  }

  componentDidMount(){
    console.log('artMain ran')
    this.fetchPrivateGalleryArtwork();
  }

  fetchPrivateGalleryArtwork = () => {   
    console.log(this.props)
    ArtisteApiService.getPrivateGallery(this.props.galleryId)
    .then(currentGallery => {
      let currentArtpiece = currentGallery ? currentGallery.artwork.find(artpiece => artpiece.artpieceId === Number(this.props.artpieceId)) : {}
       this.setState({
        currentArtpiece: currentArtpiece ? currentArtpiece : {},
      })
      // this.context.setCurrentGallery(currentGallery)
      
    })
    .catch(error => {
      console.error({ error });
    });
  }

  render() {
    const { deleteArtpiece } = this.props;
    const {currentArtpiece} = this.state;
    console.log(currentArtpiece)


    if (!currentArtpiece) {
      return <p>loading</p>;
    }

    return (
     
      <section className="artpiece-main">
        {/* <Artpiece
          id={currentArtpiece.artpieceId}
          artist={currentArtpiece.artpieceArtist}
          title={currentArtpiece.artpieceTitle}
          uploaded={currentArtpiece.artpieceUploaded}
          deleteArtpiece={deleteArtpiece}
          history={this.props.history}
        /> */}

        <div className="image-container">
          <img className="canvas" src={currentArtpiece.artpieceImage} alt="canvas" />
        </div>
      </section>
    );
  }
}

export default ArtpieceMainPage;
