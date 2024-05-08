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
            <PredioListHeader>
                <ListLabel>Contrato</ListLabel>
                <ListLabel>Valor</ListLabel>
                <ListLabel>Status</ListLabel>
            </PredioListHeader>
            {
                parcelas.map((parcela) => (
                    <SinglePredio key={parcela.id}>
                        <PredioSingleContainer>
                            <StyledLabel>Contrato: </StyledLabel>
                            <PredioValue>{parcela.contractId}</PredioValue>
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
        </PredioListContainer>
    );
}

export default ParcelaList;