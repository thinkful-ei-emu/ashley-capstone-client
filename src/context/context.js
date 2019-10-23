import React, { Component } from 'react'
import TokenService from '../services/tokenService'

const UserContext = React.createContext({
  user: {},
  setUser: () => {}, 
})

export default UserContext

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = { 
      user: {},    
    }

   
    this.state = state;  
    

    if (TokenService.getAuthToken()){ 
      let userToken = TokenService.readJwtToken();      
      let user = {
        userId: userToken.user_id,
        userName: userToken.sub,
        collector: userToken.collector
      }
      state.user = user; 
    }
    else {
      state.user = {};
    }
       
    
  }

  setUser = user => {
    this.setState({ user })
  } 

  processLogin = response => {
    // const authToken = response.authToken;
    // const user = response.user;
    let userToken = TokenService.readJwtToken();  
    // TokenService.saveAuthToken(authToken)
    let user = {
      userId: userToken.user_id,
      userName: userToken.sub,
      collector: userToken.collector
    }
    this.setUser({user}) 
  }

  processLogout = () => {
    TokenService.clearAuthToken()   
    this.setUser({})
  }

  render() {
    const value = {
      user: this.state.user,
      teacherClass: this.state.teacherClass,    
      setUser: this.setUser,
     
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
