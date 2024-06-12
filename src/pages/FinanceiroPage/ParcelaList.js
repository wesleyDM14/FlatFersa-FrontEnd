import {
    ListLabel,
    PredioListContainer,
    PredioListHeader,
    PredioSingleContainer,
    PredioValue,
    SinglePredio,
    StyledLabel
} from "./FinanceiroPage.styles";

const ParcelaList = ({ parcelas, user, setLoading, navigate }) => {
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
                            parcelas.map((parcela) => (
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
                            parcelas.map((parcela) => (
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
        </PredioListContainer >
    );
}

export default ParcelaList;