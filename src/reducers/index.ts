import { User } from "../models/user";
import { combineReducers } from "redux";
import { loginReducer } from "./login-reducer";
import { registerReducer } from "./register-reducer";
import { reimbursementReducer } from "./reimbursement-reducer";
import { logoutReducer } from "./logout-reducer";

export interface ILoginState {
    authUser: User;
    errorMessage: string;
}

export interface IRegisterState {
    errorMessage: string;
}

export interface IReimbursementState {
    errorMessage: string;
}

export interface ILogoutState {
    errorMessage: string;
}

export interface IState {
    login: ILoginState;
    register: IRegisterState;
    reimbursement: IReimbursementState;
    logout: ILogoutState;
}

export const state = combineReducers<IState>({
    login: loginReducer,
    register: registerReducer,
    reimbursement: reimbursementReducer,
    logout: logoutReducer
});