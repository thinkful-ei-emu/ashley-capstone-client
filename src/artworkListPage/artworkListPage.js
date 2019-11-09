import React from 'react';
import Artpiece from '../artpiece/artpiece';
import './artworkListPage.css';
import ArtisteApiService from '../services/artisteApiService';
import UserContext from '../context/context'

class ArtworkListPage extends React.Component {
  static contextType = UserContext;
  state = {
    privateGalArtwork: {},
  }

  //***issue with rendering artwork for some reason fetchprivateGallery cannot map through privateGalArtwork eventhough I know
  //that privateGalArtwork should be an obj with a artwork property which is an array (issue with fetch call? async where it is mapping before finding the gallery?)
//maybe have checker privateGalArtwork ? then map
  // componentDidMount(){ 
  //   this.context.fetchPrivateGallery(this.props.match.params.galleryId);
  // }
  

  // fetchPrivateGallery = () => {   
  //   ArtisteApiService.getPrivateGallery(this.props.match.params.galleryId)
  //   .then(privateGalArtwork => {
  //     this.setState({ privateGalArtwork});
  //   })
  //   .catch(error => {
  //     console.error({ error });
  //   });
  // }


  render() {    
    const { artwork } = this.props; 
 
    return (
      <div className="artwork-page">
        <h2>La Galerie d'Art</h2>       
        <ul className="artwork-list">          
          {artwork.map(artpiece => (
            <li key={artpiece.artpieceId}>
              <Artpiece
                id={artpiece.artpieceId}
                artist={artpiece.artpieceArtist}
                title={artpiece.artpieceTitle}
                uploaded={artpiece.artpieceUploaded}
                deleteArtpiece={this.props.deleteArtpiece}
                history={this.props.history}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ArtworkListPage;
