import { connect } from 'react-redux';
import { URL_DOMAIN } from './constants/const';
import Login from './Login'
import { ChangeLoginStatus } from './actions';

const mapStateToProps = state => ({
    loginStatus: state.login
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    doSubmit: (values) => {
        console.log(values);
        dispatch(ChangeLoginStatus(true))
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)

