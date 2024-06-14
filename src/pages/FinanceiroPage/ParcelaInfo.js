import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../services/userService";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { gerarCodigoPix, getParcelaById } from "../../services/financeiroService";
import {
    BackButton,
    LoadingContainer,
    PrestacaoDetailButtonContainer,
    PrestacaoDetailHeaderContainer,
    PrestacaoDetailHeaderTitle,
    PrestacaoDetailLabel,
    PrestacaoDetailLeftColumn,
    PrestacaoDetailMainContainer,
    PrestacaoDetailPagamentoContainer,
    PrestacaoDetailRightColumn,
    PrestacaoDetailValue,
    PrestacaoDetailValueContainer,
    PrestcaoDetailContentContainer,
    QrCodeCopiaECola,
    QrCodeCopiaEColaContainer,
    QrCodePagamento,
    SubmitButton
} from "./FinanceiroPage.styles";
import { ThreeDots } from "react-loader-spinner";

const ParcelaInfo = ({ user }) => {
    const navigate = useNavigate();
    const { prestacaoId } = useParams();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [parcela, setParcela] = useState({});
    const [parcelaInfos, setParcelasInfo] = useState({});
    const [imgb64, setImgb64] = useState(undefined);
    const [copiaCola, setCopiCola] = useState('');
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const getMesName = (id) => {
        return monthNames[id - 1];
    }

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        if (loading && user.accessToken) {
            getParcelaById(user, prestacaoId, setParcela, setParcelasInfo, setLoading);
        }
    }, [user, loading, prestacaoId]);

    useEffect(() => {
        if (loading2 && user.accessToken) {
            gerarCodigoPix(user, prestacaoId, setImgb64, setLoading2, setCopiCola);
        }
    }, [user, loading2, prestacaoId]);


    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} />
            {
                loading || loading2 ? (
                    <LoadingContainer>
                        <ThreeDots
                            color={'#4e4e4e'}
                            height={49}
                            width={100}
                        />
                    </LoadingContainer>
                ) : (
                    user.isAdmin ? (
                        <PrestacaoDetailMainContainer>
                            <PrestacaoDetailHeaderContainer>
                                <PrestacaoDetailHeaderTitle>Aluguel - {parcela.mesReferencia === 0 ? 'Calção' : getMesName(parcela.mesReferencia)}</PrestacaoDetailHeaderTitle>
                                <PrestacaoDetailHeaderTitle>
                                    #Status: {parcela.statusPagamento}
                                </PrestacaoDetailHeaderTitle>
                            </PrestacaoDetailHeaderContainer>
                            <PrestcaoDetailContentContainer>
                                <PrestacaoDetailLeftColumn>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Mês Referência: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>{parcela.mesReferencia === 0 ? 'Calção' : getMesName(parcela.mesReferencia)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Data de Vencimento: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>{new Date(parcela.dataVencimento).toLocaleDateString()}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    {
                                        parcela.mesReferencia !== 0 && (
                                            <PrestacaoDetailValueContainer>
                                                <PrestacaoDetailLabel>Consumo de Energia: </PrestacaoDetailLabel>
                                                <PrestacaoDetailValue>{parcela.consumoKwh ? parcela.consumoKwh + ' kWh' : 'Sem leitura no momento'} </PrestacaoDetailValue>
                                            </PrestacaoDetailValueContainer>
                                        )
                                    }
                                    {
                                        parcela.mesReferencia !== 0 && (
                                            <PrestacaoDetailValueContainer>
                                                <PrestacaoDetailLabel>Uso do Rateio de Energia: </PrestacaoDetailLabel>
                                                <PrestacaoDetailValue>{parcela.valorExcedenteKWh ? 'R$ ' + parseFloat(parcela.valorExcedenteKWh).toFixed(2) : 'R$ 0.00'} </PrestacaoDetailValue>
                                            </PrestacaoDetailValueContainer>
                                        )
                                    }
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Multa: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>R$ {parseFloat(parcela.multa).toFixed(2)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Valor Total: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>R$ {parseFloat(parcela.valor).toFixed(2)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailButtonContainer>
                                        <BackButton onClick={() => navigate('/financeiro')}>Voltar</BackButton>
                                        <SubmitButton onClick={() => window.alert('Funcionalidade em teste')}>Registar Leitura</SubmitButton>
                                    </PrestacaoDetailButtonContainer>
                                </PrestacaoDetailLeftColumn>
                            </PrestcaoDetailContentContainer>
                        </PrestacaoDetailMainContainer>
                    ) : (
                        <PrestacaoDetailMainContainer>
                            <PrestacaoDetailHeaderContainer>
                                <PrestacaoDetailHeaderTitle>Aluguel - {parcela.mesReferencia === 0 ? 'Calção' : getMesName(parcela.mesReferencia)}</PrestacaoDetailHeaderTitle>
                                <PrestacaoDetailHeaderTitle>
                                    #Status: {parcela.statusPagamento}
                                </PrestacaoDetailHeaderTitle>
                            </PrestacaoDetailHeaderContainer>
                            <PrestcaoDetailContentContainer>
                                <PrestacaoDetailLeftColumn>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Mês Referência: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>{parcela.mesReferencia === 0 ? 'Calção' : getMesName(parcela.mesReferencia)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Data de Vencimento: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>{new Date(parcela.dataVencimento).toLocaleDateString()}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    {
                                        parcela.mesReferencia !== 0 && (
                                            <PrestacaoDetailValueContainer>
                                                <PrestacaoDetailLabel>Consumo de Energia: </PrestacaoDetailLabel>
                                                <PrestacaoDetailValue>{parcela.consumoKwh ? parcela.consumoKwh + ' kWh' : 'Sem leitura no momento'} </PrestacaoDetailValue>
                                            </PrestacaoDetailValueContainer>
                                        )
                                    }
                                    {
                                        parcela.mesReferencia !== 0 && (
                                            <PrestacaoDetailValueContainer>
                                                <PrestacaoDetailLabel>Uso do Rateio de Energia: </PrestacaoDetailLabel>
                                                <PrestacaoDetailValue>{parcela.valorExcedenteKWh ? 'R$ ' + parseFloat(parcela.valorExcedenteKWh).toFixed(2) : 'R$ 0.00'} </PrestacaoDetailValue>
                                            </PrestacaoDetailValueContainer>
                                        )
                                    }
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Multa: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>R$ {parseFloat(parcela.multa).toFixed(2)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Valor Total: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>R$ {parseFloat(parcela.valor).toFixed(2)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                </PrestacaoDetailLeftColumn>
                                <PrestacaoDetailRightColumn>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Dados de Pagamento </PrestacaoDetailLabel>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailPagamentoContainer>
                                        <PrestacaoDetailValueContainer>
                                            <PrestacaoDetailLabel>QrCode</PrestacaoDetailLabel>
                                        </PrestacaoDetailValueContainer>
                                        <QrCodePagamento
                                            src={imgb64}
                                        />
                                        <PrestacaoDetailValueContainer>
                                            <PrestacaoDetailLabel>Pix Copia e Cola</PrestacaoDetailLabel>
                                        </PrestacaoDetailValueContainer>
                                        <QrCodeCopiaEColaContainer>
                                            <QrCodeCopiaECola>
                                                {copiaCola}
                                            </QrCodeCopiaECola>
                                        </QrCodeCopiaEColaContainer>
                                    </PrestacaoDetailPagamentoContainer>
                                    <PrestacaoDetailButtonContainer>
                                        <BackButton onClick={() => navigate('/financeiro')}>Voltar</BackButton>
                                        <SubmitButton onClick={() => window.alert('Funcionalidade em teste')}>Registar Pagamento</SubmitButton>
                                    </PrestacaoDetailButtonContainer>
                                </PrestacaoDetailRightColumn>
                            </PrestcaoDetailContentContainer>
                        </PrestacaoDetailMainContainer>
                    )
                )
            }
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(ParcelaInfo);