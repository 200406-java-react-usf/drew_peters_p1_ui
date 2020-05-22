import { IState } from "../../reducers";
import { connect } from "react-redux";
import ManagerReimbursementComponent from './ManagerReimbursementComponent'

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: ''
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerReimbursementComponent)