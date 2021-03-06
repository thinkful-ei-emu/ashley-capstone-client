import React from 'react';
import AuthApiService from '../services/authApiService';
import './login.css';
import UserContext from '../context/context'

class Login extends React.Component {
  static contextType = UserContext;
  state = { error: null };
  

  handleSubmit = e => {
    e.preventDefault();
    e.persist();
    this.setState({ error: null }); 
    const user = {
      user_name: e.target['username'].value,
      password: e.target['password'].value,      
    };

    AuthApiService.postLogin({
      user
    })
      .then(res => {
        this.props.fetchAllData();  
        e.target['username'].value = '';
        e.target['password'].value = '';    
        this.context.processLogin();      
        this.props.history.push('/home');
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
      <div id="login" className="login-page">
        <form className="login-form" onSubmit={this.handleSubmit}>
          <legend>Sign In</legend>
          <div className="error-message" role="alert">
            {error && <p className="red">{error}</p>}
          </div>
          <div className="login-flex">
            <label className="login-user" htmlFor="username">
              Username:
              </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="e.g. picaso123"
            />
          </div>
          <div className="login-flex">
            <label className="login-password" htmlFor="password">
              Password:
              </label>
            <input type="password" name="password" id="password" />         
          </div>
          <button className="login-button" type="submit">
            Login
            </button>
          <br />
          <button
            type="button"
            className="login-button-back"
            onClick={this.goBack}
          >
            Back
            </button>
        </form>
      </div>
    );
  }
}

export default Login;
