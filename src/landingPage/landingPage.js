import React from 'react';
import { NavLink } from 'react-router-dom';
import './landingPage.css';
import LandingImage from '../screenshot-drawing-app.png';

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing-page">
        <div>
          <h2>Create your own masterpiece</h2>

          <p>
            L'Artiste allows for you to create your own artwork and display it
            in a gallery of your choice. Just like an artist who runs an
            exhibition, you can create a variety of art pieces that are
            organized by galleries of different themes!
          </p>
        </div>
        <div>
          <h2>Create galleries to display your artwork</h2>

          <p>
            Each time you create your piece of art, you can save it to a gallery
            of your choice. You can view a list of your galleries by navigating
            to your profile page
          </p>
        </div>
        <div className="bottom-section">
          <div className="landing-image-container">
            <img
              className="landing-image"
              src={LandingImage}
              alt="art sample"
            />
          </div>
          <h2>Join the fun!</h2>
          <p>
            You can try out L'Artiste before making an account by logging on to
            our public account:{' '}
          </p>
          <ul className="sample-user">
            <li>Username: Public123</li>
            <li>Password: Password321!</li>
          </ul>
          <NavLink to="/register" className="link-size">
            Register
          </NavLink>
          <h2>Already a member?</h2>
          <NavLink to="/login" className="link-size">
            Login
          </NavLink>
        </div>
      </div>
    );
  }
}

export default LandingPage;
