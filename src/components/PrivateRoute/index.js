import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ children, authenticated, user, allowedRoles }) => {

    if (!authenticated) {
        return <Navigate to='/login' replace />;
    }

    if (allowedRoles && user) {
        const temPermissao = allowedRoles.includes(user.role);

        if (!temPermissao) {
            return <Navigate to="/dashboard" replace />;
        }
    }

    return children;
}

const mapStateToProps = ({ session }) => ({
    authenticated: session.authenticated,
    user: session.user
});

export default connect(mapStateToProps)(PrivateRoute);