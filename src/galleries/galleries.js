import React from 'react'
import './galleries.css'

class Galleries extends React.Component {
  

  render(){
    const {galleries} = this.props

    return (
      <div className="gallery-page">
       
        <ul className="gallery-list">
         {galleries.map((gallery, index) => (<li className="gallery-list-names" key={index}>{gallery.name}</li>))} 
        </ul>
    
        
      </div>

    )
  }
}

export default Galleries;