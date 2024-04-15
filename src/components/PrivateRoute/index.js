import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ children, authenticated }) => {
    return authenticated ? children : <Navigate to='/login' />
}

const mapStateToPtops = ({ session }) => ({
    authenticated: session.authenticated
});

export default connect(mapStateToPtops)(PrivateRoute);