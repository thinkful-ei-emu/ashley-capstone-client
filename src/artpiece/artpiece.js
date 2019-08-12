import React from 'react'
import {Link} from 'react-router-dom'
import {format} from 'date-fns'
import './artpiece.css'
import {artpieceAverageRating} from '../artwork-helpers/artwork-helpers'
import ArtisteApiService from '../services/artisteApiService'

class Artpiece extends React.Component {
  

  handleDelete = e => {
    e.preventDefault();
    ArtisteApiService.deleteArtpiece(this.props.id)
    .then(() => {
      this.props.deleteArtpiece(this.props.id);
      this.props.history.push("/");
     })
     .catch(error => {
       console.error({error})
     })     

  }

  

  render(){
    return (
      <div className="artpiece">       
      
       <h2 className='artpiece-title'>      
          <Link to={`/artpiece/${this.props.id}`}>
            {this.props.title}
          </Link>
        </h2>
       
        <div className='artpiece-uploaded-container'>
          <div className='artpiece-uploaded'>
            Uploaded
            {' '}
            <span className='uploaded'>
            {format(this.props.uploaded, 'MMM, Do, YYYY')}
            </span>
          </div>
        </div>  
        <button className="delete-button" onClick={this.handleDelete}>Remove</button>
        {/* <div className='artpiece-artist-container'>
          <div className='artpiece-artist'>
            Placeholder: ArtistName(username)
            {' '}
            <span className='artist'>
             add artist(username)
            </span>
          </div>
        </div>           */}
        {/* <div className='artpiece-rating-container'>
          <div className='artpiece-rating'>
            Rating: 
            {' '}
            <span className='rating-val'>
            {artpieceAverageRating(this.props.rating)}            
            </span>          
          </div>
          <div className='artpiece-reviews'>
          <span className='review-total'>
            Reviews:
            {' '}
             {this.props.rating.length > 0 ? this.props.rating.length : 0}
            </span>
          </div>
        </div>  */}
        
      </div>

    )
  }
}

export default Artpiece;