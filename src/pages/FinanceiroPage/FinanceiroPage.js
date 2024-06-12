import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

import {
    MainFinanceiroContainer,
    HeaderFinanceiroContainer,
    HeaderTitle,
    ContentFinanceiroContainer,
    ContentFinanceiroHeader,
    FinanceiroCounter,
    NoContentContainer,
    NoContentAvisoContainer,
    TextContent,
    LoadingContainer,
    CardsContainer,
    Card,
    CardTitle,
    CardIconContainer,
    CardsContainerAdmin,
} from './FinanceiroPage.styles';

import { logoutUser } from '../../services/userService';
import { ThreeDots } from "react-loader-spinner";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { getParcelas } from "../../services/financeiroService";
import ParcelaList from "./ParcelaList";
import { FaCheck, FaCoins, FaHourglassHalf, FaSearch, FaTimes } from "react-icons/fa";

const FianceiroPage = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [parcelas, setParcelas] = useState([]);
    const [parcelasInfo, setParcelasInfo] = useState([]);

    const [pendentes, setPendentes] = useState(false);
    const [pagos, setPagos] = useState(false);
    const [atrasados, setAtrasados] = useState(false);
    const [aguardando, setAguardando] = useState(false);
    const [total, setTotal] = useState(false);

    const [parcelasPendentes, setParcelasPendentes] = useState([]);
    const [parcelasPagos, setParcelasPagos] = useState([]);
    const [parcelasAtrasados, setParcelasAtrasados] = useState([]);
    const [parcelasAguardando, setParcelasAguardando] = useState([]);


    const [loading, setLoading] = useState(true);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        async function teste() {
            if (loading) {
                user.accessToken && await getParcelas(user, setParcelas, setLoading, setParcelasAtrasados, setParcelasPagos, setParcelasPendentes, setParcelasInfo, setParcelasAguardando);
            }
        }
        teste();
    }, [user, loading]);

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} financeiroActive={true} />
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
                    <MainFinanceiroContainer>
                        {
                            user.isAdmin ? (
                                <div>
                                    <HeaderFinanceiroContainer>
                                        <HeaderTitle>Parcelas de Aluguel</HeaderTitle>
                                        <CardsContainerAdmin>
                                            <Card
                                                onClick={() => {
                                                    setAtrasados(false);
                                                    setPagos(!pagos);
                                                    setPendentes(false);
                                                    setTotal(false);
                                                    setAguardando(false);
                                                }}

                                                className={pagos && 'active'}
                                            >
                                                <CardTitle>Pagos</CardTitle>
                                                <CardIconContainer>
                                                    <FaCheck />
                                                    <FinanceiroCounter>Alugueis Pagos ({parcelasPagos.length})</FinanceiroCounter>
                                                </CardIconContainer>
                                            </Card>
                                            <Card
                                                onClick={() => {
                                                    setAtrasados(false);
                                                    setPagos(false);
                                                    setPendentes(!pendentes);
                                                    setTotal(false);
                                                    setAguardando(false);
                                                }}

                                                className={pendentes && 'active'}
                                            >
                                                <CardTitle>Pendentes</CardTitle>
                                                <CardIconContainer>
                                                    <FaHourglassHalf />
                                                    <FinanceiroCounter>Alugueis Pendente ({parcelasPendentes.length})</FinanceiroCounter>
                                                </CardIconContainer>
                                            </Card>
                                            <Card
                                                onClick={() => {
                                                    setAtrasados(!atrasados);
                                                    setPagos(false);
                                                    setPendentes(false);
                                                    setTotal(false);
                                                    setAguardando(false);
                                                }}

                                                className={atrasados && 'active'}
                                            >
                                                <CardTitle>Atrasados</CardTitle>
                                                <CardIconContainer>
                                                    <FaTimes />
                                                    <FinanceiroCounter>Alugueis Atrasados ({parcelasAtrasados.length})</FinanceiroCounter>
                                                </CardIconContainer>
                                            </Card>
                                            <Card
                                                onClick={() => {
                                                    setAtrasados(false);
                                                    setPagos(false);
                                                    setPendentes(false);
                                                    setTotal(false);
                                                    setAguardando(!aguardando);
                                                }}

                                                className={aguardando && 'active'}
                                            >
                                                <CardTitle>Aguardando</CardTitle>
                                                <CardIconContainer>
                                                    <FaSearch />
                                                    <FinanceiroCounter>Alugueis Aguardando ({parcelasAguardando.length})</FinanceiroCounter>
                                                </CardIconContainer>
                                            </Card>
                                            <Card
                                                onClick={() => {
                                                    setAtrasados(false);
                                                    setPagos(false);
                                                    setPendentes(false);
                                                    setTotal(!total);
                                                    setAguardando(false);
                                                }}

                                                className={total && 'active'}
                                            >
                                                <CardTitle>Total</CardTitle>
                                                <CardIconContainer>
                                                    <FaCoins />
                                                    <FinanceiroCounter>Alugueis Total ({parcelas.length})</FinanceiroCounter>
                                                </CardIconContainer>
                                            </Card>
                                        </CardsContainerAdmin>
                                    </HeaderFinanceiroContainer>
                                    <ContentFinanceiroContainer>
                                        {
                                            parcelas.length === 0 ? (
                                                <NoContentContainer>
                                                    <FaMoneyBill1Wave color='#6c757d' fontSize={150} className='icon-responsive' />
                                                    <NoContentAvisoContainer>
                                                        <TextContent>Nenhuma parcela encontrada.</TextContent>
                                                    </NoContentAvisoContainer>
                                                </NoContentContainer>
                                            ) : (

                                                pagos ? (
                                                    <ParcelaList parcelas={parcelasPagos} user={user} navigate={navigate} setLoading={setLoading} />
                                                ) :
                                                    atrasados ? (
                                                        <ParcelaList parcelas={parcelasAtrasados} user={user} navigate={navigate} setLoading={setLoading} />
                                                    ) :
                                                        pendentes ? (
                                                            <ParcelaList parcelas={parcelasPendentes} user={user} navigate={navigate} setLoading={setLoading} />
                                                        ) :
                                                            total ? (
                                                                <ParcelaList parcelas={parcelasInfo} user={user} navigate={navigate} setLoading={setLoading} />
                                                            ) :
                                                                aguardando ? (
                                                                    <ParcelaList parcelas={parcelasAguardando} user={user} navigate={navigate} setLoading={setLoading} />
                                                                ) : (
                                                                    <></>
                                                                )
                                            )
                                        }
                                    </ContentFinanceiroContainer>
                                </div>
                            ) : (
                                <>
                                    <HeaderFinanceiroContainer>
                                        <HeaderTitle>Parcelas de Aluguel</HeaderTitle>
                                        <CardsContainer>
                                            <Card
                                                onClick={() => {
                                                    setAtrasados(false);
                                                    setPagos(!pagos);
                                                    setPendentes(false);
                                                    setTotal(false);
                                                }}

                                                className={pagos && 'active'}
                                            >
                                                <CardTitle>Pagos</CardTitle>
                                                <CardIconContainer>
                                                    <FaCheck />
                                                    <FinanceiroCounter>Alugueis Pagos ({parcelasPagos.length})</FinanceiroCounter>
                                                </CardIconContainer>
                                            </Card>
                                            <Card
                                                onClick={() => {
                                                    setAtrasados(false);
                                                    setPagos(false);
                                                    setPendentes(!pendentes);
                                                    setTotal(false);
                                                }}

                                                className={pendentes && 'active'}
                                            >
                                                <CardTitle>Pendentes</CardTitle>
                                                <CardIconContainer>
                                                    <FaHourglassHalf />
                                                    <FinanceiroCounter>Alugueis Pendente ({parcelasPendentes.length})</FinanceiroCounter>
                                                </CardIconContainer>
                                            </Card>
                                            <Card
                                                onClick={() => {
                                                    setAtrasados(!atrasados);
                                                    setPagos(false);
                                                    setPendentes(false);
                                                    setTotal(false);
                                                }}

                                                className={atrasados && 'active'}
                                            >
                                                <CardTitle>Atrasados</CardTitle>
                                                <CardIconContainer>
                                                    <FaTimes />
                                                    <FinanceiroCounter>Alugueis Atrasados ({parcelasAtrasados.length})</FinanceiroCounter>
                                                </CardIconContainer>
                                            </Card>
                                            <Card
                                                onClick={() => {
                                                    setAtrasados(false);
                                                    setPagos(false);
                                                    setPendentes(false);
                                                    setTotal(!total);
                                                }}

                                                className={total && 'active'}
                                            >
                                                <CardTitle>Total</CardTitle>
                                                <CardIconContainer>
                                                    <FaCoins />
                                                    <FinanceiroCounter>Alugueis Total ({parcelas.length})</FinanceiroCounter>
                                                </CardIconContainer>
                                            </Card>
                                        </CardsContainer>
                                    </HeaderFinanceiroContainer>
                                    <ContentFinanceiroContainer>
                                        {
                                            pagos ? (
                                                <ParcelaList parcelas={parcelasPagos} user={user} navigate={navigate} setLoading={setLoading} />
                                            ) :
                                                atrasados ? (
                                                    <ParcelaList parcelas={parcelasAtrasados} user={user} navigate={navigate} setLoading={setLoading} />
                                                ) :
                                                    pendentes ? (
                                                        <ParcelaList parcelas={parcelasPendentes} user={user} navigate={navigate} setLoading={setLoading} />
                                                    ) :
                                                        total ? (
                                                            <ParcelaList parcelas={parcelas} user={user} navigate={navigate} setLoading={setLoading} />
                                                        ) :
                                                            <></>
                                        }
                                    </ContentFinanceiroContainer>
                                </>
                            )
                        }
                    </MainFinanceiroContainer>
                )
            }
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div >
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(FianceiroPage);