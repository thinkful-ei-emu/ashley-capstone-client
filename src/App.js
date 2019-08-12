import React from 'react';
import './App.css';
import Studio from './studio/studio'
import {Route, Link, NavLink} from 'react-router-dom'
import Galleries from './galleries/galleries'
import AddGallery from './addGallery/addGallery';
import ArtworkListPage from './artworkListPage/artwortListPage'
import {addArtworkToGalleries, findArtpiece, findGallery} from './artwork-helpers/artwork-helpers'
import ArtpieceMainPage from './artpieceMainPage/artpieceMainPage';
import ArtisteApiService from './services/artisteApiService'
import LandingPage from './landingPage/landingPage'
import Login from './login/login'
import Register from './register/register'
import PrivateRoute from './utils/privateRoute'
import PublicOnlyRoute from './utils/publicOnlyRoute'
import Homepage from './homepage/hompage'

class App extends React.Component {
  state = {
    artwork: [],
    color: '',
    brushSize: 10,
    galleries: [],
    ratings: []
  };

  componentDidMount () {
    ArtisteApiService.getGalAndArt()
    .then(([galleries, artwork]) => {
      this.setState({galleries, artwork});
  })
  .catch(error => {
      console.error({error});
  });
  }

  

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

 
 

 renderNavRoutes(){
  const {artwork, galleries} = this.state; 
  return (
    <>
    {["/studio", "/artpiece/:artpieceId", "/gallery/:galleryId"].map(path => (
      <PrivateRoute exact key={path} path={path} render={routeProps =>{
        const{galleryId} = routeProps.match.params;        
        return(
          <Galleries galleryId={galleryId}  deleteGallery={this.deleteGallery} galleries={galleries} artwork={artwork} {...routeProps}/>
        )
      } } />
    ))}
    <>
    <PrivateRoute exact  path="/add-gallery" render={ routeProps => <AddGallery addGallery={this.addGallery} {...routeProps}/>} />
    </>
    </>
  )
 }

 
 renderMainRoutes(){
  const {artwork, color, brushSize, galleries} = this.state; 
  return (
    <>
    <>
    <PublicOnlyRoute exact  path={["/", "/login", "/register"]} component ={LandingPage}/>   
    <PublicOnlyRoute exact path="/login" component = {Login} />
    <PublicOnlyRoute exact path="/register" component = {Register} />
    <Route exact path = "/homepage" component = {Homepage}/>
   


   
    </>
    <>
    {["/gallery/:galleryId"].map(path => (
      <PrivateRoute exact key={path} path={path} render={routeProps => {
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
           return <ArtpieceMainPage {...routeProps} artpiece={artpiece} deleteArtpiece={this.deleteArtpiece} artpieceId={artpieceId} />;
            }}
                />
    </>
    <PrivateRoute exact  path="/studio" render={routeProps => <Studio galleries={galleries} updateBrushSize= {this.updateBrushSize} brushSize={brushSize} updateColor={this.updateColor} color={color} addArt={this.addArt} {...routeProps}/>} />
    
    </>
    
    
  )
 }
 
  
  

  

  


  render(){
  //  const {artwork, color, brushSize, galleries} = this.state;   
    return (
      <div className="App">
         <nav className="App_nav" role="navigation">
           {this.renderNavRoutes()}           
         
         </nav>
         <header className="App__header">
           <h1>L'Artiste</h1>
           </header>
         <main className="App__main"> {this.renderMainRoutes()}</main>       
    
      </div>
    );
  }
  
  
}

export default App;
