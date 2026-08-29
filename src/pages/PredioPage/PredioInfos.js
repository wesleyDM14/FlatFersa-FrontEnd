import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { FaBuilding, FaMapMarkerAlt, FaArrowLeft, FaDoorOpen, FaUser } from "react-icons/fa";

// Componentes
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

// Serviços
import { logoutUser } from "../../services/userService";
import { getPredioById } from "../../services/predioService"; // Removemos getApartamentosByPredio

// Estilos
import {
    MainPredioContainer,
    HeaderPredioContainer,
    HeaderTitle,
    LoadingContainer,
    AddPredioHeaderButton,
    AddButtonText,
    DetailsContainer,
    DetailCard,
    DetailLabel,
    DetailValue,
    SectionTitle,
    Divider
} from "./PredioPage.styles";

const PredioInfos = ({ user }) => {
    const navigate = useNavigate();
    const { predioId } = useParams();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [predio, setPredio] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleLogout = () => {
        logoutUser(navigate);
    };

    useEffect(() => {
        const fetchAllData = async () => {
            if (user && user.role === 'ADMIN') {
                setLoading(true);
                try {
                    // O backend já traz o prédio com os apartamentos aninhados!
                    await getPredioById(predioId, setPredio);
                } catch (error) {
                    console.error("Erro ao carregar dados", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (predioId) {
            fetchAllData();
        }
    }, [predioId, user]);

    if (!user || user.role !== 'ADMIN') {
        return null;
    }

    // Criamos uma variável de apoio para facilitar a leitura no JSX
    const apartamentos = predio?.apartamentos || [];

    return (
        <div className="container">
            <Sidebar
                sidebarOpen={sidebarOpen}
                closeSidebar={() => setSidebarOpen(false)}
                logoutUser={handleLogout}
            />

            <MainPredioContainer>
                <HeaderPredioContainer>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <HeaderTitle>Detalhes do Prédio</HeaderTitle>
                        {!loading && predio && <span style={{ color: '#666', fontSize: '14px' }}>{predio.nome}</span>}
                    </div>

                    <AddPredioHeaderButton onClick={() => navigate('/predios')}>
                        <FaArrowLeft color='#555' />
                        <AddButtonText style={{ color: '#555' }}>Voltar para Lista</AddButtonText>
                    </AddPredioHeaderButton>
                </HeaderPredioContainer>

                {loading ? (
                    <LoadingContainer>
                        <ThreeDots color={'#4e4e4e'} height={49} width={100} />
                    </LoadingContainer>
                ) : predio ? (
                    <div style={{ marginTop: '20px' }}>

                        {/* SEÇÃO 1: INFO GERAIS */}
                        <SectionTitle><FaBuilding color="#3b82f6" /> Informações Principais</SectionTitle>
                        <DetailsContainer>
                            <DetailCard>
                                <DetailLabel>Nome</DetailLabel>
                                <DetailValue>{predio.nome}</DetailValue>
                            </DetailCard>
                            <DetailCard>
                                <DetailLabel>Finalidade</DetailLabel>
                                <DetailValue>{predio.finalidade || '-'}</DetailValue>
                            </DetailCard>
                            <DetailCard>
                                <DetailLabel>Preço kWh</DetailLabel>
                                <DetailValue style={{ color: '#10b981' }}>
                                    R$ {predio.precoKwhAtual ? Number(predio.precoKwhAtual).toFixed(2) : '0.00'}
                                </DetailValue>
                            </DetailCard>
                            <DetailCard>
                                <DetailLabel>Apt. Cadastrados</DetailLabel>
                                <DetailValue>{apartamentos.length}</DetailValue>
                            </DetailCard>
                        </DetailsContainer>

                        <Divider />

                        {/* SEÇÃO 2: LOCALIZAÇÃO */}
                        <SectionTitle><FaMapMarkerAlt color="#ef4444" /> Localização</SectionTitle>
                        <DetailsContainer>
                            <DetailCard>
                                <DetailLabel>Endereço</DetailLabel>
                                <DetailValue>{predio.endereco}</DetailValue>
                            </DetailCard>
                            <DetailCard>
                                <DetailLabel>Bairro</DetailLabel>
                                <DetailValue>{predio.bairro}</DetailValue>
                            </DetailCard>
                            <DetailCard>
                                <DetailLabel>Cidade / UF</DetailLabel>
                                <DetailValue>{predio.cidade} - {predio.estado}</DetailValue>
                            </DetailCard>
                        </DetailsContainer>

                        <Divider />

                        {/* SEÇÃO 3: LISTA DE APARTAMENTOS */}
                        <SectionTitle><FaDoorOpen color="#f59e0b" /> Apartamentos ({apartamentos.length})</SectionTitle>

                        {apartamentos.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                                {apartamentos.map(apt => (
                                    <div
                                        key={apt.id}
                                        onClick={() => navigate(`/apartamentos/${apt.id}`)}
                                        style={{
                                            background: 'white',
                                            padding: '15px',
                                            borderRadius: '8px',
                                            border: '1px solid #e5e7eb',
                                            cursor: 'pointer',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                            transition: 'transform 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <div style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>
                                            Apt {apt.numero}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px', display: 'flex', alignItems: 'center' }}>
                                            <FaUser size={12} style={{ marginRight: '5px' }} />
                                            {/* Adaptado para checar apenas o status, já que o inquilino não vem nesse JSON */}
                                            {apt.status === 'VAGO' ? (
                                                <span style={{ color: '#10b981', fontWeight: 'bold' }}>Vago</span>
                                            ) : (
                                                <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Ocupado</span>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {/* Card para Adicionar Novo */}
                                <div
                                    onClick={() => navigate('/apartamentos/novo', { state: { predioId: predio.id } })}
                                    style={{
                                        background: '#f0f9ff',
                                        padding: '15px',
                                        borderRadius: '8px',
                                        border: '1px dashed #3b82f6',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#3b82f6',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    + Adicionar
                                </div>
                            </div>
                        ) : (
                            <div style={{
                                padding: '30px',
                                background: '#f9f9f9',
                                borderRadius: '8px',
                                textAlign: 'center',
                                border: '1px dashed #ccc'
                            }}>
                                <p style={{ color: '#777' }}>Nenhum apartamento cadastrado neste prédio.</p>
                                <button
                                    onClick={() => navigate('/apartamentos/novo', { state: { predioId: predio.id } })}
                                    style={{
                                        marginTop: '10px',
                                        padding: '8px 16px',
                                        background: '#3b82f6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    + Cadastrar Primeiro Apartamento
                                </button>
                            </div>
                        )}

                    </div>
                ) : (
                    <p>Prédio não encontrado.</p>
                )}
            </MainPredioContainer>

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

export default connect(mapStateToProps)(PredioInfos);