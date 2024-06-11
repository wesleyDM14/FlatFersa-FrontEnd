import { FaHammer } from "react-icons/fa";
import { Container, Message, Title } from "./EmConstrucaoPage.styles";

const EmConstrucaoPage = () => {
    return (

        <Container>
            <FaHammer 
                size={50}
            />
            <Title>Em Construção</Title>
            <Message>Estamos trabalhando duro para trazer algo incrível para você. Volte em breve!</Message>
        </Container>
    );
}

export default EmConstrucaoPage;