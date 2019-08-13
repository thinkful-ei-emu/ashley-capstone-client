import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../services/tokenService'

export default function PrivateRoute({ render, ...props }) {
  const Render = render
 
  return (
    <Route
      {...props}
     
      render={componentProps => (
        TokenService.hasAuthToken()       
          ? <Render {...componentProps} />
          : <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location }
              }}
            />
      )}
    />
  )
}
