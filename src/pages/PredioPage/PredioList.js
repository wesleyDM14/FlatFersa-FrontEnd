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
} from "./PredioPage.styles";


const PredioList = ({ predios, user, setLoading, navigate }) => {
    return (
        <PredioListContainer>
            <PredioListHeader>
                <ListLabel>Nome</ListLabel>
                <ListLabel>Cidade</ListLabel>
                <ListLabel>Opções</ListLabel>
            </PredioListHeader>
            {
                predios.map((predio) => (
                    <SinglePredio key={predio.id}>
                        <PredioSingleContainer>
                            <StyledLabel>Prédio: </StyledLabel>
                            <PredioValue>{predio.nome}</PredioValue>
                        </PredioSingleContainer>
                        <PredioSingleContainer>
                            <StyledLabel>Cidade: </StyledLabel>
                            <PredioValue>{predio.cidade}</PredioValue>
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

export default PredioList;