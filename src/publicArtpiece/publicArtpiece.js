import React from 'react'
import {Link} from 'react-router-dom'
import {format} from 'date-fns'

import ArtisteApiService from '../services/artisteApiService'

class PublicArtpiece extends React.Component {
  

  handleDelete = e => {
    e.preventDefault();
    ArtisteApiService.deleteArtpiece(this.props.id)
    .then(() => {
      this.props.deleteArtpiece(this.props.id);
      this.props.history.goBack();
     })
     .catch(error => {
       console.error({error})
     })     

  }

  

  render(){
    return (
      <div className="public-artpiece">       
      
       <h2 className='public-artpiece-title'>      
          <Link to={`/public/artpiece/${this.props.id}`}>
            {this.props.title}
          </Link>
        </h2>
       
        <div className='public-artpiece-uploaded-container'>
          <div className='public-artpiece-uploaded'>
            Uploaded:
            {' '}
            <span className='public-uploaded'>
            {format(this.props.uploaded, 'MMM, Do, YYYY')}
            </span>
          </div>
        </div>  
      
       
        {/* <button className="delete-button" onClick={this.handleDelete}>Remove</button>           */}
        
        
      </div>

    )
  }
}

export default PublicArtpiece;