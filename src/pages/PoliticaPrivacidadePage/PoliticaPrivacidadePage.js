import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import {
    ContentBody,
    ContentContainer,
    ContentHeader,
    ContentList,
    ContentListItem,
    ContentParagraph,
    ContentSubTitle,
    ContentTitle,
    Link,
    PoliticaContainer,
} from './PoliticaPrivacidadePage.styles';

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { logoutUser } from "../../services/userService";

const PoliticaPrivacidade = () => {

    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} politicaActive={true} />
            <PoliticaContainer>
                <ContentContainer>
                    <ContentHeader>
                        <ContentTitle>Política de Privacidade - FlatFersa</ContentTitle>
                    </ContentHeader>
                    <ContentBody>
                        <ContentParagraph>
                            Última atualização: 22/04/2024
                        </ContentParagraph>
                        <br />
                        <ContentParagraph>
                            A Plataforma FlatFersa é uma plataforma online acessível na URL <Link href="/dashboard">https://flatfersa.com.br</Link>, por meio da qual a OffsetDev ("OffsetDev", "nós" ou "nossos"), disponibiliza uma plataforma de tecnologia para conectar Usuários ("Usuário", "você" ou "seu") a serviços tais como intermediação à abertura de contratos de locação com a FlatFersa, acompanhamento de contratos de aluguel, pagamentos, bem como outras funcionalidades que forem apresentadas na Plataforma ("Serviços").
                        </ContentParagraph>
                        <br />
                        <ContentParagraph>
                            Esta Política de Privacidade descreve como as informações pessoais são coletadas, usadas e compartilhadas quando você utiliza os serviços oferecidos pela FlatFersa ("nós", "nosso" ou "nos").
                        </ContentParagraph>
                        <ContentSubTitle>
                            Informações que Coletamos
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Ao utilizar nosso sistema de aluguel, podemos coletar as seguintes informações pessoais:
                        </ContentParagraph>
                        <ContentList>
                            <ContentListItem>Informações de contato, como nome, endereço de e-mail, número de telefone e endereço residencial, que você nos fornece ao se registrar ou entrar em contato conosco.</ContentListItem>
                            <ContentListItem>Informações de pagamento, como detalhes do cartão de crédito ou outras informações de pagamento, que você nos fornece para processar transações de aluguel.</ContentListItem>
                            <ContentListItem>Informações sobre imóveis e contratos de aluguel, incluindo endereço do imóvel, detalhes do contrato, histórico de pagamento e informações relacionadas.</ContentListItem>
                        </ContentList>
                        <br />
                        <ContentSubTitle>
                            Como Utilizamos Suas Informações
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Utilizamos as informações coletadas para:
                        </ContentParagraph>
                        <ContentList>
                            <ContentListItem>Facilitar o processo de aluguel e fornecer suporte relacionado aos nossos serviços.</ContentListItem>
                            <ContentListItem>Processar pagamentos de aluguel e garantir transações seguras.</ContentListItem>
                            <ContentListItem>Personalizar sua experiência, fornecendo recomendações de imóveis e comunicações relevantes.</ContentListItem>
                            <ContentListItem>Melhorar e otimizar nosso sistema de aluguel, incluindo análises e desenvolvimento de novos recursos.</ContentListItem>
                            <ContentListItem>Cumprir obrigações legais e regulamentares, como exigido por lei.</ContentListItem>
                        </ContentList>
                        <br />
                        <ContentSubTitle>
                            Compartilhamento de Informações
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para fornecer nossos serviços de aluguel, cumprir obrigações legais ou proteger nossos direitos.
                        </ContentParagraph>
                        <br />
                        <ContentSubTitle>
                            Segurança
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Implementamos medidas de segurança para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
                        </ContentParagraph>
                        <br />
                        <ContentSubTitle>
                            Seus Direitos
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Você tem o direito de acessar, corrigir, atualizar ou solicitar a exclusão de suas informações pessoais. Se você tiver alguma dúvida ou solicitação sobre suas informações, entre em contato conosco através das informações fornecidas abaixo.
                        </ContentParagraph>
                        <br />
                        <ContentSubTitle>
                            Alterações nesta Política de Privacidade
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças em nossas práticas de privacidade. Recomendamos revisar esta página regularmente para obter as informações mais recentes sobre nossas práticas de privacidade.
                        </ContentParagraph>
                        <br />
                        <ContentSubTitle>
                            Entre em Contato Conosco
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Se você tiver alguma dúvida ou preocupação sobre esta Política de Privacidade ou nossas práticas de privacidade, entre em contato conosco em:
                            <Link href="https://dev.escritoriooffset.com.br/"> Offset Dev</Link>
                        </ContentParagraph>
                    </ContentBody>
                </ContentContainer>
            </PoliticaContainer>
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    );
}

export default PoliticaPrivacidade;