import React from 'react'
import './navLanding.css'
import DuckImage from '../screenshot-duck.png'
import MountainsImage from '../screenshot-mountains.png'
import Bug from '../screenshot-bug.png'

export default function NavLanding (){

  return (
    <div className="nav-landing-page">
    <div className="red-box box"></div>
    <div className="orange-box box"></div>
    <div className="yellow-box box"></div>  
    <div className="sidebar-img-container">     
    <img className="duck sidebar-img" src={DuckImage} alt="duck"></img>
    </div>
    <div className="sidebar-img-container"> 
    <img className="mountain sidebar-img" src={MountainsImage} alt="landscape"></img>
    </div>  
    <div className="sidebar-img-container">    
    <img className="bug sidebar-img" src={Bug} alt="bug"></img>
      </div>
    <div className="green-box box"></div>
    <div className="blue-box box"></div>
    <div className="purple-box box"></div>
    </div>
    
  )

}

