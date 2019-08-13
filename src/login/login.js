import React from 'react'
import {NavLink} from 'react-router-dom'
import AuthApiService from '../services/authApiService'
import TokenService from '../services/tokenService'




class Login extends React.Component {
  
  state = { error: null }

  
  handleSubmit = e => {
       e.preventDefault()
       e.persist();
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
          TokenService.getAuthToken();        
          this.props.history.push("/gallery/:galleryId")
        })
         .catch(res => {
          this.setState({ error: res.error })
         })
     }
  
   
  render(){
    const {error} = this.state
    return (
      <div className="login-page">  
        <section>      
        <form className='login-form' onSubmit={this.handleSubmit}>
        <div role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
            <div>           
         
              <label htmlFor="username">Username</label>
              <input type="text" name='username' id='username' placeholder='e.g. picaso123'/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name='password' id='password' />
            </div>
            <button type='submit'>Login</button>
        </form> 
        </section>
              
        </div>          
       
        
   

    )
  }
}

export default Login;