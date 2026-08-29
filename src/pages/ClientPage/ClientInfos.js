import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import { FaUser, FaPhone, FaIdCard, FaArrowLeft } from "react-icons/fa";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { logoutUser } from "../../services/userService";
import { getClienteById, getDocumentoImagem } from "../../services/clientService";

// Estilos Reutilizados (Copiar estrutura básica do PredioPage.styles para um arquivo global seria ideal)
// Mas aqui uso o ClientPage.styles que acabamos de refazer
import {
    MainClientContainer, HeaderClientContainer, HeaderTitle, LoadingContainer,
    AddClientHeaderButton, AddButtonText,
    DocumentImage
} from "./ClientPage.styles";

import styled from "styled-components";

// Componentes de Detalhes
const DetailsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
`;

const DetailCard = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    border: 1px solid #e2e8f0;
`;

const Label = styled.span`
    font-size: 0.85rem;
    color: #64748b;
    font-weight: 600;
    display: block;
    margin-bottom: 5px;
`;

const Value = styled.span`
    font-size: 1.1rem;
    color: #1e293b;
    font-weight: 500;
`;

const SectionTitle = styled.h3`
    margin: 30px 0 15px;
    color: #334155;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ClientInfos = ({ user }) => {
    const navigate = useNavigate();
    const { clientId } = useParams();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [client, setClient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [docs, setDocs] = useState({ f: null, v: null });

    const handleLogout = () => logoutUser(navigate);

    useEffect(() => {
        const fetch = async () => {
            if (user && user.role === 'ADMIN') {
                setLoading(true);
                try {
                    await getClienteById(clientId, setClient);
                    // Busca Imagens
                    const f = await getDocumentoImagem(clientId, 'Frente');
                    const v = await getDocumentoImagem(clientId, 'Verso');
                    setDocs({ f, v });
                } finally {
                    setLoading(false);
                }
            }
        };
        fetch();
    }, [user, clientId]);

    if (!user || user.role !== 'ADMIN') return null;

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} logoutUser={handleLogout} />

            <MainClientContainer>
                <HeaderClientContainer>
                    <div>
                        <HeaderTitle>Detalhes do Cliente</HeaderTitle>
                        {!loading && client && <span style={{ color: '#666' }}>{client.nome}</span>}
                    </div>
                    <AddClientHeaderButton onClick={() => navigate('/clientes')}>
                        <FaArrowLeft color='#555' />
                        <AddButtonText style={{ color: '#555' }}>Voltar</AddButtonText>
                    </AddClientHeaderButton>
                </HeaderClientContainer>

                {loading ? (
                    <LoadingContainer><ThreeDots color="#4e4e4e" /></LoadingContainer>
                ) : client ? (
                    <div>
                        <SectionTitle><FaUser color="#3b82f6" /> Dados Pessoais</SectionTitle>
                        <DetailsContainer>
                            <DetailCard>
                                <Label>Nome Completo</Label>
                                <Value>{client.nome}</Value>
                            </DetailCard>
                            <DetailCard>
                                <Label>Email</Label>
                                <Value>{client.user?.email}</Value>
                            </DetailCard>
                            <DetailCard>
                                <Label>Status</Label>
                                <Value style={{ color: client.statusCadastro === 'APROVADO' ? 'green' : 'orange' }}>
                                    {client.statusCadastro}
                                </Value>
                            </DetailCard>
                        </DetailsContainer>

                        <SectionTitle><FaIdCard color="#f59e0b" /> Documentação</SectionTitle>
                        <DetailsContainer>
                            <DetailCard>
                                <Label>CPF</Label>
                                <Value>{client.cpf}</Value>
                            </DetailCard>
                            <DetailCard>
                                <Label>RG</Label>
                                <Value>{client.rg}</Value>
                            </DetailCard>
                            <DetailCard>
                                <Label>Data de Nascimento</Label>
                                <Value>{new Date(client.dataNascimento).toLocaleDateString('pt-BR')}</Value>
                            </DetailCard>
                        </DetailsContainer>

                        <SectionTitle><FaPhone color="#10b981" /> Contato & Endereço</SectionTitle>
                        <DetailsContainer>
                            <DetailCard>
                                <Label>Telefone</Label>
                                <Value>{client.telefone}</Value>
                            </DetailCard>
                            <DetailCard>
                                <Label>Endereço</Label>
                                <Value>{client.enderecoAtual}</Value>
                            </DetailCard>
                        </DetailsContainer>

                        <SectionTitle>Imagens dos Documentos</SectionTitle>
                        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                            {docs.f && (
                                <div>
                                    <Label>Frente</Label>
                                    <a href={docs.f} target="_blank" rel="noreferrer">
                                        <DocumentImage src={docs.f} style={{ maxHeight: 200, border: '1px solid #ccc' }} />
                                    </a>
                                </div>
                            )}
                            {docs.v && (
                                <div>
                                    <Label>Verso</Label>
                                    <a href={docs.v} target="_blank" rel="noreferrer">
                                        <DocumentImage src={docs.v} style={{ maxHeight: 200, border: '1px solid #ccc' }} />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                ) : <p>Cliente não encontrado.</p>}
            </MainClientContainer>

            <Navbar openSidebar={() => setSidebarOpen(true)} user={user} logout={handleLogout} />
        </div>
    );
};

const mapStateToProps = ({ session }) => ({ user: session.user });
export default connect(mapStateToProps)(ClientInfos);