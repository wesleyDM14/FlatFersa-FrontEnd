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
                            Última atualização: 30/08/2026
                        </ContentParagraph>
                        <br />
                        <ContentParagraph>
                            O FlatFersa ("nós", "nosso") disponibiliza uma plataforma de gestão de aluguéis, usada por
                            proprietários/administradores ("Administrador") e locatários ("Cliente", "você") para gerenciar
                            contratos de locação, cobranças, faturas, chamados de manutenção e comunicação entre as partes.
                            Esta Política de Privacidade explica quais dados pessoais coletamos, por que os coletamos, como
                            os protegemos e quais direitos você tem sobre eles, em conformidade com a Lei Geral de Proteção
                            de Dados (Lei nº 13.709/2018 - LGPD).
                        </ContentParagraph>

                        <ContentSubTitle>
                            1. Dados que Coletamos
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Para viabilizar um contrato de locação, coletamos:
                        </ContentParagraph>
                        <ContentList>
                            <ContentListItem>Dados de identificação: nome completo, CPF, RG, data de nascimento.</ContentListItem>
                            <ContentListItem>Dados de contato: e-mail, telefone e endereço residencial atual.</ContentListItem>
                            <ContentListItem>Documentos de identificação: fotos da frente e do verso do seu RG ou CNH, enviadas por você no cadastro.</ContentListItem>
                            <ContentListItem>Dados contratuais e financeiros: contratos de locação, valores de aluguel, histórico de faturas, comprovantes de pagamento e leituras de consumo de energia do imóvel alugado.</ContentListItem>
                            <ContentListItem>Chamados de manutenção: título, descrição e fotos que você opcionalmente anexa a um chamado aberto para o seu apartamento.</ContentListItem>
                        </ContentList>

                        <ContentSubTitle>
                            2. Para que Usamos Seus Dados
                        </ContentSubTitle>
                        <br />
                        <ContentList>
                            <ContentListItem>Formalizar, gerenciar e renovar o seu contrato de locação.</ContentListItem>
                            <ContentListItem>Calcular e cobrar faturas de aluguel e consumo de energia, incluindo geração de cobrança via PIX.</ContentListItem>
                            <ContentListItem>Verificar sua identidade durante a análise do seu cadastro como locatário.</ContentListItem>
                            <ContentListItem>Enviar avisos e notificações relacionados ao seu contrato, faturas e chamados de manutenção.</ContentListItem>
                            <ContentListItem>Cumprir obrigações legais, fiscais e contábeis (guarda de comprovantes e histórico financeiro).</ContentListItem>
                        </ContentList>

                        <ContentSubTitle>
                            3. Como Protegemos Seus Documentos
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Seus documentos de identificação e comprovantes de pagamento não ficam publicamente acessíveis:
                            o acesso a essas imagens exige estar autenticado no sistema, e somente você e o administrador
                            responsável pelo seu contrato podem visualizá-los. Senhas são armazenadas de forma criptografada
                            (nunca em texto puro), e o acesso ao painel administrativo é restrito a usuários autorizados.
                        </ContentParagraph>

                        <ContentSubTitle>
                            4. Compartilhamento de Informações
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Não vendemos nem compartilhamos seus dados pessoais com terceiros para fins de marketing.
                            Compartilhamos dados apenas com prestadores estritamente necessários para operar o serviço
                            (por exemplo, o serviço de envio de e-mails transacionais e o gerador de código PIX para
                            pagamento), ou quando exigido por lei ou ordem judicial.
                        </ContentParagraph>

                        <ContentSubTitle>
                            5. Por Quanto Tempo Guardamos Seus Dados
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Mantemos seus dados enquanto seu contrato estiver ativo e, após o encerramento, pelo prazo
                            necessário ao cumprimento de obrigações legais, fiscais e cíveis relacionadas a contratos de
                            locação (histórico de faturas e comprovantes de pagamento), findo o qual você pode solicitar
                            a exclusão dos seus dados pessoais conforme a seção 6 abaixo.
                        </ContentParagraph>

                        <ContentSubTitle>
                            6. Seus Direitos e Como Exercê-los
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Nos termos da LGPD, você tem direito a: confirmação da existência de tratamento, acesso aos
                            seus dados, correção de dados incompletos ou desatualizados, anonimização ou exclusão de dados
                            desnecessários, portabilidade e informação sobre com quem compartilhamos seus dados.
                        </ContentParagraph>
                        <ContentParagraph>
                            Você pode corrigir seus dados a qualquer momento na página <Link href="/perfil">Meu Perfil</Link>.
                            Para solicitar a <strong>exclusão da sua conta e dos seus dados pessoais</strong>, use o botão
                            "Solicitar Exclusão de Conta" na mesma página — a solicitação é analisada pelo administrador e,
                            se você não tiver contrato ativo, seus dados de identificação são anonimizados (o histórico de
                            faturas é preservado sem identificação direta, por obrigação fiscal). Se preferir, também pode
                            entrar em contato pelo e-mail abaixo.
                        </ContentParagraph>

                        <ContentSubTitle>
                            7. Alterações nesta Política
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Esta Política pode ser atualizada periodicamente para refletir mudanças em nossas práticas ou
                            na legislação aplicável. A data da última atualização está sempre indicada no topo desta página.
                        </ContentParagraph>

                        <ContentSubTitle>
                            8. Contato
                        </ContentSubTitle>
                        <br />
                        <ContentParagraph>
                            Dúvidas sobre esta Política ou sobre o tratamento dos seus dados pessoais podem ser enviadas para{' '}
                            <Link href="mailto:contato@flatfersa.com.br">contato@flatfersa.com.br</Link>.
                        </ContentParagraph>
                    </ContentBody>
                </ContentContainer>
            </PoliticaContainer>
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    );
}

export default PoliticaPrivacidade;
