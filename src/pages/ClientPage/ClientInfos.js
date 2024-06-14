import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import { ThreeDots } from "react-loader-spinner";

import { logoutUser } from "../../services/userService";
import { connect } from "react-redux";

import { getClienteById } from "../../services/clientService";
import { LoadingContainer } from "./ClientPage.styles";

const ClientInfos = ({ user }) => {
    const navigate = useNavigate();
    const { clientId } = useParams();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(true);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        if (loading && user.accessToken) {
            getClienteById(user, clientId, setClient, setLoading);
        }
    }, [user, loading, clientId]);

    return (
        user.isAdmin && (
            <div className="container">
                <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} />
                {
                    loading ? (
                        <LoadingContainer>
                            <ThreeDots
                                color={'#4e4e4e'}
                                height={49}
                                width={100}
                            />
                        </LoadingContainer>
                    ) : (
                        <></>
                    )
                }
                <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
            </div>
        )
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(ClientInfos);