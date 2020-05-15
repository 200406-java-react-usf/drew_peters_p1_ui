import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import HomeComponent from './components/HomeComponent';
import NavbarComponent from './components/NavbarComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';


import { User } from './models/user';

const mockPosts = [
  {
    id: 1,
    title: 'Post 1 title',
    body: 'Post 1 body'
  },
  {
    id: 2,
    title: 'Post 2 title',
    body: 'Post 2 body'
  },
  {
    id: 3,
    title: 'Post 3 title',
    body: 'Post 3 body'
  },
  {
    id: 4,
    title: 'Post 4 title',
    body: 'Post 4 body'
  },
  {
    id: 5,
    title: 'Post 5 title',
    body: 'Post 5 body'
  },
  {
    id: 6,
    title: 'Post 6 title',
    body: 'Post 6 body'
  }
]


function App() {

  // @ts-ignore
  const [authUser, setAuthUser] = useState(null as User);
  // @ts-ignore
  const [newUser, setNewUser] = useState(null as User);

  return (
    <>
      <Router>

        <AppBar color="primary" position="static">
          <Toolbar>
              <Typography variant="h5" color="inherit">
                <NavbarComponent authUser={authUser}/>
              </Typography>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/home" render={() => <HomeComponent username={authUser?.username} /> } />
          <Route path="/login" render={() => <LoginComponent authUser={authUser} setAuthUser={setAuthUser} /> } />
          <Route path="/register" render={() => <RegisterComponent newUser={newUser} setNewUser={setNewUser} /> } />
        </Switch>
        
      </Router>
    </>
  );
}

export default App;