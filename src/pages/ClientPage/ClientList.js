import { FaEdit, FaTrash, FaWhatsapp } from "react-icons/fa";
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
} from "./ClientPage.styles";

const ClientList = ({ clientes, user, setLoading, navigate }) => {
    return (
        <PredioListContainer>
            <PredioListHeader>
                <ListLabel>Nome</ListLabel>
                <ListLabel>Telefone</ListLabel>
                <ListLabel>Opções</ListLabel>
            </PredioListHeader>
            {
                clientes.map((cliente) => (
                    <SinglePredio key={cliente.id}>
                        <PredioSingleContainer>
                            <StyledLabel>Nome: </StyledLabel>
                            <PredioValue>{cliente.name}</PredioValue>
                        </PredioSingleContainer>
                        <PredioSingleContainer>
                            <StyledLabel><FaWhatsapp /> </StyledLabel>
                            <PredioValue href={`https://whatsa.me/55${cliente.phone}`} target='_blank'>{cliente.phone}</PredioValue>
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

export default ClientList;