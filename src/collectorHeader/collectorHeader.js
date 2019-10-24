import React from 'react';
import './collectorHeader.css';

function CollectorHeader () {
  console.log('collector header')

  return (
     <div className= "collector-header">
    <h1>Collector</h1>
    <nav>
      <button>Profile</button>
      <button>Logout</button> 
    </nav>
    </div>
  )

}

export default CollectorHeader;