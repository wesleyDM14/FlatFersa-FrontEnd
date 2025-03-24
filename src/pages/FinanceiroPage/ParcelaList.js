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

const ParcelaList = ({ parcelas, user, setLoading, navigate, search, page, setPage, itemsPerPage }) => {

    const filteredParcelas = useMemo(() => {
        if (user.isAdmin) {
            return parcelas.filter(parcela =>
                parcela.Contract.cliente.name.toLowerCase().includes(search.toLowerCase()) ||
                parcela.statusPagamento.toLowerCase().includes(search.toLowerCase())
            )
        } else {
            return parcelas.filter(parcela =>
                parcela.dataVencimento.toLowerCase().includes(search.toLowerCase()) ||
                parcela.statusPagamento.toLowerCase().includes(search.toLowerCase())
            )
        }
    }, [parcelas, search, user]);


    const totalPages = Math.ceil(filteredParcelas.length / itemsPerPage);
    const currentPageItems = filteredParcelas.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <PredioListContainer>
            {
                user.isAdmin ? (
                    <PredioListHeader >
                        <ListLabel>Cliente</ListLabel>
                        <ListLabel>Valor</ListLabel>
                        <ListLabel className="hidden-responsive">Vencimento</ListLabel>
                        <ListLabel>Status</ListLabel>
                    </PredioListHeader>
                ) : (
                    <PredioListHeader >
                        <ListLabel>Vencimento</ListLabel>
                        <ListLabel>Valor</ListLabel>
                        <ListLabel>Status</ListLabel>
                    </PredioListHeader >
                )
            }
            {
                user.isAdmin ? (
                    <>
                        {
                            currentPageItems.map((parcela) => (
                                <SinglePredio key={parcela.id} onClick={() => navigate(`/prestacao/${parcela.id}`)}>
                                    <PredioSingleContainer>
                                        <StyledLabel>Cliente: </StyledLabel>
                                        <PredioValue>{parcela.Contract.cliente.name}</PredioValue>
                                    </PredioSingleContainer>
                                    <PredioSingleContainer>
                                        <StyledLabel>Valor: </StyledLabel>
                                        <PredioValue>{(parcela.valor ? parcela.valor : 0) + (parcela.multa ? parcela.multa : 0) + (parcela.valorExcedenteKWh ? parcela.valorExcedenteKWh : 0)}</PredioValue>
                                    </PredioSingleContainer>
                                    <PredioSingleContainer className="hidden-responsive">
                                        <PredioValue className="hidden-responsive">{new Date(parcela.dataVencimento).toLocaleDateString()}</PredioValue>
                                    </PredioSingleContainer>
                                    <PredioSingleContainer>
                                        <PredioValue>{parcela.statusPagamento}</PredioValue>
                                    </PredioSingleContainer>
                                </SinglePredio>
                            ))
                        }
                    </>
                ) : (
                    <>
                        {
                            currentPageItems.map((parcela) => (
                                <SinglePredio key={parcela.id} onClick={() => navigate(`/prestacao/${parcela.id}`)}>
                                    <PredioSingleContainer>
                                        <StyledLabel>Vencimento: </StyledLabel>
                                        <PredioValue>{new Date(parcela.dataVencimento).toLocaleDateString()}</PredioValue>
                                    </PredioSingleContainer>
                                    <PredioSingleContainer>
                                        <StyledLabel>Valor: </StyledLabel>
                                        <PredioValue>{(parcela.valor ? parcela.valor : 0) + (parcela.multa ? parcela.multa : 0) + (parcela.valorExcedenteKWh ? parcela.valorExcedenteKWh : 0)}</PredioValue>
                                    </PredioSingleContainer>
                                    <PredioSingleContainer>
                                        <StyledLabel>Status: </StyledLabel>
                                        <PredioValue>{parcela.statusPagamento}</PredioValue>
                                    </PredioSingleContainer>
                                </SinglePredio>
                            ))
                        }
                    </>
                )
            }
            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
        </PredioListContainer >
    );
}

export default ParcelaList;