import { 
    makeStyles,
    Typography,
    InputLabel,
    Input,
    FormControl, 
    Button} from "@material-ui/core";
import React, { useState } from "react";
import { User } from "../../models/user";
import { Alert } from "@material-ui/lab";
import { Redirect } from "react-router-dom";

interface IRegisterProps {
    authUser: User;
    errorMessage: string;
    registerAction: (username: string, password: string, first_name: string, last_name: string, email: string) => void;
}

const useStyles = makeStyles({
    registerContainer: { 
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 20,
        padding: 20
    },
    registerForm: {
        width: "50%"
    }
});
 
function RegisterComponent(props: IRegisterProps) {

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setfirst_name] = useState('');
    const [last_name, setlast_name] = useState('');
    const [email, setEmail] = useState('');

    let updateUsername = (e: any) => {
        setUsername(e.currentTarget.value);
    }

    let updatePassword = (e: any) => {
        setPassword(e.currentTarget.value);
    }

    let updatefirst_name = (e:any) => {
        setfirst_name(e.currentTarget.value);
    }

    let updatelast_name = (e:any) => {
        setlast_name(e.currentTarget.value);
    }

    let updateEmail = (e:any) => {
        setEmail(e.currentTarget.value);
    }

    let makeNewUser = async () => {
        props.registerAction(username, password, first_name, last_name, email);
    }

    return ( 
        props.authUser ?
        < Redirect to="/home" /> 
        :
        <>
            <div className={classes.registerContainer}>
                <form className={classes.registerForm}>
                    < Typography align="center" variant="h4">Register account for Reimbursments</Typography> 
                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="username">Username</InputLabel>
                        < Input
                            onChange={updateUsername}
                            value={username}
                            id="username" type="text"
                            placeholder="Enter a username" />
                    </ FormControl>

                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="password">Password</InputLabel>
                        < Input
                            onChange={updatePassword}
                            value={password}
                            id="password" type="password"
                            placeholder="Enter a password" />
                    </ FormControl>

                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="first_name">First Name</InputLabel>
                        < Input
                            onChange={updatefirst_name}
                            value={first_name}
                            id="first_name" type="text"
                            placeholder="Enter your first name" />
                    </ FormControl>

                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="last_name">Last Name</InputLabel>
                        < Input
                            onChange={updatelast_name}
                            value={last_name}
                            id="last_name" type="text"
                            placeholder="Enter your last name" />
                    </ FormControl>

                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="email">Email</InputLabel>
                        < Input
                            onChange={updateEmail}
                            value={email}
                            id="email" type="text"
                            placeholder="Enter your email" />
                    </ FormControl>
                    <br/> <br/>
                    < Button 
                        onClick={makeNewUser} 
                        variant="contained" color="primary"
                        size = "medium"> Register
                    </Button>
                    <br/><br/>
                    {
                        props.errorMessage 
                            ? 
                        <Alert severity="error">{props.errorMessage}</Alert>
                            :
                        <></>
                    }

                </form>
            </div>
        </>
    )
}

export default RegisterComponent;