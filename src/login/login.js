import React from 'react'
import {NavLink} from 'react-router-dom'
import AuthApiService from '../services/authApiService'




class LandingPage extends React.Component {
  
  state = { error: null }

  
  handleSubmit = e => {
       e.preventDefault()
      this.setState({ error: null })
      const user = {
        
        user_name: e.target["username"].value,
        password: e.target["password"].value,
      }
  
      AuthApiService.postLogin({
      user
     })
       .then(res => {
         e.target["username"].value = ''
          e.target["password"].value = ''          
          this.props.history.push("/gallery")
        })
         .catch(res => {
          this.setState({ error: res.error })
         })
     }
  
   
  render(){

    return (
      <div className="login-page">  
        <section>      
        <form className='login-form' onSubmit={this.handleSubmit}>
            <div>           
         
              <label htmlFor="username">Username</label>
              <input type="text" name='username' id='username' placeholder='e.g. picaso123'/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name='password' id='password' />
            </div>
            <button type='submit'>Login Up</button>
        </form> 
        </section>
              
        </div>          
       
        
   

    )
  }
}

export default LandingPage;