import React, { Component } from 'react';
import Navigation from '../components/Navigation.js';

class Navbar extends Component {

  render() {
    return (
    	<nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            UMU Work In Progress UMU
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-white"><span id="account">{this.props.account}</span></small>
            </li>
            <li><Navigation /></li>
          </ul>
        </nav>
    );
  }
}

export default Navbar;
