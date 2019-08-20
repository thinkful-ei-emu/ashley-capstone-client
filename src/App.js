import React from 'react';
import './App.css';
import Studio from './studio/studio';
import { Route } from 'react-router-dom';
import Galleries from './galleries/galleries';
import AddGallery from './addGallery/addGallery';
import ArtworkListPage from './artworkListPage/artwortListPage';
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

class App extends React.Component {
  state = {
    artwork: [],
    galleries: []
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
      artwork: []
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
          '/artpiece/:artpieceId',
          '/gallery/:galleryId'
        ].map(path => (
          <PrivateRoute
            exact
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

        <PublicOnlyRoute
          exact
          path={['/', '/login', '/register']}
          render={routeProps => <NavLanding {...routeProps} />}
        />
      </>
    );
  }
  renderMainRoutes() {
    const { artwork, galleries, currentUser } = this.state;
    return (
      <>
        <>
          <PublicOnlyRoute
            exact
            path={['/', '/login', '/register']}
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

          <>
            <PrivateRoute
              exact
              path="/add-gallery"
              render={routeProps => (
                <AddGallery addGallery={this.addGallery} {...routeProps} />
              )}
            />
          </>
        </>
        <>
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
        </>
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
      </>
    );
  }

  render() {
    return (
      <div className="App">
        <nav className="App_nav" role="navigation">
          {this.renderNavRoutes()}
        </nav>
        <header className="App_header">
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
        </header>
        <main className="App__main">{this.renderMainRoutes()}</main>
      </div>
    );
  }
}

export default App;
