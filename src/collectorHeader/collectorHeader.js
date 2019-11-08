import React from 'react';
import './collectorHeader.css';
import UserContext from '../context/context'
import {Link} from 'react-router-dom';

class CollectorHeader extends React.Component {
  static contextType = UserContext;

  handleLogoutClick = () => {    
    this.context.processLogout();
    this.props.clearData();   
  }
  

  render (){
    const {user} = this.context; 
    return (
      <div className= "collector-header">
     <h1><Link to='/home'>L'Artist</Link></h1>
     <nav className = "nav-links">
       <Link to={'/gallery'}  className='button' >My Galleries</Link>
       <Link to='/' onClick={this.handleLogoutClick} className='button'>Logout</Link>
       <div className="button">{user.userName}</div>
     </nav>
     </div>
   )
 
  }
  

}

export default CollectorHeader;