import React from 'react';
import './App.css';
import Studio from './studio/studio';
import { Route, Switch } from 'react-router-dom';
import Galleries from './galleries/galleries';
import AddGallery from './addGallery/addGallery';
import ArtworkListPage from './artworkListPage/artwortListPage';
import CollectorHeader from './collectorHeader/collectorHeader';
import ArtistHeader from './artistHeader/artistHeader';
import Home from './home/home';
import NavHome from './navHome/navHome'
import NotFound from './notFound/notFound';
import {
  addArtworkToGalleries,
  findArtpiece
} from './artwork-helpers/artwork-helpers';
import ArtpieceMainPage from './artpieceMainPage/artpieceMainPage';
import ArtisteApiService from './services/artisteApiService';
import LandingPage from './landingPage/landingPage';
import Login from './login/login';
import Register from './register/register';
import PrivateRoute from './utils/privateRoute';
import PublicOnlyRoute from './utils/publicOnlyRoute';
import NavLanding from './navLanding/navLanding';
import TokenService from './services/tokenService';
import ScrollToTop from './scrollToTop/scrollToTop';
import UserContext from './context/context';
import LandingHeader from './landingHeader/landingHeader';
import MyGalleries from './myGalleries/myGalleries'
import MyStudio from './myStudio/myStudio'
import PrivateCollectorRoute from './utils/privateCollectorRoute';
import PrivateArtistRoute from './utils/privateArtisteRoute';

class App extends React.Component {

  static contextType = UserContext;

  state = {
    artwork: [],
    galleries: [],
  };

  componentDidMount() {
    this.fetchAllData();
  }


  fetchAllData = (galleries = [], artwork = []) => {
    if (TokenService.hasAuthToken() === false) {
      return { galleries, artwork };
    } else {
      ArtisteApiService.getGalAndArt()
        .then(([galleries, artwork]) => {
          this.setState({ galleries, artwork });
        })
        .catch(error => {
          console.error({ error });
        });
    }
  };

  addArt = artpiece => {
    this.setState({
      artwork: [...this.state.artwork, artpiece]
    });
  };

  clearData = () => {
    this.setState({
      galleries: [],
      artwork: [],
    });
  };

  addGallery = gallery => {
    this.setState({
      galleries: [...this.state.galleries, gallery]
    });
  };

  deleteArtpiece = artpieceId => {
    let filteredArtwork = this.state.artwork.filter(
      artpiece => artpiece.id !== artpieceId
    );
    this.setState({
      artwork: filteredArtwork
    });
  };

  deleteGallery = galleryId => {
    let filteredGalleries = this.state.galleries.filter(
      gallery => gallery.id !== galleryId
    );
    this.setState({
      galleries: filteredGalleries
    });
  };

  renderNavRoutes() {
    const { artwork, galleries } = this.state;
    return (
      <>
        {[
          '/studio',
          '/add-gallery',
          '/artpiece',
          '/gallery',
        ].map(path => (
          <PrivateRoute
            // exact
            key={path}
            path={path}
            render={routeProps => {
              const { galleryId } = routeProps.match.params;
              return (
                <Galleries
                  galleryId={galleryId}
                  clearData={this.clearData}
                  deleteGallery={this.deleteGallery}
                  galleries={galleries}
                  artwork={artwork}
                  {...routeProps}
                />
              );
            }}
          />
        ))}

        <>
          <Route
            exact
            path={['/', '/login', '/register']}
            render={routeProps => <NavLanding {...routeProps} />}
          />
        </>
        <>
          <Route
            exact
            path='/home'
            render={routeProps => <NavHome {...routeProps} />}
          />
        </>
      </>


    );
  }

  renderMainRoutes() {
    const { artwork, galleries, currentUser } = this.state;    
    return (

      <>

        <PublicOnlyRoute
          exact
          path={['/']}
          render={routeProps => {
            return <LandingPage {...routeProps} />;
          }}
        />
        <PublicOnlyRoute
          exact
          path="/login"
          render={routeProps => {
            return <Login {...routeProps} fetchAllData={this.fetchAllData} />;
          }}
        />
        <PublicOnlyRoute
          exact
          path="/register"
          render={routeProps => {
            return <Register {...routeProps} />;
          }}
        />
         <PrivateCollectorRoute
            exact
            path={['/my-galleries']}
            render={routeProps => {
              return <MyGalleries {...routeProps}/>;
            }}
          />
             <PrivateArtistRoute
            exact
            path={['/my-studio']}
            render={routeProps => {
              return <MyStudio {...routeProps} />;
            }}
          />

        <PrivateRoute
          exact
          path="/add-gallery"
          render={routeProps => (
            <ScrollToTop>
              <AddGallery addGallery={this.addGallery} {...routeProps} />
            </ScrollToTop>
          )}
        />
        <PrivateRoute
          exact
          path={['/home']}
          render={routeProps => {
            return <Home {...routeProps} />;
          }}
        />
        {['/gallery/:galleryId'].map(path => (
          <PrivateRoute
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { galleryId } = routeProps.match.params;
              const artworkToGalleries = addArtworkToGalleries(
                artwork,
                galleryId
              );
              return (
                <ArtworkListPage
                  currentUser={currentUser}
                  artwork={artworkToGalleries}
                  deleteArtpiece={this.deleteArtpiece}
                  {...routeProps}
                />
              );
            }}
          />
        ))}
        <Route
          path="/artpiece/:artpieceId"
          render={routeProps => {
            const { artpieceId } = routeProps.match.params;
            const artpiece = findArtpiece(artwork, artpieceId);
            return (
              <ArtpieceMainPage
                {...routeProps}
                artpiece={artpiece}
                deleteArtpiece={this.deleteArtpiece}
                artpieceId={artpieceId}
              />
            );
          }}
        />
        <PrivateRoute
          exact
          path="/studio"
          render={routeProps => (
            <Studio
              galleries={galleries}
              addArt={this.addArt}
              {...routeProps}
            />
          )}
        />

        {/* <Route      
            render={routeProps => {
              return <NotFound {...routeProps} />;
            }}
          /> */}

      </>

    );
  }

  render() {
    const { user } = this.context;
    let header = Object.keys(user).length > 0 ? (user.collector ? <CollectorHeader clearData={this.clearData} /> : <ArtistHeader clearData={this.clearData} />) : <LandingHeader />
    return (
      <div className="App">
        <nav className="App_nav" role="navigation">
          {this.renderNavRoutes()}
        </nav>
        <header className="App_header">
          {header}
        </header>
        <ScrollToTop>
          <main className="App__main">{this.renderMainRoutes()}</main>
        </ScrollToTop>
      </div>
    );
  }
}

export default App;
