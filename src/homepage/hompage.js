import React from 'react'
import {Link} from 'react-router-dom';


class Homepage extends React.Component {
  
   

  render(){
    return (
      <div>
      <h2>Homepage</h2>
      <Link to="/studio">Studio</Link>
      <Link to="/gallery/:galleryId">Gallery</Link>
      </div>

    )
  }

  
}

export default Homepage;