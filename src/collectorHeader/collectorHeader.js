import React from 'react';
import './collectorHeader.css';
import UserContext from '../context/context'

class CollectorHeader extends React.Component {
  static contextType = UserContext;

  render (){
    const {user} = this.context;
    console.log(user);
    return (
      <div className= "collector-header">
     <h1>Collector</h1>
     <nav>
       <button>{user.userName}</button>
       <button>Logout</button> 
     </nav>
     </div>
   )
 
  }
  

}

export default CollectorHeader;