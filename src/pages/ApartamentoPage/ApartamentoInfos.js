import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import { ThreeDots } from "react-loader-spinner";

import { logoutUser } from "../../services/userService";
import { connect } from "react-redux";
import { LoadingContainer } from "./ApartamentoPage.styles";
import { getApartamentoById } from "../../services/apartamentoService";

const ApartamentoInfos = ({ user }) => {
    const navigate = useNavigate();
    const { apartamentoId } = useParams();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [apartamento, setApartamento] = useState({});
    const [loading, setLoading] = useState(true);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        if (loading && user.accessToken) {
            getApartamentoById(user, apartamentoId, setApartamento, setLoading);
        }
    }, [user, loading, apartamentoId]);

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

export default connect(mapStateToProps)(ApartamentoInfos);