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
} from "./ContractPage.styles";
import { downloadContract } from "../../services/contratoService";

const ContractList = ({ contratos, user, setLoading, navigate }) => {

    return (
        <PredioListContainer>
            <PredioListHeader>
                <ListLabel>Contrato</ListLabel>
                <ListLabel>Cliente</ListLabel>
                <ListLabel>Opções</ListLabel>
            </PredioListHeader>
            {
                contratos.map((contrato) => (
                    <SinglePredio key={contrato.id}>
                        <PredioSingleContainer onClick={async () => {
                            await downloadContract(user, contrato.id);
                        }}>
                            <StyledLabel>Contrato: </StyledLabel>
                            <PredioValue>{contrato.id}</PredioValue>
                        </PredioSingleContainer>
                        <PredioSingleContainer>
                            <StyledLabel>Cliente: </StyledLabel>
                            <PredioValue>{contrato.clientId}</PredioValue>
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

export default ContractList;