import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const BasicRoute = ({ children, authenticated }) => {
    return !authenticated ? children : <Navigate to='/dashboard' />
}

const mapStateToPtops = ({ session }) => ({
    authenticated: session.authenticated
});

export default connect(mapStateToPtops)(BasicRoute);