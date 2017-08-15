import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<header>
    <nav>
        <Link to='/home'>Home</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to='/signup'>Signup</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to='/login'>Login</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to='/test'>Test</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to='/profile'>Profile</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to='/matches'>Matches</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to='/messages'>Messages</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </nav>
  </header>
)

export default Header

