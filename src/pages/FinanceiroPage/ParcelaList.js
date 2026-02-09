import { useMemo } from "react";
import Pagination from "../../components/Pagination";

import {
    ListLabel,
    PredioListContainer,
    PredioListHeader,
    PredioSingleContainer,
    PredioValue,
    SinglePredio,
    StyledLabel
} from "./FinanceiroPage.styles";

const ParcelaList = ({ parcelas, isAdmin, navigate, page, setPage, itemsPerPage }) => {

    const totalPages = Math.ceil(parcelas.length / itemsPerPage);
    const currentPageItems = parcelas.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <PredioListContainer>
            <PredioListHeader $isAdmin={isAdmin}>
                {isAdmin && <ListLabel>Cliente</ListLabel>}
                <ListLabel>Vencimento</ListLabel>
                <ListLabel>Valor Total</ListLabel>
                <ListLabel>Status</ListLabel>
            </PredioListHeader>

            {currentPageItems.map((parcela) => {
                // Cálculo seguro do valor total
                const valor = parseFloat(parcela.valor || 0);
                const multa = parseFloat(parcela.multa || 0);
                const excedente = parseFloat(parcela.valorExcedenteKWh || 0);
                const total = (valor + multa + excedente).toFixed(2);

                return (
                    <SinglePredio key={parcela.id} $isAdmin={isAdmin} onClick={() => navigate(`/faturas/${parcela.id}`)}>

                        {isAdmin && (
                            <PredioSingleContainer>
                                <StyledLabel>Cliente: </StyledLabel>
                                <PredioValue>{parcela.Contract?.cliente?.name || 'Cliente'}</PredioValue>
                            </PredioSingleContainer>
                        )}

                        <PredioSingleContainer>
                            <StyledLabel>Vencimento: </StyledLabel>
                            <PredioValue>{new Date(parcela.dataVencimento).toLocaleDateString()}</PredioValue>
                        </PredioSingleContainer>

                        <PredioSingleContainer>
                            <StyledLabel>Valor: </StyledLabel>
                            <PredioValue>R$ {total}</PredioValue>
                        </PredioSingleContainer>

                        <PredioSingleContainer>
                            <StyledLabel>Status: </StyledLabel>
                            <span style={{
                                fontWeight: 700,
                                fontSize: '0.85rem',
                                padding: '3px 8px',
                                borderRadius: '10px',
                                color:
                                    parcela.statusPagamento === 'PAGO' ? '#059669' :
                                        parcela.statusPagamento === 'ATRASADO' ? '#dc2626' :
                                            parcela.statusPagamento === 'AGUARDANDO' ? '#d97706' : '#2563eb',
                                backgroundColor:
                                    parcela.statusPagamento === 'PAGO' ? '#d1fae5' :
                                        parcela.statusPagamento === 'ATRASADO' ? '#fee2e2' :
                                            parcela.statusPagamento === 'AGUARDANDO' ? '#fef3c7' : '#eff6ff'
                            }}>
                                {parcela.statusPagamento}
                            </span>
                        </PredioSingleContainer>
                    </SinglePredio>
                );
            })}

            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
        </PredioListContainer>
    );
}

export default ParcelaList;