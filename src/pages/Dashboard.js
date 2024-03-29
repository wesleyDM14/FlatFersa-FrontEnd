import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../auth/actions/userActions';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Main from '../components/Main';

const Dashboard = ({ user }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <div className='container'>
            <Navbar openSidebar={openSidebar} />
            <Main />
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} />
        </div>
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);