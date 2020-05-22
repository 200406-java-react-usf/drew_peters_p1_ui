import React from 'react';
import './App.css';
import NavbarComponent from './components/navbar-components/NavbarContainer';
import HomeComponent from './components/home-components/HomeContainer';
import LoginComponent from './components/login-components/LoginContainer';
import RegisterComponent from './components/register-components/RegisterContainer';
import ReimbursementComponent from './components/reimbursement-components/ReimbursementContainer';
import LogoutComponent from './components/logout-components/LogoutComponent'; 
import UserComponent from './components/user-component/UserContainer';
import ManagerReimbursementComponent from './components/manager-reimbursement-components/ManagerReimbursementContainer'
import UserReimbursementComponent from './components/user-reimbursement-components/UserReimbursementContainer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { 
    AppBar,
    Toolbar, 
    Typography} from '@material-ui/core';
import { Provider } from 'react-redux';
import { store } from './Store';

function App() {

    return (
        <>
            < Provider store={store}>
                < Router >
                    < AppBar color="primary" position="static">
                        < Toolbar >
                        < Typography variant="h5" color="inherit"> 
                                < NavbarComponent /> 
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    < Switch >
                        < Route path="/home" render={() => < HomeComponent  />} />
                        < Route path="/login" render={() => < LoginComponent /> } />
                        < Route path="/register" render={() => < RegisterComponent  /> } />  
                        < Route path="/reimbursements" render={() => <ReimbursementComponent />} /> 
                        < Route path="/logout" render={() => <LogoutComponent /> } />
                        < Route path="/users" render={() => <UserComponent /> } /> 
                        < Route path="/manager" render={() => <ManagerReimbursementComponent /> } />
                        < Route path="/userReimbs" render={() => <UserReimbursementComponent /> } />
                    </Switch>
                </Router>
            </Provider>
        </> 
    );
}

export default App;