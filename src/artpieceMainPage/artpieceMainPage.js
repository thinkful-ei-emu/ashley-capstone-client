
import React from 'react'
import Artpiece from '../artpiece/artpiece'
import CanvasDraw from 'react-canvas-draw'

class ArtpieceMainPage extends React.Component {
 

  render() {
   const {artpiece, deleteArtpiece} = this.props; 
   console.log('main page', deleteArtpiece)
 

    if (!artpiece) {      
      return <p>loading</p>;
    }
    console.log('art image string:', artpiece.artImage)

    return (
      <section className="Artpiece-Main">        
        <Artpiece id={artpiece.id} title={artpiece.title} uploaded={artpiece.uploaded} deleteArtpiece={deleteArtpiece} history={this.props.history} />
        <div className="Artpiece-image">
          {/* <img src={`${artpiece.artImage}`} alt="canvas"/> */}
          <CanvasDraw className="loaded-canvas" disabled={true} hideGrid={true} immediateLoading={true} saveData={artpiece.artImage}/>
        </div>       
      </section>
    );
  }
}

export default ArtpieceMainPage;