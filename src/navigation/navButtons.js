import React from 'react'


import TokenService from '../services/tokenService'




class NavButtons extends React.Component {

  state = {error: null}
  goBack = e => {
    e.preventDefault();
    console.log(this.props.location.pathname)
    this.props.history.goBack()
    // if(this.props.location.pathname === "/gallery/:galleryId"){
    //   this.props.history.push('/gallery/:galleryId')
    // }
    // else {
    //   this.props.history.goBack()
    // }   
  }

  goToProfile = e => {
    e.preventDefault(); 
      this.props.history.push("/gallery/:galleryId")
  }

  Logout = e => {
    e.preventDefault();
    TokenService.clearAuthToken();
    this.props.clearData();
    this.props.history.push("/login")
  }
  
 
  render(){
    const {error} = this.state;

     
    return (
      <div className="nav-page">
       <div>
     
        <div className="error-message-nav" role='alert'>
          {error && <p id='nav-error-message'>{error}</p>}
        </div>
        <div className="nav-buttons-container">
          <div className="nav-top-buttons">
          <button type="button" className="button back" onClick={this.goBack}>Back</button>
    
          <button type="button" className="button profile" onClick={this.goToProfile}>Profile</button>
          </div>
          <div className="logout-container">
          <button type="button" className="button logout"onClick={this.Logout}>Logout</button>        
          </div>     
        
        </div>        
      </div>
      
       
    
        
      </div>

    )
  }
}

export default NavButtons;