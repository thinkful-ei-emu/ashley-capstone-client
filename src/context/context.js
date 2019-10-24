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
    this.state = { 
      user: {},    
    }   
   
  }

  componentDidMount() {
    this.checkUser();
  }

  checkUser = () => {
    if (TokenService.getAuthToken()){ 
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

  setUser = user => {
    this.setState({ user: user })
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
      processLogin: this.processLogin,
      processLogout: this.processLogout,
     
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
