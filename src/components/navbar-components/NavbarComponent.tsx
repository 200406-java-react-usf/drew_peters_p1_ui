import React from 'react';
import { makeStyles, List, ListItem, Typography, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { User } from '../../models/user';
// import { logout } from '../../remote/user-service';

interface INavbarProps {
    authUser: User;
    errorMessage: string;
    logoutAction: () => void;
}

const useStyles = makeStyles({
    link: {
        textDecoration: "none",
        color: "white"
    },
    logout: {
        background: 'white',
        border: 2,
        borderRadius: 5,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        height: 48,
        padding: '10px 30px',
        marginLeft: 0
    }
});

function NavbarComponent (props: INavbarProps)  { 

    const classes = useStyles();

    let userLogout = async () => {
        props.logoutAction();
        localStorage.clear();
    }

    return(
        <>
            <List component="nav">
                <ListItem component="div">
                    <Typography color="inherit" variant="h5">ERS Portal</Typography>
                    {
                        props.authUser
                        ?
                        <>
                            <ListItemText inset>
                                <Typography color="inherit" variant="h6">
                                    <Link to="/home" className={classes.link}>Home</Link>
                                </Typography>
                            </ListItemText>
                        {
                            (props.authUser.role_name === 'Employee') 
                            ?
                            <>
                                <ListItemText inset>
                                    <Typography color="inherit" variant="h6">
                                        <Link to="/reimbursements" className={classes.link}>Submit Reimbursement</Link>
                                    </Typography>
                                </ListItemText>

                                <ListItemText inset>
                                    <Typography color="inherit" variant="h6">
                                        <Link to="/userReimbs" className={classes.link}>View Your Reimbursements</Link>
                                    </Typography>
                                </ListItemText>
                            </>
                            :
                            <></>
                        }

                        {
                            (props.authUser.role_name === 'Admin') 
                            ?
                            <>
                                <ListItemText inset>
                                    <Typography color="inherit" variant="h6">
                                        <Link to="/users" className={classes.link}>View All Users</Link>
                                    </Typography>
                                </ListItemText>

                                <ListItemText inset>
                                    <Typography color="inherit" variant="h6">
                                        <Link to="/register" className={classes.link}>Register a New User</Link>
                                    </Typography>
                                </ListItemText>
                            </>
                            :
                            <></>
                        }
                        {
                            (props.authUser.role_name === 'Manager')
                            ?
                            <>
                                <ListItemText inset>
                                    <Typography color="inherit" variant="h6">
                                        <Link to="/manager" className={classes.link}>View All Reimbursments</Link>
                                    </Typography>
                                </ListItemText>
                            </>
                            :
                            <></>
                        }

                            <ListItemText inset>
                                <Typography color="inherit" variant="h6">
                                    <span className={classes.link}>{props.authUser.username}</span>
                                </Typography>
                             </ListItemText>

                             
                            <ListItemText inset>
                                <Typography color="secondary" variant="h6">
                                    <Link to="/logout" className={classes.logout} onClick={userLogout}>Logout</Link>
                                </Typography>
                            </ListItemText>
                        </>
                        :
                        <>
                        </>
                    }
                    

                    {
                        !props.authUser
                        ?
                        <>
                        <ListItemText inset>
                            <Typography color="inherit" variant="h6">
                                <Link to="/login" className={classes.link}>Login</Link>
                            </Typography>
                        </ListItemText>
                        </> 
                        :
                        <>
                        </>
                    }

                </ListItem>
            </List>
        </>
    )
}

export default NavbarComponent;