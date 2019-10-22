import React from 'react'


function ArtistHeader () {
  console.log('artist header')
  return ( 
    <>  
    <h1 className="parent-header">
    <span>
      <i className="fas fa-palette" />
    </span>
    <span className="red letter">L</span>
    <span className="orange letter">'</span>
    <span className="yellow letter">A</span>
    <span className="green letter">r</span>
    <span className="blue letter">t</span>
    <span className="purple letter">i</span>
    <span className="red letter">s</span>
    <span className="orange letter">t</span>
    <span className="yellow letter">e</span>
  </h1>
   <p>artist</p>
   </>
  )

}

export default ArtistHeader;