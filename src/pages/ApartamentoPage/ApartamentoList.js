import { FaEdit, FaTrash } from "react-icons/fa";
import {
    AdminPredioContainer,
    DeleteIcon,
    EditIcon,
    ListLabel,
    PredioListContainer,
    PredioListHeader,
    PredioSingleContainer,
    PredioValue,
    SinglePredio,
    StyledLabel
} from "./ApartamentoPage.styles";

const ApartamentoList = ({ apartamentos, user, setLoading, navigate }) => {
    return (
        <PredioListContainer>
            <PredioListHeader>
                <ListLabel>Numero</ListLabel>
                <ListLabel>Prédio</ListLabel>
                <ListLabel>Opções</ListLabel>
            </PredioListHeader>
            {
                apartamentos.map((apartamento) => (
                    <SinglePredio key={apartamento.numeroContrato}>
                        <PredioSingleContainer>
                            <StyledLabel>Número: </StyledLabel>
                            <PredioValue>{apartamento.numero}</PredioValue>
                        </PredioSingleContainer>
                        <PredioSingleContainer>
                            <StyledLabel>Prédio: </StyledLabel>
                            <PredioValue>FlatFersa</PredioValue>
                        </PredioSingleContainer>
                        <AdminPredioContainer>
                            <EditIcon>
                                <FaEdit />
                            </EditIcon>
                            <DeleteIcon>
                                <FaTrash />
                            </DeleteIcon>
                        </AdminPredioContainer>
                    </SinglePredio>
                ))
            }
        </PredioListContainer>
    );
}

export default ApartamentoList;