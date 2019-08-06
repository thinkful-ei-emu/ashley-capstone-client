import React from 'react';
import './App.css';
import Studio from './studio/studio'
import {Route, Link, NavLink} from 'react-router-dom'
import Galleries from './galleries/galleries'
import AddGallery from './addGallery/addGallery';
import ArtworkListPage from './artworkListPage/artwortListPage'
import {addArtworkToGalleries, findArtpiece, findGallery} from './artwork-helpers/artwork-helpers'
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

  deleteArtpiece = artpieceId => {
    let filteredArtwork = this.state.artwork.filter(artpiece => artpiece.id !== artpieceId);
    this.setState({
      artwork: filteredArtwork
    });
  }

  deleteGallery = galleryId => {
    let filteredGalleries = this.state.galleries.filter(gallery => gallery.id !== galleryId);
    this.setState({
      galleries: filteredGalleries
    });
  }

  updateRating = (ratedArtpiece) => {   
    // let newArtpiece = this.state.artwork.find(artpiece => artpiece.id == artpieceId)
    // newArtpiece.rating = [...newArtpiece.rating, rating]
  
   
    let ratedArtwork= this.state.artwork.map(artpiece => 
     
      artpiece.id === ratedArtpiece.id? artpiece= Object.assign(artpiece, ratedArtpiece) : artpiece
      
     )
    console.log('in update function', ratedArtwork)
    
    this.setState({
      artwork: ratedArtwork 
    });
  }


  

 renderNavRoutes(){
  const {artwork, galleries} = this.state; 
  return (
    <>
    {["/", "/gallery/:galleryId"].map(path => (
      <Route exact key={path} path={path} render={routeProps =>{
        const{galleryId} = routeProps.match.params;        
        return(
          <Galleries galleryId={galleryId}  deleteGallery={this.deleteGallery} galleries={galleries} artwork={artwork} {...routeProps}/>
        )
      } } />
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
          <ArtworkListPage artwork={artworkToGalleries} deleteArtpiece={this.deleteArtpiece} {...routeProps}/>

        )        
      } } />
    ))}
      <Route
        path="/artpiece/:artpieceId"
         render={routeProps => {
          const {artpieceId} = routeProps.match.params;
          const artpiece = findArtpiece(artwork, artpieceId);
           return <ArtpieceMainPage {...routeProps} artpiece={artpiece} updateRating={this.updateRating} deleteArtpiece={this.deleteArtpiece} artpieceId={artpieceId} />;
            }}
                />
    </>
    <Route exact  path="/studio" render={routeProps => <Studio galleries={galleries} updateBrushSize= {this.updateBrushSize} brushSize={brushSize} updateColor={this.updateColor} color={color} addArt={this.addArt} {...routeProps}/>} />
    </>
    
  )
 }
  
  

  

  


  render(){
  //  const {artwork, color, brushSize, galleries} = this.state;   
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
