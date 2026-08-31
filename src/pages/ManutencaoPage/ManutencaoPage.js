import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-modal";
import { ThreeDots } from "react-loader-spinner";
import {
    FaTools, FaHourglassHalf, FaCheckCircle, FaBan, FaWrench, FaCloudUploadAlt
} from "react-icons/fa";

import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import SearchBar from "../../components/SearchBar";
import ChamadoList from "./ChamadoList";

import { logoutUser } from '../../services/userService';
import { getChamados, getMeusChamados, criarChamado } from "../../services/chamadoService";

import {
    MainManutencaoContainer,
    HeaderManutencaoContainer,
    HeaderTitle,
    ContentManutencaoContainer,
    ManutencaoCounter,
    NoContentContainer,
    NoContentAvisoContainer,
    TextContent,
    LoadingContainer,
    CardsContainer,
    Card,
    CardTitle,
    CardIconContainer,
    ContentManutencaoHeader,
    SearcherContainer,
    StyledFormArea,
    FormInputArea,
    FormInputLabel,
    FormInputLabelRequired,
    StyledInput,
    StyledTextarea,
    StyledSelectNative,
    FileInputArea,
    ButtonGroup,
    BackButton,
    SubmitButton,
} from './ManutencaoPage.styles';
import { modalStyles } from "../../styles/ModalStyles";

const ManutencaoPage = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [chamados, setChamados] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [filterType, setFilterType] = useState('TOTAL');
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    const [modalNovoIsOpen, setModalNovoIsOpen] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('MEDIA');
    const [foto, setFoto] = useState(null);
    const [fotoPreview, setFotoPreview] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [formError, setFormError] = useState('');

    const handleLogout = () => logoutUser(navigate);

    const isAdmin = user?.role === 'ADMIN';

    // Debounce da busca (~400ms)
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(timer);
    }, [search]);

    // Reseta a página sempre que a busca mudar (o filtro de status não tem suporte
    // no backend para /chamados, então ele permanece um filtro client-side sobre a página atual)
    useEffect(() => {
        setPage(1);
    }, [debouncedSearch]);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            // Não há filtro de status no backend para chamados, apenas page/limit/search.
            const data = isAdmin
                ? await getChamados({ page, limit: itemsPerPage, search: debouncedSearch })
                : await getMeusChamados({ page, limit: itemsPerPage });
            setChamados(data.items || []);
            setTotalPages(data.totalPages || 1);
        } catch (error) {
            console.error("Erro ao carregar chamados", error);
        } finally {
            setLoading(false);
        }
    }, [isAdmin, page, debouncedSearch]);

    useEffect(() => {
        if (user && user.id) fetchData();
    }, [user, fetchData]);

    // Não existe rota de contagens globais para chamados, então os cards mostram
    // a contagem apenas da página atual (fallback aceitável para esta listagem).
    const counts = React.useMemo(() => ({
        total: chamados.length,
        abertos: chamados.filter(c => c.status === 'ABERTO').length,
        andamento: chamados.filter(c => c.status === 'EM_ANDAMENTO').length,
        concluidos: chamados.filter(c => c.status === 'CONCLUIDO').length,
    }), [chamados]);

    // Filtro de status aplicado apenas sobre a página atual (backend não suporta status em /chamados)
    const filteredList = React.useMemo(() => {
        let list = chamados;
        if (filterType !== 'TOTAL') list = list.filter(c => c.status === filterType);
        return list;
    }, [chamados, filterType]);

    const handleCardClick = (type) => {
        setFilterType(type);
        setPage(1);
    };

    const closeModalNovo = () => {
        setModalNovoIsOpen(false);
        setTitulo('');
        setDescricao('');
        setPrioridade('MEDIA');
        setFoto(null);
        setFotoPreview(null);
        setFormError('');
    };

    const handleSubmitNovo = async (e) => {
        e.preventDefault();
        if (!titulo || !descricao) {
            setFormError('Preencha título e descrição.');
            return;
        }
        setFormError('');
        setEnviando(true);
        try {
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('descricao', descricao);
            formData.append('prioridade', prioridade);
            if (foto) formData.append('file', foto);

            await criarChamado(formData);
            closeModalNovo();
            fetchData();
        } catch (err) {
            setFormError(err.response?.data?.message || 'Erro ao abrir chamado.');
        } finally {
            setEnviando(false);
        }
    };

    if (!user) return <LoadingContainer><ThreeDots color="#4e4e4e" /></LoadingContainer>;

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} logoutUser={handleLogout} />

            {loading ? (
                <LoadingContainer><ThreeDots color={'#4e4e4e'} height={49} width={100} /></LoadingContainer>
            ) : (
                <MainManutencaoContainer>
                    <HeaderManutencaoContainer>
                        <HeaderTitle>Manutenção</HeaderTitle>
                        {!isAdmin && (
                            <SubmitButton type="button" onClick={() => setModalNovoIsOpen(true)}>
                                + Abrir Chamado
                            </SubmitButton>
                        )}
                    </HeaderManutencaoContainer>

                    <CardsContainer>
                        <Card onClick={() => handleCardClick('TOTAL')} className={filterType === 'TOTAL' ? 'active' : ''}>
                            <CardTitle>Total</CardTitle>
                            <CardIconContainer>
                                <FaTools />
                                <ManutencaoCounter>{counts.total}</ManutencaoCounter>
                            </CardIconContainer>
                        </Card>
                        <Card onClick={() => handleCardClick('ABERTO')} className={filterType === 'ABERTO' ? 'active' : ''}>
                            <CardTitle>Abertos</CardTitle>
                            <CardIconContainer>
                                <FaHourglassHalf />
                                <ManutencaoCounter>{counts.abertos}</ManutencaoCounter>
                            </CardIconContainer>
                        </Card>
                        <Card onClick={() => handleCardClick('EM_ANDAMENTO')} className={filterType === 'EM_ANDAMENTO' ? 'active' : ''}>
                            <CardTitle>Em Andamento</CardTitle>
                            <CardIconContainer>
                                <FaWrench />
                                <ManutencaoCounter>{counts.andamento}</ManutencaoCounter>
                            </CardIconContainer>
                        </Card>
                        <Card onClick={() => handleCardClick('CONCLUIDO')} className={filterType === 'CONCLUIDO' ? 'active' : ''}>
                            <CardTitle>Concluídos</CardTitle>
                            <CardIconContainer>
                                <FaCheckCircle />
                                <ManutencaoCounter>{counts.concluidos}</ManutencaoCounter>
                            </CardIconContainer>
                        </Card>
                    </CardsContainer>

                    <ContentManutencaoContainer>
                        <ContentManutencaoHeader>
                            <ManutencaoCounter>
                                {filterType === 'TOTAL' ? 'Todos os Chamados' : `Chamados ${filterType.replace('_', ' ')}`}
                            </ManutencaoCounter>
                            <SearcherContainer>
                                <SearchBar search={search} setSearch={setSearch} placeholder="Buscar por título, cliente ou apartamento..." />
                            </SearcherContainer>
                        </ContentManutencaoHeader>

                        {filteredList.length === 0 ? (
                            <NoContentContainer>
                                <FaBan color='#6c757d' fontSize={80} style={{ marginBottom: 20 }} />
                                <NoContentAvisoContainer>
                                    <TextContent>Nenhum chamado encontrado.</TextContent>
                                </NoContentAvisoContainer>
                            </NoContentContainer>
                        ) : (
                            <ChamadoList
                                chamados={filteredList}
                                isAdmin={isAdmin}
                                refreshData={fetchData}
                                page={page}
                                setPage={setPage}
                                totalPages={totalPages}
                            />
                        )}
                    </ContentManutencaoContainer>
                </MainManutencaoContainer>
            )}

            <Modal isOpen={modalNovoIsOpen} onRequestClose={closeModalNovo} style={modalStyles} contentLabel="Abrir Chamado">
                <StyledFormArea>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                        <FaTools size={22} color="#be185d" />
                        <h3 style={{ margin: 0 }}>Abrir Chamado de Manutenção</h3>
                    </div>

                    <form onSubmit={handleSubmitNovo}>
                        <FormInputArea>
                            <FormInputLabelRequired>Título</FormInputLabelRequired>
                            <StyledInput
                                type="text"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                placeholder="Ex: Vazamento no banheiro"
                            />
                        </FormInputArea>

                        <FormInputArea>
                            <FormInputLabelRequired>Descrição</FormInputLabelRequired>
                            <StyledTextarea
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descreva o problema com detalhes..."
                            />
                        </FormInputArea>

                        <FormInputArea>
                            <FormInputLabel>Prioridade</FormInputLabel>
                            <StyledSelectNative value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
                                <option value="BAIXA">Baixa</option>
                                <option value="MEDIA">Média</option>
                                <option value="ALTA">Alta</option>
                            </StyledSelectNative>
                        </FormInputArea>

                        <FormInputArea>
                            <FormInputLabel>Foto (opcional)</FormInputLabel>
                            <FileInputArea>
                                {fotoPreview ? (
                                    <img src={fotoPreview} alt="Prévia" />
                                ) : (
                                    <>
                                        <FaCloudUploadAlt size={24} />
                                        Clique para enviar uma foto do problema
                                    </>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            setFoto(file);
                                            setFotoPreview(URL.createObjectURL(file));
                                        }
                                    }}
                                />
                            </FileInputArea>
                        </FormInputArea>

                        {formError && <p style={{ color: '#dc2626', fontSize: '0.85rem' }}>{formError}</p>}

                        <ButtonGroup>
                            <BackButton type="button" onClick={closeModalNovo}>Cancelar</BackButton>
                            <SubmitButton type="submit" disabled={enviando}>
                                {enviando ? 'Enviando...' : 'Abrir Chamado'}
                            </SubmitButton>
                        </ButtonGroup>
                    </form>
                </StyledFormArea>
            </Modal>

            <Navbar openSidebar={() => setSidebarOpen(true)} user={user} logout={handleLogout} />
        </div>
    );
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(ManutencaoPage);
