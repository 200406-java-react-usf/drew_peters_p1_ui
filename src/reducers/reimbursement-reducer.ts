import { IReimbursementState } from ".";
import { AnyAction } from "redux";
import { reimbursementActionTypes } from "../actions/reimbursement-action";

const initialState: IReimbursementState = {
    // @ts-ignore
    authUser: (null as User),
    errorMessage: ''
}

export const reimbursementReducer = (state: IReimbursementState = initialState, action: AnyAction) => {

    switch (action.type) {
        case reimbursementActionTypes.SUCCESSFUL_SUBMIT:
            return {
                ...state,
                authUser: action.payload
            }
        case reimbursementActionTypes.BAD_REQUEST:
        case reimbursementActionTypes.INTERNAL_SERVER_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }
        default:
            return state;
    }
}