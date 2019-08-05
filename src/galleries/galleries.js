import React from 'react'
import './galleries.css'
import {NavLink} from 'react-router-dom'

class Galleries extends React.Component {
  

  render(){
    const {galleries} = this.props

    return (
      <div className="gallery-page">
       
        <ul className="gallery-list">
         {galleries.map(gallery => 
          (<li  key={gallery.id}> <NavLink className="gallery-list-names" to={`/gallery/${gallery.id}`}>{gallery.name}</NavLink></li>))} 
        </ul>
    
        
      </div>

    )
  }
}

export default Galleries;