import React from 'react'
import {NavLink} from 'react-router-dom'




class LandingPage extends React.Component {
  
  
   
  render(){

    return (
      <div className="landing-page"> 
        {/* <header className="landing-header">
           <h1>L'Artiste</h1>
           </header>   */}
        <section>        
            <h3>Create your own masterpiece</h3>
        
        <p>[<em>placeholder for screenshot of sample art</em>]</p>
        <p>L'Artiste allows for you to create your own artwork and display it in a gallery of your choice. Just like an artist who runs an exhibition, you can create a variety of art pieces that are organized by galleries of different themes!</p>
      </section>
      <section>      
            <h3>Create galleries to display your artwork</h3>      
        <p>[<em>placeholder for screenshot of galleries</em>]</p>
        <p>Each time you create your piece of art, you can save it to a gallery of your choice. You can view a list of your galleries by navigating to your profile page</p>
      </section>
      <section>      
            <h3>Explore and rate the work of your fellow artists</h3>      
        <p>[<em>placeholder for screenshot of interface and rating functionality</em>]</p>
        <p>L'Artiste allows for you to navigate to other users galleries, view their art and even rate their artwork!</p>
      </section>
      
        <h2>Join the fun!</h2>
        <NavLink to="/register">Register</NavLink>  
        <h2>Already a member?</h2>
        <NavLink to="/login">Login</NavLink>       
        </div>
       
        
   

    )
  }
}

export default LandingPage;