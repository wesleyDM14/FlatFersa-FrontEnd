import {
    MainContainer,
    MainHeader,
    MainIconTitleContainer,
    MainRegisterContainer,
    MainRegisterIconContainer,
    MainRegisterTitle,
    MainTitle,
    MainTitleContainer,
} from "./../Styles";
import { 
    FaHotel,
    FaPlusCircle
} from "react-icons/fa";

const AptMain = ({ user, navigate }) => {
    return (
        <main>
            <MainContainer>
                <MainHeader>
                    <MainTitleContainer>
                        <MainIconTitleContainer>
                            <FaHotel />
                        </MainIconTitleContainer>
                        <MainTitle>Apartamentos</MainTitle>
                    </MainTitleContainer>
                    <MainRegisterContainer>
                        <MainRegisterIconContainer>
                            <FaPlusCircle />
                        </MainRegisterIconContainer>
                        <MainRegisterTitle>Adicionar</MainRegisterTitle>
                    </MainRegisterContainer>
                </MainHeader>

            </MainContainer>
        </main>
    )
}

export default AptMain;