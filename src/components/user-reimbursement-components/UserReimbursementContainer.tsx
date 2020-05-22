import UserReimbursementComponent from './UserReimbursementComponent';
import { IState } from '../../reducers';
import { connect } from 'react-redux';

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: ''
    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(UserReimbursementComponent)