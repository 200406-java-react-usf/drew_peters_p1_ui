import { IState } from "../../reducers";
import {reimbursementAction} from '../../actions/reimbursement-action';
import { connect } from "react-redux";
import ReimbursementComponent from "./ReimbursementComponent";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.reimbursement.errorMessage
    }
}

const mapDispatchToProps = {
    reimbursementAction
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementComponent);