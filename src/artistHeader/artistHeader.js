import React from 'react';
import './artistHeader.css';
import UserContext from '../context/context'
import {Link} from 'react-router-dom'


class ArtistHeader extends React.Component {

  static contextType = UserContext;

  handleLogoutClick = () => {    
    this.context.processLogout();
    this.props.clearData();
    this.context.clearAllData();      
  }

  render(){
    const {user} = this.context; 
    return (
      <div className= "artist-header">
     <h1><Link to='/home'>L'Artist</Link></h1>
     <nav className = "nav-links">
       <Link to={`/my-studio`}  className='button' >My Studio</Link>
       <Link to='/' onClick={this.handleLogoutClick} className='button'>Logout</Link>
       <div className="button">{user.userName}</div>
     </nav>
     </div>
   )
  }
  

}

export default ArtistHeader;