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
  componentDidMount(){ 
    this.context.fetchPrivateGallery(this.props.match.params.galleryId);
  }
  

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
    const { privateGalArtwork } = this.context;
    console.log(privateGalArtwork)
    return (
      <div className="artwork-page">
        <h2>La Galerie d'Art</h2>
        <ul className="artwork-list">
          {privateGalArtwork.artwork.map(artpiece => (
            <li key={artpiece.id}>
              <Artpiece
                id={artpiece.id}
                title={artpiece.title}
                uploaded={artpiece.uploaded}
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
