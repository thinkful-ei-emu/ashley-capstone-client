import React, { Component } from 'react'
import TokenService from '../services/tokenService'
import ArtisteApiService from '../services/artisteApiService'

const UserContext = React.createContext({
  user: {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
  checkUser: () => {}, 
  processToken : () => {},
  privateGalleries: {},
  privateArtwork: {},
})

export default UserContext

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      user: {},
      privateGalleries: {},    
    }   
   
  }

  componentDidMount() {
    this.checkUser();  
    this.fetchPrivateGalleries(); 
  }

  checkUser = () => { 
    if (TokenService.hasAuthToken()){       
      let updateUser = this.processToken();
      this.setState({
        user: updateUser,
      })     
    }
    else {
      this.setState({
        user: {},
      })
    }       
  }
  fetchPrivateGalleries = (privateGalleries = {}) => {
    if (TokenService.hasAuthToken() === false) {
      return { privateGalleries};
    } else {
      ArtisteApiService.getPrivateGalleries()
        .then(privateGalleries => {
          this.setState({ privateGalleries});
        })
        .catch(error => {
          console.error({ error });
        });
    }
  };


  setUser = updateUser => {
    this.setState({ user: updateUser })
  }

  setUserContext = updateUser => {   
    if(TokenService.hasAuthToken() && Object.keys(this.state.user).length === 0){    
     this.setUser(updateUser)
    }   
    else {    
      this.setUser(updateUser)
    }
  }
  
  processToken = () => {
    let userToken = TokenService.readJwtToken();  
    let user = {
      userId: userToken.user_id,
      userName: userToken.sub,
      collector: userToken.collector
    }
    return user;
  }

  processLogin = () => {   
    let user = this.processToken();   
    this.setUser(user);    
  }

  processLogout = () => {
    TokenService.clearAuthToken()   
    this.setUser({})
   
  }

  render() {
    const value = {
      user: this.state.user,     
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      checkUser: this.checkUser,
      processToken: this.processToken, 
      privateGalleries: this.state.privateGalleries,    
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
