import React, { Component } from 'react'
import './notFound.css'

class NotFound extends Component {
  render() {
    return (
      <section className='Not-Found'>
        <h2>404 - Page not found</h2>
        <p>Try going back to your previous page.</p>
      </section>
    );
  }
}

export default NotFound;