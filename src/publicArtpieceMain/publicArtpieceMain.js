
import React from 'react'
import PublicArtpiece from '../publicArtpiece/publicArtpiece'



class PublicArtpieceMain extends React.Component {

  render() {
   const {artpiece, deleteArtpiece} = this.props;     

    if (!artpiece) {      
      return <p>loading</p>;
    }
    
    return (
      <section className="public-artpiece-main">        
        <PublicArtpiece id={artpiece.id} title={artpiece.title} uploaded={artpiece.uploaded}  deleteArtpiece={deleteArtpiece} history={this.props.history} />
            
         <div className="public-image-container">
          <img className="public-canvas" src={artpiece.artpiece_image} alt="canvas"/>       
         
         
        </div>       
      </section>
    );
  }
}

export default PublicArtpieceMain;