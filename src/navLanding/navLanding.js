import React from 'react';
import './navLanding.css';
import DuckImage from '../screenshot-duck.png';
import MountainsImage from '../screenshot-mountains.png';
import Bug from '../screenshot-bug.png';

export default function NavLanding() {
  return (
    <div className="nav-landing-page">
      <div className="red-box box" />
      <div className="orange-box box" />
      <div className="yellow-box box" />
      <div className="sidebar-img-container">
        <img className="duck sidebar-img" src={DuckImage} alt="duck" />
      </div>
      <div className="sidebar-img-container">
        <img
          className="mountain sidebar-img"
          src={MountainsImage}
          alt="landscape"
        />
      </div>
      <div className="sidebar-img-container">
        <img className="bug sidebar-img" src={Bug} alt="bug" />
      </div>
      <div className="green-box box" />
      <div className="blue-box box" />
      <div className="purple-box box" />
    </div>
  );
}
