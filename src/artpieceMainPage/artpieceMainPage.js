import React from 'react';
import Artpiece from '../artpiece/artpiece';
import UserContext from '../context/context'
import { findArtpiece } from '../artwork-helpers/artwork-helpers'

import '../artpieceMainPage/artpieceMainPage.css';

class ArtpieceMainPage extends React.Component {
  static contextType = UserContext;

  render() {
    const { deleteArtpiece } = this.props;
    const {currentGallery} = this.context;
    let currentArtpiece = findArtpiece(currentGallery.artwork, this.props.artpieceId)

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
