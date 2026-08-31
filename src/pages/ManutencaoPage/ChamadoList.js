import { useState } from "react";
import Modal from "react-modal";
import { FaTools, FaCheckCircle, FaHourglassHalf, FaBan, FaFileImage } from "react-icons/fa";

import { ListRow } from "../../components/ListRow";
import Pagination from "../../components/Pagination";
import { modalStyles } from "../../styles/ModalStyles";
import { atualizarStatusChamado } from "../../services/chamadoService";

import {
    PredioListContainer,
    StyledFormArea,
    DetailSection,
    DetailRow,
    DetailPhoto,
    FormInputArea,
    FormInputLabel,
    StyledTextarea,
    StatusButtonsRow,
    StatusActionButton,
    ButtonGroup,
    BackButton,
    SubmitButton,
} from "./ManutencaoPage.styles";

const STATUS_STYLE = {
    ABERTO: { icon: '#f59e0b', pillColor: '#d97706', pillBg: '#fef3c7', label: 'Aberto' },
    EM_ANDAMENTO: { icon: '#3b82f6', pillColor: '#2563eb', pillBg: '#eff6ff', label: 'Em Andamento' },
    CONCLUIDO: { icon: '#10b981', pillColor: '#059669', pillBg: '#d1fae5', label: 'Concluído' },
    CANCELADO: { icon: '#6b7280', pillColor: '#374151', pillBg: '#f3f4f6', label: 'Cancelado' },
};

const PRIORIDADE_LABEL = { BAIXA: 'Baixa', MEDIA: 'Média', ALTA: 'Alta' };

const STATUS_OPTIONS = [
    { value: 'ABERTO', label: 'Aberto', icon: <FaHourglassHalf />, color: '#f59e0b' },
    { value: 'EM_ANDAMENTO', label: 'Em Andamento', icon: <FaTools />, color: '#3b82f6' },
    { value: 'CONCLUIDO', label: 'Concluído', icon: <FaCheckCircle />, color: '#10b981' },
    { value: 'CANCELADO', label: 'Cancelado', icon: <FaBan />, color: '#6b7280' },
];

const ChamadoList = ({ chamados, isAdmin, refreshData, page, setPage, totalPages }) => {
    Modal.setAppElement('#root');

    const [selectedChamado, setSelectedChamado] = useState(null);
    const [novoStatus, setNovoStatus] = useState(null);
    const [respostaAdmin, setRespostaAdmin] = useState('');
    const [salvando, setSalvando] = useState(false);

    const openDetail = (chamado) => {
        setSelectedChamado(chamado);
        setNovoStatus(chamado.status);
        setRespostaAdmin(chamado.respostaAdmin || '');
    };

    const closeDetail = () => {
        setSelectedChamado(null);
        setNovoStatus(null);
        setRespostaAdmin('');
    };

    const handleSalvarStatus = async () => {
        setSalvando(true);
        try {
            await atualizarStatusChamado(selectedChamado.id, novoStatus, respostaAdmin);
            refreshData();
            closeDetail();
        } catch (err) {
            alert(err.response?.data?.message || 'Erro ao atualizar chamado.');
        } finally {
            setSalvando(false);
        }
    };

    // A lista já vem pronta (paginada pelo backend, filtrada por status na página atual) via ManutencaoPage.
    const currentPageItems = chamados;

    return (
        <PredioListContainer>
            {currentPageItems.map((chamado) => {
                const st = STATUS_STYLE[chamado.status] || STATUS_STYLE.ABERTO;
                return (
                    <ListRow
                        key={chamado.id}
                        onClick={() => openDetail(chamado)}
                        icon={<FaTools />}
                        iconColor={st.icon}
                        title={chamado.titulo}
                        subtitle={isAdmin
                            ? `${chamado.cliente?.nome || ''} - Apto ${chamado.apartamento?.numero}`
                            : `Apto ${chamado.apartamento?.numero} - ${chamado.apartamento?.predio?.nome || ''}`}
                        statusLabel={st.label}
                        statusColor={st.pillColor}
                        statusBg={st.pillBg}
                    />
                );
            })}

            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />

            <Modal
                isOpen={!!selectedChamado}
                onRequestClose={closeDetail}
                style={modalStyles}
                contentLabel="Detalhes do Chamado"
            >
                {selectedChamado && (
                    <StyledFormArea>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                            <FaTools size={22} color="#be185d" />
                            <h3 style={{ margin: 0 }}>{selectedChamado.titulo}</h3>
                        </div>

                        <DetailSection>
                            {isAdmin && (
                                <DetailRow>
                                    <span>Cliente:</span>
                                    <span>{selectedChamado.cliente?.nome}</span>
                                </DetailRow>
                            )}
                            <DetailRow>
                                <span>Apartamento:</span>
                                <span>{selectedChamado.apartamento?.numero} - {selectedChamado.apartamento?.predio?.nome}</span>
                            </DetailRow>
                            <DetailRow>
                                <span>Prioridade:</span>
                                <span>{PRIORIDADE_LABEL[selectedChamado.prioridade] || selectedChamado.prioridade}</span>
                            </DetailRow>
                            <DetailRow>
                                <span>Aberto em:</span>
                                <span>{new Date(selectedChamado.createdAt).toLocaleDateString('pt-BR')}</span>
                            </DetailRow>
                            <DetailRow>
                                <span>Descrição:</span>
                                <span style={{ maxWidth: 260 }}>{selectedChamado.descricao}</span>
                            </DetailRow>
                        </DetailSection>

                        {selectedChamado.fotoUrl ? (
                            <a href={selectedChamado.fotoUrl} target="_blank" rel="noreferrer">
                                <DetailPhoto src={selectedChamado.fotoUrl} alt="Foto do problema" />
                            </a>
                        ) : (
                            <p style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <FaFileImage /> Nenhuma foto anexada.
                            </p>
                        )}

                        {isAdmin ? (
                            <>
                                <FormInputArea style={{ marginTop: 20 }}>
                                    <FormInputLabel>Status</FormInputLabel>
                                    <StatusButtonsRow>
                                        {STATUS_OPTIONS.map((opt) => (
                                            <StatusActionButton
                                                key={opt.value}
                                                type="button"
                                                color={opt.color}
                                                $active={novoStatus === opt.value}
                                                onClick={() => setNovoStatus(opt.value)}
                                            >
                                                {opt.label}
                                            </StatusActionButton>
                                        ))}
                                    </StatusButtonsRow>
                                </FormInputArea>

                                <FormInputArea>
                                    <FormInputLabel>Resposta / Observação (opcional)</FormInputLabel>
                                    <StyledTextarea
                                        value={respostaAdmin}
                                        onChange={(e) => setRespostaAdmin(e.target.value)}
                                        placeholder="Ex: Técnico agendado para amanhã às 14h."
                                    />
                                </FormInputArea>

                                <ButtonGroup>
                                    <BackButton type="button" onClick={closeDetail}>Fechar</BackButton>
                                    <SubmitButton type="button" disabled={salvando} onClick={handleSalvarStatus}>
                                        {salvando ? 'Salvando...' : 'Salvar'}
                                    </SubmitButton>
                                </ButtonGroup>
                            </>
                        ) : (
                            <>
                                {selectedChamado.respostaAdmin && (
                                    <DetailSection style={{ marginTop: 15 }}>
                                        <FormInputLabel>Resposta do Administrador:</FormInputLabel>
                                        <p style={{ marginTop: 6, color: '#374151' }}>{selectedChamado.respostaAdmin}</p>
                                    </DetailSection>
                                )}
                                <ButtonGroup>
                                    <BackButton type="button" onClick={closeDetail}>Fechar</BackButton>
                                </ButtonGroup>
                            </>
                        )}
                    </StyledFormArea>
                )}
            </Modal>
        </PredioListContainer>
    );
};

export default ChamadoList;
