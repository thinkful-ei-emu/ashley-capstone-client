import React from 'react';
import './register.css';
import AuthApiService from '../services/authApiService';
import { NavLink } from 'react-router-dom';

class Register extends React.Component {
  state = { error: null };

  handleSubmit = e => {
    e.preventDefault();
    e.persist();
    const user = {
      first_name: e.target['first-name'].value,
      last_name: e.target['last-name'].value,
      email: e.target['email'].value,
      user_name: e.target['username'].value,
      password: e.target['password'].value
    };

    this.setState({ error: null });
    AuthApiService.postUser(user)
      .then(user => {
        e.target['first-name'].value = '';
        e.target['last-name'].value = '';
        e.target['email'].value = '';
        e.target['username'].value = '';
        e.target['password'].value = '';
        this.props.history.push('/login');
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  goBack = e => {
    e.preventDefault();
    this.props.history.goBack();
  };

  render() {
    const { error } = this.state;
    return (
      <div id="register" className="register-page">
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <legend>Create Account</legend>
          <div className="error-message" role="alert">
            {error && <p className="red">{error}</p>}
          </div>
          <div className="reg-flex">
            <label className="reg-label" htmlFor="first-name">
              First name:
            </label>
            <input
              type="text"
              name="first-name"
              id="reg-first-name"
              placeholder="e.g. Bob"
            />
          </div>
          <div className="reg-flex">
            <label className="reg-label" htmlFor="last-name">
              Last name:
            </label>
            <input
              type="text"
              name="last-name"
              id="reg-last-name"
              placeholder="e.g. Smith"
            />
          </div>
          <div className="reg-flex">
            <label className="reg-label" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
              name="email"
              id="reg-email"
              placeholder="e.g. bobSmith@gmail.com"
            />
          </div>
          <div className="reg-flex">
            <label className="reg-label" htmlFor="username">
              Username:
            </label>
            <input
              type="text"
              name="username"
              id="reg-username"
              placeholder="e.g. picaso123"
            />
          </div>
          <div className="reg-flex">
            <label className="reg-label" htmlFor="password">
              Password:
            </label>
            <input type="password" name="password" id="reg-password" />
          </div>
          <button className="reg-button" type="submit">
            Sign Up
          </button>
        </form>
        <div className="reg-bottom-container">
          <h2 className="member">
            Already a member?
            <span>
              <NavLink to="/login" className="login-link">
                Login
              </NavLink>
            </span>
          </h2>
          <button
            type="button"
            className="reg-button-back"
            onClick={this.goBack}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
