import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import {
    FaBuilding,
    FaArrowLeft,
    FaDoorOpen,
    FaSnowflake,
    FaMoneyBillWave,
    FaHistory
} from "react-icons/fa";

// Componentes
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

// Serviços
import { logoutUser } from "../../services/userService";
import { getApartamentoById } from "../../services/apartamentoService";

// Estilos (Reaproveitando os estilos unificados que criamos)
import {
    MainApartamentoContainer,
    HeaderApartamentoContainer,
    HeaderTitle,
    LoadingContainer,
    AddApartamentoHeaderButton, // Botão Voltar
    AddButtonText,
    // Novos componentes de detalhes (adicione ao ApartamentoPage.styles.js se não tiverem)
    // Se não tiverem lá ainda, usaremos divs estilizadas inline ou adicionaremos ao styles.
} from "./ApartamentoPage.styles";

// IMPORTANTE: Para manter consistência, vou usar os mesmos estilos de "DetailsContainer" 
// que criamos no PredioPage. Como estão em arquivos separados, vou recriar aqui 
// ou você pode exportar de um arquivo comum (styles/SharedStyles.js).
// Por segurança, vou definir localmente estilos similares para garantir que funcione agora.
import styled from "styled-components";

// --- Estilos Locais para Detalhes (Idênticos ao Predio) ---
const DetailsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
`;

const DetailCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
`;

const DetailLabel = styled.span`
    font-size: 0.85rem;
    color: #64748b;
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
`;

const DetailValue = styled.span`
    font-size: 1.2rem;
    color: #1e293b;
    font-weight: 600;
`;

const StatusBadge = styled.span`
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 700;
    width: fit-content;
    background-color: ${props => props.$occupied ? '#fee2e2' : '#d1fae5'};
    color: ${props => props.$occupied ? '#dc2626' : '#059669'};
`;

const SectionTitle = styled.h3`
    font-size: 1.2rem;
    color: #334155;
    margin-top: 30px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

// --- COMPONENTE ---

const ApartamentoInfos = ({ user }) => {
    const navigate = useNavigate();
    const { apartamentoId } = useParams();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [apartamento, setApartamento] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        logoutUser(navigate);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (user && user.role === 'ADMIN') {
                setLoading(true);
                try {
                    // Serviço V2 (sem user)
                    await getApartamentoById(apartamentoId, setApartamento);
                } catch (error) {
                    console.error("Erro ao buscar apartamento", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [user, apartamentoId]);

    // Proteção
    if (!user || user.role !== 'ADMIN') return null;

    return (
        <div className="container">
            <Sidebar
                sidebarOpen={sidebarOpen}
                closeSidebar={() => setSidebarOpen(false)}
                logoutUser={handleLogout}
            />

            <MainApartamentoContainer>
                {/* Header com Voltar */}
                <HeaderApartamentoContainer>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <HeaderTitle>
                            {loading ? 'Carregando...' : `Apartamento ${apartamento?.numero}`}
                        </HeaderTitle>
                        {!loading && apartamento?.predio && (
                            <span style={{ color: '#64748b', fontSize: '14px', marginTop: '5px' }}>
                                <FaBuilding style={{ marginRight: 5 }} />
                                {apartamento.predio.nome}
                            </span>
                        )}
                    </div>

                    <AddApartamentoHeaderButton onClick={() => navigate('/apartamentos')}>
                        <FaArrowLeft color='#555' />
                        <AddButtonText style={{ color: '#555' }}>Voltar</AddButtonText>
                    </AddApartamentoHeaderButton>
                </HeaderApartamentoContainer>

                {loading ? (
                    <LoadingContainer>
                        <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                    </LoadingContainer>
                ) : apartamento ? (
                    <>
                        <DetailsContainer>
                            {/* Card 1: Status */}
                            <DetailCard>
                                <DetailLabel>
                                    <FaDoorOpen /> Status Atual
                                </DetailLabel>
                                <StatusBadge $occupied={apartamento.status === 'OCUPADO'}>
                                    {apartamento.status}
                                </StatusBadge>
                                {apartamento.status === 'OCUPADO' && apartamento.contratos?.[0]?.cliente && (
                                    <div style={{ marginTop: '10px', fontSize: '0.9rem', color: '#555' }}>
                                        Ocupado por: <strong>{apartamento.contratos[0].cliente.nome}</strong>
                                    </div>
                                )}
                            </DetailCard>

                            {/* Card 2: Financeiro */}
                            <DetailCard>
                                <DetailLabel>
                                    <FaMoneyBillWave /> Valor Base
                                </DetailLabel>
                                <DetailValue style={{ color: '#10b981' }}>
                                    R$ {apartamento.valorBase ? parseFloat(apartamento.valorBase).toFixed(2) : '0.00'}
                                </DetailValue>
                            </DetailCard>

                            {/* Card 3: Comodidades */}
                            <DetailCard>
                                <DetailLabel>
                                    <FaSnowflake /> Climatização
                                </DetailLabel>
                                <DetailValue>
                                    {apartamento.climatizado ? 'Sim, Climatizado' : 'Não possui ar-condicionado'}
                                </DetailValue>
                            </DetailCard>
                        </DetailsContainer>

                        {/* Card Grande: Prédio */}
                        <SectionTitle><FaBuilding color="#3b82f6" /> Localização</SectionTitle>
                        <DetailCard>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div>
                                    <DetailLabel>Prédio</DetailLabel>
                                    <DetailValue>{apartamento.predio?.nome}</DetailValue>
                                </div>
                                <div>
                                    <DetailLabel>Endereço</DetailLabel>
                                    <span style={{ color: '#334155' }}>{apartamento.predio?.endereco}</span>
                                    <br />
                                    <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                                        {apartamento.predio?.bairro} - {apartamento.predio?.cidade}
                                    </span>
                                </div>
                            </div>
                        </DetailCard>

                        {/* Histórico (Placeholder) */}
                        <SectionTitle><FaHistory color="#f59e0b" /> Histórico de Locação</SectionTitle>
                        <div style={{
                            padding: '30px',
                            background: '#f9f9f9',
                            borderRadius: '8px',
                            textAlign: 'center',
                            border: '1px dashed #ccc',
                            color: '#888'
                        }}>
                            <p>O histórico de contratos e pagamentos deste apartamento aparecerá aqui.</p>
                        </div>
                    </>
                ) : (
                    <p>Apartamento não encontrado.</p>
                )}

            </MainApartamentoContainer>

            <Navbar
                openSidebar={() => setSidebarOpen(true)}
                user={user}
                logout={handleLogout}
            />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(ApartamentoInfos);