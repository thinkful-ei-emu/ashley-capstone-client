import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../services/tokenService'

export default function PublicOnlyRoute({ render, ...props }) {
  const Render = render
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Redirect to={'/'} />
          : <Render {...componentProps} />
      )}
    />
  )
}
