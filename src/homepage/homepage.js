import React from 'react'

import PublicGallery from '../publicGallery/publicGallery'





class HomePage extends React.Component { 
 


  render(){
    const {publicGalleries, artwork} = this.props;
    return (    
      <div>
        <ul className="public-gallery-list">        
        {publicGalleries.map(gallery => 
         <li key={gallery.id} className="public-gallery-list-names" >
           <PublicGallery id={gallery.id} 
           name={gallery.name}         
           artwork={artwork}
            history={this.props.history}/>
            </li>
            )} 
       </ul>
     
       </div>  
       
       
        
   

    )
  }
}

export default HomePage;