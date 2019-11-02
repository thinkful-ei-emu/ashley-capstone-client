import React, { Component } from 'react'
import TokenService from '../services/tokenService'
import AuthApiService from '../services/authApiService'

const UserContext = React.createContext({
  user: {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
  checkUser: () => {}, 
  processToken : () => {},
})

export default UserContext

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      user: {},    
    }   
   
  }

  componentDidMount() {
    this.checkUser();   
  }

  getUserInfo = () => {
    AuthApiService.getUser()
    .then(user => {    
      this.setState({user: user});
    })
    .catch(error => {
      console.error({ error });
    });
  }

  checkUser = () => { 
    if (TokenService.hasAuthToken()){       
       this.getUserInfo()   
    }
    else {
      this.setState({
        user: {},
      })
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
   this.getUserInfo()    
  }

  processLogout = () => {
    TokenService.clearAuthToken()   
    this.setState({ user: {} })
   
  }

  render() {
    const value = {
      user: this.state.user,     
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      checkUser: this.checkUser,
      processToken: this.processToken,     
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
