import NavbarComponent from "./NavbarComponent"
import { connect } from "react-redux";
import { IState } from "../../reducers";
import { logoutAction } from '../../actions/logout-action';

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.logout.errorMessage 
    }
} 

const mapDispatchToProps = {
    logoutAction
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);