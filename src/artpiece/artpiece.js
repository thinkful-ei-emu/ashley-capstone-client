import React from 'react'
import {Link} from 'react-router-dom'
import CanvasDraw from 'react-canvas-draw'
import {format} from 'date-fns'

class Artpiece extends React.Component {
  

  render(){
 console.log(this.props)

    return (
      <div className="artpiece">       
      
       <h2 className='artpiece-title'>      
          <Link to={`/artpiece/${this.props.id}`}>
            {this.props.title}
          </Link>
        </h2>
        <button>
          Remove
        </button>

        <div className='artpiece-uploaded-container'>
          <div className='artpiece-uploaded'>
            Uploaded
            {' '}
            <span className='uploaded'>
            {format(this.props.uploaded, 'MMM, Do, YYYY')}
            </span>
          </div>
        </div>  
        <div className='artpiece-artist-container'>
          <div className='artpiece-artist'>
            Artist
            {' '}
            <span className='artist'>
             {/* add artist(username) */}
            </span>
          </div>
        </div>          
       
        
      </div>

    )
  }
}

export default Artpiece;