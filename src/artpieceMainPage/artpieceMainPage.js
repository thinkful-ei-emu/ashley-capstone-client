
import React from 'react'
import Artpiece from '../artpiece/artpiece'

import '../artpieceMainPage/artpieceMainPage.css'

class ArtpieceMainPage extends React.Component {

  render() {
   const {artpiece, deleteArtpiece} = this.props;     

    if (!artpiece) {      
      return <p>loading</p>;
    }
    
    return (
      <section className="artpiece-main">        
        <Artpiece id={artpiece.id} title={artpiece.title} uploaded={artpiece.uploaded}  deleteArtpiece={deleteArtpiece} history={this.props.history} />
            
         <div className="image-container">
          <img className="canvas" src={artpiece.artpiece_image} alt="canvas"/>       
         
         
        </div>       
      </section>
    );
  }
}

export default ArtpieceMainPage;