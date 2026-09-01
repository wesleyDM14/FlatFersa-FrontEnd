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
import { getApartamentoById, getHistoricoApartamento } from "../../services/apartamentoService";
import { formatDateBR } from "../../utils/dateUtils";

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

const CONTRATO_STATUS_COLOR = {
    ATIVO: '#059669',
    AGUARDANDO_ASSINATURA: '#d97706',
    AGUARDANDO_DADOS_DONO: '#d97706',
    SOLICITADO: '#d97706',
    ENCERRADO: '#6b7280',
    CANCELADO: '#dc2626',
    DESPEJO: '#dc2626',
    RENOVADO: '#6b7280',
    TRANSFERIDO: '#6b7280',
};

const FATURA_STATUS_LABEL = {
    PAGO: 'Pago', PENDENTE: 'Pendente', ATRASADO: 'Atrasado',
    EM_ANALISE: 'Em Análise', CANCELADO: 'Cancelado', CONTESTADO: 'Contestado'
};

const ApartamentoInfos = ({ user }) => {
    const navigate = useNavigate();
    const { apartamentoId } = useParams();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [apartamento, setApartamento] = useState(null);
    const [historico, setHistorico] = useState([]);
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
                    const historicoData = await getHistoricoApartamento(apartamentoId);
                    setHistorico(historicoData || []);
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

                        {/* Histórico de Locação e Leituras */}
                        <SectionTitle><FaHistory color="#f59e0b" /> Histórico de Locação e Leituras de Energia</SectionTitle>
                        {historico.length === 0 ? (
                            <div style={{
                                padding: '30px',
                                background: '#f9f9f9',
                                borderRadius: '8px',
                                textAlign: 'center',
                                border: '1px dashed #ccc',
                                color: '#888'
                            }}>
                                <p>Este apartamento ainda não teve nenhum contrato.</p>
                            </div>
                        ) : (
                            historico.map((contrato) => (
                                <DetailCard key={contrato.id} style={{ marginBottom: 20 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 15 }}>
                                        <div>
                                            <DetailValue>{contrato.cliente?.nome}</DetailValue>
                                            <div style={{ color: '#64748b', fontSize: '0.85rem', marginTop: 4 }}>
                                                {formatDateBR(contrato.dataInicio)}
                                                {' - '}
                                                {contrato.dataFim ? formatDateBR(contrato.dataFim) : 'Atual'}
                                            </div>
                                        </div>
                                        <span style={{
                                            padding: '4px 12px', borderRadius: 20, fontSize: '0.8rem', fontWeight: 700,
                                            color: '#fff', backgroundColor: CONTRATO_STATUS_COLOR[contrato.status] || '#6b7280'
                                        }}>
                                            {contrato.status}
                                        </span>
                                    </div>

                                    {contrato.faturas.length === 0 ? (
                                        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Nenhuma fatura/leitura registrada neste contrato.</p>
                                    ) : (
                                        <div style={{ overflowX: 'auto' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                                                <thead>
                                                    <tr style={{ borderBottom: '2px solid #f1f5f9', textAlign: 'left' }}>
                                                        <th style={{ padding: '8px 6px', color: '#64748b' }}>Vencimento</th>
                                                        <th style={{ padding: '8px 6px', color: '#64748b' }}>Leitura Anterior</th>
                                                        <th style={{ padding: '8px 6px', color: '#64748b' }}>Leitura Atual</th>
                                                        <th style={{ padding: '8px 6px', color: '#64748b' }}>Consumo (kWh)</th>
                                                        <th style={{ padding: '8px 6px', color: '#64748b' }}>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {contrato.faturas.map((fatura) => (
                                                        <tr key={fatura.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                            <td style={{ padding: '8px 6px' }}>{formatDateBR(fatura.dataVencimento)}</td>
                                                            <td style={{ padding: '8px 6px' }}>{fatura.leituraAnterior}</td>
                                                            <td style={{ padding: '8px 6px' }}>{fatura.leituraAtual}</td>
                                                            <td style={{ padding: '8px 6px' }}>{fatura.consumoTotal}</td>
                                                            <td style={{ padding: '8px 6px' }}>{FATURA_STATUS_LABEL[fatura.status] || fatura.status}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </DetailCard>
                            ))
                        )}
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