import { authError, authLogin } from "../action/createActions";
import Login from "../components/Login";
import { connect } from "react-redux";

const mapStateToProps = state => {
    return { auth: state.auth, authError: state.authError }
};

const mapDispatchToProps = dispatch => ({
    handleAuthLogin: (loggedIn, user) => {
        dispatch(authLogin(loggedIn, user));
    },
    handleAuthError: (isAuthError, errorMassage) => {
        dispatch(authError(isAuthError, errorMassage));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);