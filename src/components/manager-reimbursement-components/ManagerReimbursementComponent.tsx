import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { Reimbursement } from '../../models/reimbursement';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core';
import { User } from '../../models/user';
import { getAllReimbursements, resolveReimbursement } from '../../remote/reimbursement-service';

export interface IManagerReimbursementProps {
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

const ManagerReimbursementComponent = (props: IManagerReimbursementProps) => {
    const classes = useStyles();
    const [reimbs, setTableData] = useState([new Reimbursement(0,0,new Date,new Date,'',0,0,0,0)]);
    const [errorMessage, setErrorMessage] = useState('');

    let getTableData = async () => {
        console.log(props.authUser);
        
        let result = await getAllReimbursements();
        setTableData(result);
    }

    const updateRow = async (updatedReimb: Reimbursement) => {
        updatedReimb.resolver_id = props.authUser.ers_user_id;
        // @ts-ignore
        if (updatedReimb.reimb_status_id as string === 'Approved') {
            updatedReimb.reimb_status_id = 2;
        } else {
            updatedReimb.reimb_status_id = 3;
        }
        console.log(updatedReimb);
 
        try {
            await resolveReimbursement(updatedReimb.reimb_id, updatedReimb.resolver_id, updatedReimb.reimb_status_id);
            getTableData();
        } catch (e) {
            setErrorMessage(e.response.data.reason);
        }

        getTableData();
    }

    useEffect(() => {
        getTableData();
    }, []);

    return (
    <>
        <div className={classes.reimbTable}>
            < MaterialTable
            columns = {[
                { title: 'Reimbursement ID', field: 'reimb_id', editable: 'never'},
                { title: 'Amount', field: 'amount', editable: 'never'},
                { title: 'Time Submitted', field: 'submitted', editable: 'never'},
                { title: 'Time Resolved', field: 'resolved', editable: 'never'},
                { title: 'Description', field: 'description', editable: 'never'},
                { title: 'Author', field: 'author_id', editable: 'never'},
                { title: 'Resolver', field: 'resolver_id', editable: 'never'},
                { title: 'Status', field: 'reimb_status_id'},
                { title: 'Type', field: 'reimb_type_id', editable: 'never'},
            ]}
            data = {reimbs}
            title = "All Reimbursements"
            editable = {{
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

export default ManagerReimbursementComponent;