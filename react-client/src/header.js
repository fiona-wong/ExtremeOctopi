import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<header>
    <nav>
      <ul>
        <li><Link to='./signup'>signup</Link></li>
        <li><Link to='./test'>Test</Link></li>
        <li><Link to='./login'>Login</Link></li>
        <li><Link to='./profile'>Profile</Link></li>
        <li><Link to='./matches'>Matches</Link></li>
        <li><Link to='./messages'>Messages</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header

