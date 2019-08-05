import React from 'react';
import './App.css';
import Studio from './studio/studio'
import {Route, Link, NavLink} from 'react-router-dom'
import Galleries from './galleries/galleries'
import AddGallery from './addGallery/addGallery';
import ArtworkMainPage from './artworkMainPage/artworkMainPage'

class App extends React.Component {
  state = {
    artwork: [],
    color: '',
    brushSize: 10,
    galleries: []
  };

  addArt = (artPiece) => {
    console.log('addart ran')
    this.setState({
      artwork: [...this.state.artwork, artPiece]      
    })   
    
  }

  updateColor = (color) => {
    console.log('updateColor ran')
    this.setState({
      color: color,     
    })   
  }

  updateBrushSize = (brushSize) => {
    this.setState({
      brushSize: brushSize,
    })
  }

  addGallery = (gallery) => {
    console.log('addGallery ran')
    this.setState({
      galleries: [...this.state.galleries, gallery]      
    })   
    
  }

 renderNavRoutes(){
  const {artwork, color, brushSize, galleries} = this.state; 
  return (
    <>
    {["/", "/gallery/:galleryId"].map(path => (
      <Route exact key={path} path={path} render={routeProps => (<Galleries galleries={galleries} {...routeProps}/>)} />
    ))}
    </>
  )
 }

 
 renderMainRoutes(){
  const {artwork, color, brushSize, galleries} = this.state; 
  return (
    <>
    <>
    {["/", "/gallery/:galleryId"].map(path => (
      <Route exact key={path} path={path} render={routeProps => (<ArtworkMainPage artwork={artwork} {...routeProps}/>)} />
    ))}
    </>
    <Route exact  path="/studio" render={routeProps => (<Studio  updateBrushSize= {this.updateBrushSize} brushSize={brushSize} updateColor={this.updateColor} color={color} addArt={this.addArt} {...routeProps}/>)} />
    </>
    
  )
 }
  
  

  

  


  render(){
   const {artwork, color, brushSize, galleries} = this.state;   
    return (
      <div className="App">
         <nav className="App_nav" role="navigation">
           {this.renderNavRoutes()}         
          <AddGallery addGallery={this.addGallery}/>
         <Link to="/studio">Studio</Link>         
         </nav>
         <header className="App__header">
           <h1><Link to="/">L'Artiste</Link></h1>
           </header>
         <main className="App__main"> {this.renderMainRoutes()}</main>       
    
      </div>
    );
  }
  
  
}

export default App;
