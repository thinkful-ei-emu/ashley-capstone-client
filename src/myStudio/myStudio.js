import React from 'react';
import UserContext from '../context/context'
import {Link} from 'react-router-dom';

class MyStudio extends React.Component {
  static contextType = UserContext; 

  render (){
    const {user} = this.context;

    return (
      <div className="my-studio">
       <p>This is a artist's studio with username {user.userName}</p>
      </div>
   )
 
  }
  

}

export default MyStudio;