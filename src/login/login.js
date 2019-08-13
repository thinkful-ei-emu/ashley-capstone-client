import React from 'react'
import AuthApiService from '../services/authApiService'
import './login.css'




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
          this.props.fetchAllData();       
         e.target["username"].value = ''
          e.target["password"].value = ''               
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
        <div className="error-message" role='alert'>
          {error && <p className='red'>{error}</p>}
        </div>
            <div>            
              <label htmlFor="username">Username:</label>
              <input type="text" name='username' id='username' placeholder='e.g. picaso123'/>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
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