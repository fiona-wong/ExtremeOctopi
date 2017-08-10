import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Signup from './signup';
import Test from './test';
import Login from './login';
import Profile from './Profile';
import Matches from './matches';
import Messages from './messages';


const Main = () => (
  <main>
    <Switch>
      <Route path='./signup' component={Signup}/>
      <Route path='./test' component={Test}/>
      <Route path='./login' component={Login}/>
      <Route path='./profile' component={Profile}/>
      <Route path='./matches' component={Matches}/>
      <Route path='./messages' component={Messages}/>
    </Switch>
  </main>
)

export default Main
