import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import { ThreeDots } from "react-loader-spinner";
import { LoadingContainer } from "./PredioPage.styles";
import { logoutUser } from "../../services/userService";
import { connect } from "react-redux";
import { getPredioById } from "../../services/predioService";

const PredioInfos = ({ user }) => {
    const navigate = useNavigate();
    const { predioId } = useParams();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [predio, setPredio] = useState({});
    const [loading, setLoading] = useState(true);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        if (loading && user.accessToken) {
            getPredioById(user, predioId, setPredio, setLoading);
        }
    }, [user, loading, predioId]);

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

export default connect(mapStateToProps)(PredioInfos);