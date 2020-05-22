import React from 'react';
import { User } from "../../models/user";
// import { Reimbursement } from "../../models/reimbursement";
import { 
    makeStyles,
    Typography,
    InputLabel,
    Input,
    FormControl, 
    Button} from "@material-ui/core";
import { useState } from "react";
import { Alert } from '@material-ui/lab';

interface IReimbursementProps {
    authUser: User;
    errorMessage: string;
    reimbursementAction: (amount: number, description: string, author_id: number, reimb_type_id: number) => void;
}

const useStyles = makeStyles({
    reimbContainer: { 
        display: "flex",
        justifyContent: "center",
        margin: 20,
        marginTop: 20,
        padding: 20
    },
    reimbForm: {
        width: "50%"
    }
});

function ReimbursementComponent(props: IReimbursementProps) {

    const classes = useStyles();

    const [amount, setAmount] = useState('');
    const [description, setDescripton] = useState('');
    const [typeOf, setTypeOf] = useState('');

    let updateFormField = (e: any) => {
        switch (e.currentTarget.id) {
            case 'amount':
                setAmount(e.currentTarget.value);
                break;
            case 'description':
                setDescripton(e.currentTarget.value);
                break;
            case 'typeOf':
                setTypeOf(e.currentTarget.value);
                break;
            default:
                console.warn('Improper binding detected on element.');
        }
    }

    let sumbitReimb = async () => {
        let typeId = 0;
        switch (typeOf) {
            case 'Lodging':
                typeId = 1;
                break;
            case 'Travel':
                typeId = 2;
                break;
            case 'Food':
                typeId = 3;
                break;
            default:
                typeId = 4;
        }
        props.reimbursementAction(+amount, description, props.authUser.ers_user_id, typeId);
    }

    
    return (
        <>
            <div className={classes.reimbContainer}>
                <form className={classes.reimbForm}>
                    < Typography align="center" variant="h4">Create a New Reimbursement Request</Typography>
                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="amount">Amount</InputLabel>
                        < Input
                            onChange={updateFormField}
                            value={amount}
                            id="amount" type="text"
                            placeholder="Enter an amount" />
                    </FormControl>

                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="description">Description</InputLabel>
                        < Input
                            onChange={updateFormField}
                            value={description}
                            id="description" type="text"
                            placeholder="Enter a description for your reimbursement" />
                    </FormControl>

                    < FormControl margin="normal" fullWidth>
                        < InputLabel htmlFor="type">Type of Reimbursement</InputLabel>
                        < Input
                            onChange={updateFormField}
                            value={typeOf}
                            id="typeOf" type="text"
                            placeholder="Lodging, Travel, Food, or Other?" />
                    </FormControl>

                    <br/> <br/>
                    < Button 
                        onClick={sumbitReimb} 
                        variant="contained" color="primary"
                        size = "medium"> Submit
                    </Button>
                    <br/> <br/>
                    {
                        props.errorMessage
                            ?
                        < Alert severity="error">{props.errorMessage}</Alert>
                            :
                        <> </>
                    }

                </form>
            </div>
        </>
    )
}

export default ReimbursementComponent;