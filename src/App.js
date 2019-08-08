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
import TokenService from './services/tokenService'
import AuthApiService from './services/authApiService'
import IdleService from './services/idleService'
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

  // componentDidMount() {
  //   /*
  //     set the function (callback) to call when a user goes idle
  //     we'll set this to logout a user when they're idle
  //   */
  //   IdleService.setIdleCallback(this.logoutFromIdle)

  //   /* if a user is logged in */
  //   if (TokenService.hasAuthToken()) {
  //     /*
  //       tell the idle service to register event listeners
  //       the event listeners are fired when a user does something, e.g. move their mouse
  //       if the user doesn't trigger one of these event listeners,
  //         the idleCallback (logout) will be invoked
  //     */
  //     IdleService.regiserIdleTimerResets()

  //     /*
  //       Tell the token service to read the JWT, looking at the exp value
  //       and queue a timeout just before the token expires
  //     */
  //     TokenService.queueCallbackBeforeExpiry(() => {
  //       /* the timoue will call this callback just before the token expires */
  //       AuthApiService.postRefreshToken()
  //     })
  //   }
  // }

  // componentWillUnmount() {
  //   /*
  //     when the app unmounts,
  //     stop the event listeners that auto logout (clear the token from storage)
  //   */
  //   IdleService.unRegisterIdleResets()
  //   /*
  //     and remove the refresh endpoint request
  //   */
  //   TokenService.clearCallbackBeforeExpiry()
  // }

  // logoutFromIdle = () => {
  //   /* remove the token from localStorage */
  //   TokenService.clearAuthToken()
  //   /* remove any queued calls to the refresh endpoint */
  //   TokenService.clearCallbackBeforeExpiry()
  //   /* remove the timeouts that auto logout when idle */
  //   IdleService.unRegisterIdleResets()
  //   /*
  //     react won't know the token has been removed from local storage,
  //     so we need to tell React to rerender
  //   */
  //   this.forceUpdate()
  // }

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

  // updateRating = (ratedArtpiece) => {  
   
   
  //   let ratedArtwork= this.state.artwork.map(artpiece =>      
  //     artpiece.id === ratedArtpiece.id? artpiece= Object.assign(artpiece, ratedArtpiece) : artpiece      
  //    )
  //   console.log('in update function', ratedArtwork)
    
  //   this.setState({
  //     artwork: ratedArtwork 
  //   });
  // }


  

 renderNavRoutes(){
  const {artwork, galleries} = this.state; 
  return (
    <>
    {["/studio", "/gallery/:galleryId"].map(path => (
      <Route exact key={path} path={path} render={routeProps =>{
        const{galleryId} = routeProps.match.params;        
        return(
          <Galleries galleryId={galleryId}  deleteGallery={this.deleteGallery} galleries={galleries} artwork={artwork} {...routeProps}/>
        )
      } } />
    ))}
    <>
    <Route exact  path="/add-gallery" render={ routeProps => <AddGallery addGallery={this.addGallery} {...routeProps}/>} />
    </>
    </>
  )
 }

 
 renderMainRoutes(){
  const {artwork, color, brushSize, galleries} = this.state; 
  return (
    <>
    <>
    <Route exact  path={["/", "/login", "/register"]} component ={LandingPage}/>   
    <Route exact path="/login" component = {Login} />
    <Route exact path="/register" component = {Register} />
   
   


   
    </>
    <>
    {["/gallery/:galleryId"].map(path => (
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
           return <ArtpieceMainPage {...routeProps} artpiece={artpiece} deleteArtpiece={this.deleteArtpiece} artpieceId={artpieceId} />;
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
          {/* <AddGallery addGallery={this.addGallery}/> */}
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
