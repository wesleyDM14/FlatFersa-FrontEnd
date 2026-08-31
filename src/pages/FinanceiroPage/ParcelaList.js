import { FaFileInvoiceDollar } from "react-icons/fa";
import Pagination from "../../components/Pagination";
import { ListRow } from "../../components/ListRow";

import {
    PredioListContainer
} from "./FinanceiroPage.styles";

const FATURA_STATUS_STYLE = {
    PAGO: { icon: '#10b981', pillColor: '#059669', pillBg: '#d1fae5', label: 'Pago' },
    PENDENTE: { icon: '#2563eb', pillColor: '#2563eb', pillBg: '#eff6ff', label: 'Pendente' },
    ATRASADO: { icon: '#ef4444', pillColor: '#dc2626', pillBg: '#fee2e2', label: 'Atrasado' },
    EM_ANALISE: { icon: '#f59e0b', pillColor: '#d97706', pillBg: '#fef3c7', label: 'Em Análise' },
    CANCELADO: { icon: '#6b7280', pillColor: '#374151', pillBg: '#f3f4f6', label: 'Cancelado' },
    CONTESTADO: { icon: '#ef4444', pillColor: '#dc2626', pillBg: '#fee2e2', label: 'Contestado' },
};

const ParcelaList = ({ parcelas, isAdmin, navigate, page, setPage, totalPages }) => {

    // A lista já vem pronta (filtrada e paginada) do backend via FinanceiroPage.
    const currentPageItems = parcelas;

    return (
        <PredioListContainer>
            {currentPageItems.map((parcela) => {
                const total = parseFloat(parcela.valorTotal || 0).toFixed(2);
                const vencimento = new Date(parcela.dataVencimento).toLocaleDateString('pt-BR');
                const st = FATURA_STATUS_STYLE[parcela.status] || FATURA_STATUS_STYLE.PENDENTE;

                return (
                    <ListRow
                        key={parcela.id}
                        onClick={() => navigate(`/faturas/${parcela.id}`)}
                        icon={<FaFileInvoiceDollar />}
                        iconColor={st.icon}
                        title={isAdmin ? (parcela.contrato?.cliente?.nome || 'Cliente') : `Vencimento ${vencimento}`}
                        subtitle={isAdmin ? `Venc. ${vencimento}` : `R$ ${total}`}
                        statusLabel={st.label}
                        statusColor={st.pillColor}
                        statusBg={st.pillBg}
                        trailing={isAdmin ? <span style={{ fontWeight: 700, color: '#1f2937' }}>R$ {total}</span> : null}
                    />
                );
            })}

            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
        </PredioListContainer>
    );
}

export default ParcelaList;
