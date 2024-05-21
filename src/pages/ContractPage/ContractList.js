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
            <PredioListHeader $isadmin={user.isAdmin.toString()}>
                {
                    user.isAdmin && (<ListLabel>Cliente</ListLabel>)
                }
                <ListLabel>Apartamento</ListLabel>
                <ListLabel>Status</ListLabel>
                {
                    user.isAdmin && (<ListLabel>Opções</ListLabel>)
                }
            </PredioListHeader>
            {
                contratos.map((contrato) => (
                    <SinglePredio key={contrato.contrato.id} $isadmin={user.isAdmin.toString()}>
                        {
                            user.isAdmin && (
                                <PredioSingleContainer onClick={async () => {
                                    await downloadContract(user, contrato.contrato.id);
                                }}>
                                    <StyledLabel>Cliente: </StyledLabel>
                                    <PredioValue>{contrato.cliente.name}</PredioValue>
                                </PredioSingleContainer>
                            )
                        }
                        <PredioSingleContainer>
                            <StyledLabel>Apartamento: </StyledLabel>
                            <PredioValue>{contrato.apartamento.numero}</PredioValue>
                        </PredioSingleContainer>
                        <PredioSingleContainer>
                            <StyledLabel>Status: </StyledLabel>
                            <PredioValue>{contrato.contrato.statusContrato}</PredioValue>
                        </PredioSingleContainer>
                        {
                            user.isAdmin && (
                                <AdminPredioContainer>
                                    <EditIcon>
                                        <FaEdit />
                                    </EditIcon>
                                    <DeleteIcon>
                                        <FaTrash />
                                    </DeleteIcon>
                                </AdminPredioContainer>
                            )
                        }
                    </SinglePredio>
                ))
            }
        </PredioListContainer>
    );
}

export default ContractList;