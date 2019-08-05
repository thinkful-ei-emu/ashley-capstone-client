import React from 'react';
import './App.css';
import Studio from './studio/studio'
import {Route, Link, NavLink} from 'react-router-dom'
import Galleries from './galleries/galleries'
import AddGallery from './addGallery/addGallery';
import ArtworkListPage from './artworkListPage/artwortListPage'
import {addArtworkToGalleries, findArtpiece} from './artwork-helpers/artwork-helpers'
import ArtpieceMainPage from './artpieceMainPage/artpieceMainPage';

class App extends React.Component {
  state = {
    artwork: [],
    color: '',
    brushSize: 10,
    galleries: []
  };

  addArt = (artpiece) => {
    console.log('addart ran')
    this.setState({
      artwork: [...this.state.artwork, artpiece]      
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
      <Route exact key={path} path={path} render={routeProps => (<Galleries galleries={galleries} artwork={artwork} {...routeProps}/>)} />
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
      <Route exact key={path} path={path} render={routeProps => {
        const {galleryId} = routeProps.match.params;
        const artworkToGalleries = addArtworkToGalleries(artwork, galleryId);
        return(
          <ArtworkListPage artwork={artworkToGalleries} {...routeProps}/>

        )        
      } } />
    ))}
      <Route
        path="/artpiece/:artpieceId"
         render={routeProps => {
          const {artpieceId} = routeProps.match.params;
          const artpiece = findArtpiece(artwork, artpieceId);
           return <ArtpieceMainPage {...routeProps} artpiece={artpiece} artpieceId={artpieceId} />;
            }}
                />
    </>
    <Route exact  path="/studio" render={routeProps => <Studio galleries={galleries} updateBrushSize= {this.updateBrushSize} brushSize={brushSize} updateColor={this.updateColor} color={color} addArt={this.addArt} {...routeProps}/>} />
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
