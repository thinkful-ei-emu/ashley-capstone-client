import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../services/tokenService'

export default function PrivateCollectorRoute({ render, ...props }) {
  const Render = render
  // const getUserRole = () => {
  //   let userToken = TokenService.readJwtToken();
  //   return userToken.collector;  
  // }
   
  return (
    <Route
      {...props}
     
      render={componentProps => (
        // (TokenService.hasAuthToken() && getUserRole())
        (TokenService.hasAuthToken() && props.collectorStatus)        
          ? <Render {...componentProps} />
          : <Redirect
              to={{
                pathname: '/home',
                state: { from: componentProps.location }
              }}
            />
      )}
    />
  )
}
