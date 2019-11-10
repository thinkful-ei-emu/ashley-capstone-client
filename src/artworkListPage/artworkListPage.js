import React from 'react';
import Artpiece from '../artpiece/artpiece';
import './artworkListPage.css';
import ArtisteApiService from '../services/artisteApiService';
import UserContext from '../context/context'

class ArtworkListPage extends React.Component {
  static contextType = UserContext;
  state = {  
    currentGallery: {},
  }

  //***issue with rendering artwork for some reason fetchprivateGallery cannot map through privateGalArtwork eventhough I know
  //that privateGalArtwork should be an obj with a artwork property which is an array (issue with fetch call? async where it is mapping before finding the gallery?)
//maybe have checker privateGalArtwork ? then map

componentDidMount(){ 
    this.fetchPrivateGallery(); 
  }
  

  fetchPrivateGallery = () => {   
    ArtisteApiService.getPrivateGallery(this.props.galleryId)
    .then(currentGallery => {
      console.log(currentGallery)
      this.setState({currentGallery})
      // this.context.setCurrentGallery(currentGallery)
      
    })
    .catch(error => {
      console.error({ error });
    });
  }


  render() {      
    const { currentGallery} = this.state;  
    return (
      <div className="artwork-page">
          <h2>{currentGallery.galleryName}</h2>       
        {Object.values(currentGallery).length ? <ul className="artwork-list">          
          {currentGallery.artwork.map(artpiece => (
            <li key={artpiece.artpieceId}>
              <Artpiece
                id={artpiece.artpieceId}
                artist={artpiece.artpieceArtist}
                title={artpiece.artpieceTitle}
                uploaded={artpiece.artpieceUploaded}
                image={artpiece.artpieceImage}
                deleteArtpiece={this.props.deleteArtpiece}
                history={this.props.history}
                galleryId={currentGallery.galleryId}
              />
            </li>
          ))}
        </ul> : <p>Loading</p>}
      </div>
    );
  }
}

export default ArtworkListPage;
