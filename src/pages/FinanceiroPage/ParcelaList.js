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
                parcela.cliente.name.toLowerCase().includes(search.toLowerCase()) ||
                parcela.prestacao.statusPagamento.toLowerCase().includes(search.toLowerCase())
            )
        } else {
            return parcelas.filter(parcela =>
                parcela.dataVencimento.toLowerCase().includes(search.toLowerCase()) ||
                parcela.statusPagamento.toLowerCase().includes(search.toLowerCase())
            )
        }
    }, [parcelas, search]);


    const totalPages = Math.ceil(filteredParcelas.length / itemsPerPage);
    const currentPageItems = filteredParcelas.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <PredioListContainer>
            {
                user.isAdmin ? (
                    <PredioListHeader >
                        <ListLabel>Cliente</ListLabel>
                        <ListLabel>Valor</ListLabel>
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
                                <SinglePredio key={parcela.prestacao.id} onClick={() => navigate(`/prestacao/${parcela.prestacao.id}`)}>
                                    <PredioSingleContainer>
                                        <StyledLabel>Cliente: </StyledLabel>
                                        <PredioValue>{parcela.cliente.name}</PredioValue>
                                    </PredioSingleContainer>
                                    <PredioSingleContainer>
                                        <StyledLabel>Valor: </StyledLabel>
                                        <PredioValue>{parcela.prestacao.valor}</PredioValue>
                                    </PredioSingleContainer>
                                    <PredioSingleContainer>
                                        <StyledLabel>Status: </StyledLabel>
                                        <PredioValue>{parcela.prestacao.statusPagamento}</PredioValue>
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
                                        <PredioValue>{parcela.valor}</PredioValue>
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