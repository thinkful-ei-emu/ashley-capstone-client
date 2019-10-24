import React from 'react';
import UserContext from '../context/context'
import {Link} from 'react-router-dom';

class MyGalleries extends React.Component {
  static contextType = UserContext;
 
  

  render (){
    const {user} = this.context;

    return (
      <div className="my-galleries">
       <p>This is a collector's galleries with username {user.userName}</p>
      </div>
   )
 
  }
  

}

export default MyGalleries;