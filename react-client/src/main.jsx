import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Signup from './Signup.jsx';
import Test from './test';
import Login from './Login.jsx';
import Profile from './Profile.jsx';
import Matches from './Matches.jsx';
import Messages from './messages';


const Main = () => (
  <main>
    <Switch>
      <Route path='/signup' component={Signup}/>
      <Route path='/test' component={Test}/>
      <Route path='/login' component={Login}/>
      <Route path='/profile' component={Profile}/>
      <Route path='/matches' component={Matches}/>
      <Route path='/messages' component={Messages}/>
    </Switch>
  </main>
)

export default Main
