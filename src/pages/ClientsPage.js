import { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logoutUser } from '../auth/actions/userActions';

import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ClientsMain from '../components/Clients';

const Clients = ({ user }) => {

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
            <ClientsMain user={user}/>
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} />
        </div>
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps, { logoutUser })(Clients);