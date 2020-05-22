import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { getAllUsers, update, deleteUserById, register } from '../../remote/user-service';
import { User } from '../../models/user';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';

export interface IUserProps {
    authUser: User;
    errorMessage: string;
}

const useStyles = makeStyles({
    userTable: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
});

const UserComponent = (props: IUserProps) => {

    const classes = useStyles();
    const [users, setTableData] = useState([new User(0,'','','','','','')]);
    const [errorMessage, setErrorMessage] = useState('');

    let getTableData = async () => {
        let result = await getAllUsers();
        setTableData(result);
    }

    const updateRow = async (updatedUser: User) => {
        try {
            await update(updatedUser);
            getTableData();
        } catch (e) {
            setErrorMessage(e.response.data.reason);
        }
    }
    
    const deleteRow = async (userToBeDeleted: User) =>{
        try{
            await deleteUserById(userToBeDeleted);
            getTableData();
        }catch(e){
            setErrorMessage(e.response.data.reason)
        }
    }

    const addNew = async (newUser: User) =>{
        try{
            await register(newUser.username, newUser.password, newUser.first_name, newUser.last_name, newUser.email);
            getTableData();
        }catch(e){
            setErrorMessage(e.response.data.reason)
        }
    }

    useEffect(() => {
        getTableData();
    }, []);

  return (
    <>
        <div className={classes.userTable}>
            < MaterialTable
            columns = {[
                { title: 'User ID', field: 'ers_user_id', editable: 'never'},
                { title: 'First Name', field: 'first_name', editable: 'onAdd' },
                { title: 'Last Name', field: 'last_name', editable: 'onAdd' },
                { title: 'Username', field: 'username', editable: 'always'},
                { title: 'Email', field: 'email'},
                { title: 'Role', field: 'role_name'},
            ]}
            data = {users}
            title = "All System Users"
            editable = {{
                onRowAdd: newData => 
                new Promise((resolve, reject) => {
                    addNew(newData);
                    resolve();
                }),
                onRowUpdate: (newData, oldData) => 
                new Promise((resolve, reject) => {
                    resolve();
                    updateRow(newData);
                }),
                onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    deleteRow(oldData)
                })
            }}
            />
            {
                (props.errorMessage)
                ?
                < Alert severity="error">{props.errorMessage}</Alert>
                :
                <></>
            }
        </div>
    </>
  );
}

export default UserComponent;