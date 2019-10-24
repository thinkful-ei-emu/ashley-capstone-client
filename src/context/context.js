import React, { Component } from 'react'
import TokenService from '../services/tokenService'

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
    console.log('user in componenetDidmount', this.state.user)
  }

  checkUser = () => {
    console.log('hasAuth', TokenService.hasAuthToken())
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
    // this.setUser(user);
    this.setUserContext(user); 
    console.log('user in processlogin', this.state.user)
  }

  processLogout = () => {
    TokenService.clearAuthToken()   
    this.setUser({}, ()=>{console.log('user in processlogout',this.state.user)})
   
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
