import { IState } from "../../reducers";
import { connect } from "react-redux"
import HomeComponent from "./HomeComponent"
import { logoutAction } from '../../actions/logout-action';

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        users: []
    }
}

const mapDispatchToProps = {
    logoutAction
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);

