import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<header>
    <nav>
      <ul>
        <li><Link to='/Signup'>Signup</Link></li>
        <li><Link to='/Test'>Test</Link></li>
        <li><Link to='/Login'>Login</Link></li>
        <li><Link to='/Profile'>Profile</Link></li>
        <li><Link to='/Matches'>Matches</Link></li>
        <li><Link to='/Messages'>Messages</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header

