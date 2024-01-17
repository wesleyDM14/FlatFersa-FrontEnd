import { connect } from 'react-redux';

const Dashboard = ({ user }) => {
    return (
        <div>
            <h1>Dashboard</h1>
            <h5>Welcome, {user.name}</h5>
        </div>
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(Dashboard);