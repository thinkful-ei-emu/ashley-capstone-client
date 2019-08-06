
import React from 'react'
import Artpiece from '../artpiece/artpiece'
import CanvasDraw from 'react-canvas-draw'
import '../artpieceMainPage/artpieceMainPage.css'

class ArtpieceMainPage extends React.Component {
 handleRating = e => {
   e.preventDefault();
   const {artpiece} = this.props;
   const ratedArtpiece = {...artpiece, rating: [...artpiece.rating, e.target["rating-select"].value]};
   console.log(ratedArtpiece);
  //  console.log('orig object', artpiece)    
   this.props.updateRating(ratedArtpiece)
   e.target["rating-select"].value = null
 }

  render() {
   const {artpiece, deleteArtpiece} = this.props; 
    

    if (!artpiece) {      
      return <p>loading</p>;
    }
    
    return (
      <section className="artpiece-main">        
        <Artpiece id={artpiece.id} title={artpiece.title} uploaded={artpiece.uploaded} rating={artpiece.rating}  deleteArtpiece={deleteArtpiece} history={this.props.history} />
        <form onSubmit={this.handleRating}>
        <select id="rating-select" name="rating-id">
            <option value={null}>Select a Rating</option>            
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
         <button type="submit" >Rate</button>
        </form>
       
         <div className="image-container">
          <img className="canvas" src={artpiece.artImage} alt="canvas"/>
         
         
          {/* <CanvasDraw className="loaded-canvas" disabled={true} hideGrid={true} immediateLoading={true} saveData={artpiece.artImage}/> */}
        </div>       
      </section>
    );
  }
}

export default ArtpieceMainPage;