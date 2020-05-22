import React, { useEffect, useState } from 'react';
import { User } from '../../models/user';
import { getAllUsers } from '../../remote/user-service';

interface IUserProps{

    authUser: User;
}

const UserComponent = (props: IUserProps) => {
    
    const [usersState, setUsersState] = useState([] as User[]);

    let users: any[] = [];

    useEffect(() => {

        let fetchData = async () => {

            const response = await getAllUsers();
            
            for(let user of response){

                users.push(
                    <>
                    <tr>
                        <td>{user.user_id}</td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.user_role_id}</td>
                        {/* <td><Link to = '/updateuser' onClick = {
                            () => {props.setThisUser(new User(user.id, user.username, user.password, user.firstName, user.lastName, user.email, user.roleId))}    
                        }>Update</Link></td> */}

                        {/* <td><Link to = '/users' onClick = {async () => {
                            await deleteUser(user.id);
                        }}>Delete</Link></td> */}
                    </tr>
                    </>
                )
            }
            setUsersState(users);
        }
        fetchData();
    },);

    return (

        !props.authUser || (props.authUser.role_name !== 'Admin') ?
        <>
            <h1>You're not allowed to see this page.</h1>
        </>
        :
        <>
            <h1>User Component</h1>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {usersState}
                </tbody>

            </table>
        </>
    );
}

export default UserComponent;