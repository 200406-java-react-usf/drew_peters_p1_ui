import React from 'react';
import { Redirect } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { User } from '../../models/user';
 
interface IHomeProps {
    authUser: User;
    logoutAction: () => void;
    users: User[];
}

function HomeComponent (props: IHomeProps) {    

    let r = (newEmp: User) => {
        if (!newEmp) {
            return (
                <TableRow></TableRow>
            );
        }
        else {
            return (
                <TableRow>
                    <TableCell>{props.authUser.username}</TableCell>
                    <TableCell>{props.authUser.first_name}</TableCell>
                    <TableCell>{props.authUser.last_name}</TableCell>
                    <TableCell>{props.authUser.email}</TableCell>
                    <TableCell>{props.authUser.role_name}</TableCell>
                </TableRow>
            );
        }
    }



    return (
        !props.authUser?.username ?
        < Redirect to="/login" />
        :
        <>
            <h1> 
                Welcome, {props.authUser.first_name}!
                <br/><br/>
                
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >Username</TableCell>
                            <TableCell >First Name</TableCell>
                            <TableCell >Last Name</TableCell>
                            <TableCell >Email</TableCell>
                            <TableCell >Role</TableCell>
                        </TableRow>
                    </TableHead>
                        <TableBody component="tbody">
                            {r(props.authUser)}
                        </TableBody>
                </Table>
                
            </h1>
        </>
    )
}

export default HomeComponent;