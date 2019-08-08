import React from 'react'
import {NavLink} from 'react-router-dom'
import AuthApiService from '../services/authApiService'




class Register extends React.Component {
  
  state = { error: null }

  handleSubmit = e => {
  const user = {
    first_name: e.target["first-name"].value, 
    last_name: e.target["last-name"].value,
    email: e.target["email"].value,
    user_name: e.target["username"].value,
    password: e.target["password"].value,
  }

    this.setState({error: null})
    AuthApiService.postUser(user)
    .then(user => {
      e.target["first-name"].value= "" 
      e.target["last-name"].value= ""
      e.target["email"].value= ""
      e.target["username"].value= ""
      e.target["password"].value= ""
      // this.props.onRegistrationSuccess()
    })
    .catch(res => {      
      this.setState({error: res.error})
    })
  }
  
   
  render(){

    return (
      <div className="register-page">    
      <section>          
        <form className='signup-form' onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="first-name">First name</label>
              <input  type="text" name='first-name' id='first-name' placeholder='e.g. Bob'/>
            </div>
            <div>
              <label htmlFor="last-name">Last name</label>
              <input type="text" name='last-name' id='last-name' placeholder='e.g. Smith' />
            </div>
            <div>
              <label htmlFor="username">Email</label>
              <input type="text" name='email' id='email' placeholder='e.g. bobSmith@gmail.com'/>
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <input type="text" name='username' id='username' placeholder='e.g. picaso123'/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name='password' id='password' />
            </div>
            <button type='submit'>Sign Up</button>
        </form> 
        </section>
               
        </div>          
       
        
   

    )
  }
}

export default Register;