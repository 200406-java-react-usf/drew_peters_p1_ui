import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Reimbursement } from '../../models/reimbursement';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';
import { User } from '../../models/user';
import { updateReimbursement, getReimbursementByUsername, sumbitReimbursement } from '../../remote/reimbursement-service';

export interface IUserReimbursementProps {
    authUser: User;
    errorMessage: string;
}

const useStyles = makeStyles({
    reimbTable: {
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 40,
        padding: 20
    },
});

const UserReimbursementComponent = (props: IUserReimbursementProps) => {
    const classes = useStyles();
    const [reimbs, setTableData] = useState([new Reimbursement(0,0,new Date,new Date,'',0,0,0,0)]);
    const [errorMessage, setErrorMessage] = useState('');

    let getTableData = async () => {
        let result = await getReimbursementByUsername(props.authUser.username);
        setTableData(result);
    }

    const updateRow = async (updatedReimb: Reimbursement) => {
        
        console.log(updatedReimb);
        // @ts-ignore
        if (updatedReimb.reimb_type_id as string === 'Lodging') {
            updatedReimb.reimb_type_id = 1;
        } 
        // @ts-ignore
        else if (updatedReimb.reimb_type_id as string === 'Travel') {
            updatedReimb.reimb_type_id = 2;
        }
        // @ts-ignore
        else if (updatedReimb.reimb_type_id as string === 'Food') {
            updatedReimb.reimb_type_id = 3;
        }
        else {
            updatedReimb.reimb_type_id = 4;
        }
        try {
            await updateReimbursement(updatedReimb.reimb_id, updatedReimb.amount, updatedReimb.description, updatedReimb.reimb_type_id);
            getTableData();
        } catch (e) {
            setErrorMessage(e.response.data.reason);
        }
    }

    const addNew = async (newReimb: Reimbursement) =>{
        try{
            await sumbitReimbursement(newReimb.amount, newReimb.description, newReimb.author_id, newReimb.reimb_type_id);
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
        <div className={classes.reimbTable}>
            < MaterialTable
            columns = {[
                { title: 'Reimb ID', field: 'reimb_id', editable: 'never'},
                { title: 'Amount', field: 'amount', editable: 'onUpdate'},
                { title: 'Time Submitted', field: 'submitted'},
                { title: 'Time Resolved', field: 'resolved'},
                { title: 'Description', field: 'description', editable: 'onUpdate'},
                { title: 'Author', field: 'author_id'},
                { title: 'Resolver', field: 'resolver_id'},
                { title: 'Status', field: 'reimb_status_id'},
                { title: 'Type', field: 'reimb_type_id', editable: 'onUpdate'},
            ]}
            data = {reimbs}
            title = 'Your Reimbursements'
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
                })
            }}
            />
            {
                props.errorMessage
                ?
                < Alert severity="error">{props.errorMessage}</Alert>
                :
                <></>
            }
        </div>
    </>
    );
}

export default UserReimbursementComponent;