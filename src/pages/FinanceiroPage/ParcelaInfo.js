import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";

import { logoutUser } from "../../services/userService";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { aprovarPagamento, gerarCodigoPix, getParcelaById, marcarPago, marcarPendente, registrarLeitura, registrarPagamento, reprovarPagamento } from "../../services/financeiroService";
import {
    BackButton,
    ComprovanteContainer,
    ComprovanteIconContainer,
    ComprovanteImg,
    ComprovanteTitle,
    LoadingContainer,
    PdfPreview,
    PredioValue,
    PrestacaoDetailButtonContainer,
    PrestacaoDetailHeaderContainer,
    PrestacaoDetailHeaderTitle,
    PrestacaoDetailLabel,
    PrestacaoDetailLeftColumn,
    PrestacaoDetailMainContainer,
    PrestacaoDetailPagamentoContainer,
    PrestacaoDetailRightColumn,
    PrestacaoDetailValue,
    PrestacaoDetailValueContainer,
    PrestcaoDetailContentContainer,
    QrCodeCopiaECola,
    QrCodeCopiaEColaContainer,
    QrCodePagamento,
    SubmitButton,
    WaitingContainer,
    WaitingIcon,
    WaitingTitle
} from "./FinanceiroPage.styles";
import { ThreeDots } from "react-loader-spinner";
import { FaCheck, FaClock, FaCloudUploadAlt, FaFileInvoice, FaFilePdf } from "react-icons/fa";

import Modal from "react-modal";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { modalStyles } from "../../styles/ModalStyles";
import { FormInput } from "../../components/FormLib";
import { ButtonGroup, ClientCounter, ContentIconContainer, FormInputArea, FormInputLabel, Image, StyledFileArea, StyledFileIconContainer, StyledFileInput, StyledFileInputTitle, StyledFileLegend, StyledFormArea } from "../ClientPage/ClientPage.styles";
import { FormInputLabelRequired, RejectButton } from "../ContractPage/ContractPage.styles";

const ParcelaInfo = ({ user }) => {
    Modal.setAppElement(document.getElementById('root'));
    const navigate = useNavigate();
    const { prestacaoId } = useParams();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [parcela, setParcela] = useState({});
    const [parcelaInfos, setParcelasInfo] = useState({});
    const [imgb64, setImgb64] = useState(undefined);
    const [copiaCola, setCopiCola] = useState('');
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const [modalLeituraIsOpen, setModalLeituraIsOpen] = useState(false);
    const [modalPagamentoIsOpen, setModalPagamentoIsOpen] = useState(false);

    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileType, setFileType] = useState(null);

    const monthNames = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    const getMesName = (id) => {
        return monthNames[id - 1];
    }

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    const openModalLeitura = () => {
        setModalLeituraIsOpen(true);
    }

    const closeModalLeitura = () => {
        setModalLeituraIsOpen(false);
    }

    const openModalPagamento = () => {
        setModalPagamentoIsOpen(true);
    }

    const closeModalPagamento = () => {
        setModalPagamentoIsOpen(false);
    }

    const handleFileChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        setFieldValue('comprovante', file);
        if (file) {
            setFileType(file.type);
            if (file.type.startsWith('image/')) {
                setPreviewUrl(URL.createObjectURL(file));
            } else if (file.type === 'application/pdf') {
                setPreviewUrl(null);
            }
        }
    }

    const isImage = (url) => {
        return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
    }

    useEffect(() => {
        if (loading && user.accessToken) {
            getParcelaById(user, prestacaoId, setParcela, setParcelasInfo, setLoading);
        }
    }, [user, loading, prestacaoId]);

    useEffect(() => {
        if (loading2 && user.accessToken) {
            gerarCodigoPix(user, prestacaoId, setImgb64, setLoading2, setCopiCola);
        }
    }, [user, loading2, prestacaoId]);


    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} />
            {
                loading || loading2 ? (
                    <LoadingContainer>
                        <ThreeDots
                            color={'#4e4e4e'}
                            height={49}
                            width={100}
                        />
                    </LoadingContainer>
                ) : (
                    user.isAdmin ? (
                        <PrestacaoDetailMainContainer>
                            <PrestacaoDetailHeaderContainer>
                                <PrestacaoDetailHeaderTitle>Aluguel - {parcela.mesReferencia === 0 ? 'Calção' : getMesName(parcela.mesReferencia)}</PrestacaoDetailHeaderTitle>
                                <PrestacaoDetailHeaderTitle>
                                    #Status: {parcela.statusPagamento}
                                </PrestacaoDetailHeaderTitle>
                            </PrestacaoDetailHeaderContainer>
                            <PrestcaoDetailContentContainer>
                                <PrestacaoDetailLeftColumn>
                                    <ComprovanteContainer>
                                        <ComprovanteTitle>Comprovante: </ComprovanteTitle>
                                        {
                                            parcela.linkComprovante ? (
                                                <PredioValue href={parcela.linkComprovante} target="_blank">
                                                    {
                                                        isImage(parcela.linkComprovante) ? (
                                                            <ComprovanteImg src={parcela.linkComprovante} />
                                                        ) : (
                                                            <FaFilePdf size={48} style={{marginTop: '15px'}}/>
                                                        )
                                                    }
                                                </PredioValue>
                                            ) :
                                                parcela.statusPagamento === 'PAGO' ? (
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginTop: '25px'
                                                    }}>
                                                        <ComprovanteIconContainer>
                                                            <FaCheck />
                                                        </ComprovanteIconContainer>
                                                        <h4>Parcela marcada como PAGA</h4>
                                                    </div>
                                                ) : (
                                                    <div style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        marginTop: '25px'
                                                    }}>
                                                        <ComprovanteIconContainer>
                                                            <FaClock />
                                                        </ComprovanteIconContainer>
                                                        <h4>Aguardando Envio de Comprovante</h4>
                                                    </div>

                                                )
                                        }
                                    </ComprovanteContainer>
                                </PrestacaoDetailLeftColumn>
                                <PrestacaoDetailRightColumn>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Cliente: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>{parcelaInfos.cliente.name}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Nº Apartamento: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>{parcelaInfos.apartamento.numero}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Ultima Leitura do Contador: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>{parcelaInfos.contrato.leituraAtual}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Mês Referência: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>{parcela.mesReferencia === 0 ? 'Calção' : getMesName(parcela.mesReferencia)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Data de Vencimento: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>{new Date(parcela.dataVencimento).toLocaleDateString()}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    {
                                        parcela.mesReferencia !== 0 && (
                                            <PrestacaoDetailValueContainer>
                                                <PrestacaoDetailLabel>Consumo de Energia: </PrestacaoDetailLabel>
                                                <PrestacaoDetailValue>{parcela.consumoKWh !== 0 ? parcela.consumoKWh + ' kWh' : 'Sem leitura no momento'} </PrestacaoDetailValue>
                                            </PrestacaoDetailValueContainer>
                                        )
                                    }
                                    {
                                        parcela.mesReferencia !== 0 && (
                                            <PrestacaoDetailValueContainer>
                                                <PrestacaoDetailLabel>Uso do Rateio de Energia: </PrestacaoDetailLabel>
                                                <PrestacaoDetailValue>{parcela.valorExcedenteKWh ? 'R$ ' + parseFloat(parcela.valorExcedenteKWh).toFixed(2) : 'R$ 0.00'} </PrestacaoDetailValue>
                                            </PrestacaoDetailValueContainer>
                                        )
                                    }
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Multa: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>R$ {parseFloat(parcela.multa).toFixed(2)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Valor Aluguel: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>R$ {parseFloat(parcela.valor).toFixed(2)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel className="strong">Valor Total: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue className="strong">R$ {parseFloat(parcela.valor + parcela.multa + parcela.valorExcedenteKWh).toFixed(2)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailButtonContainer>
                                        <BackButton onClick={() => navigate('/financeiro')}>Voltar</BackButton>
                                        {
                                            (parcela.mesReferencia !== 0 && parcela.consumoKWh === 0 && parcela.statusPagamento !== 'PAGO') && (
                                                <SubmitButton onClick={openModalLeitura}>
                                                    Registar Leitura
                                                </SubmitButton>
                                            )
                                        }
                                        {
                                            (parcela.linkComprovante && parcela.statusPagamento === 'AGUARDANDO') && (
                                                <SubmitButton onClick={async () => {
                                                    await aprovarPagamento(user, parcela.id, setLoading);
                                                }}>
                                                    Aprovar Pagamento
                                                </SubmitButton>
                                            )
                                        }
                                        {
                                            (parcela.statusPagamento !== 'PAGO') && (
                                                <SubmitButton onClick={async () => {
                                                    const isConfirmed = window.confirm('Você tem certeza?');
                                                    if (isConfirmed) {
                                                        await marcarPago(user, parcela.id, setLoading);
                                                    }
                                                }}>
                                                    Marcar como Pago
                                                </SubmitButton>
                                            )
                                        }
                                        {
                                            (parcela.statusPagamento === 'PAGO') && (
                                                <RejectButton onClick={async () => {
                                                    const isConfirmed = window.confirm('Você tem certeza?');
                                                    if (isConfirmed) {
                                                        await marcarPendente(user, parcela.id, setLoading);
                                                    }
                                                }}>
                                                    Marcar como Pendente
                                                </RejectButton>
                                            )
                                        }
                                        {
                                            (parcela.linkComprovante && parcela.statusPagamento === 'AGUARDANDO') && (
                                                <RejectButton onClick={async () => {
                                                    await reprovarPagamento(user, parcela.id, setLoading);
                                                }}>
                                                    Reprovar Pagamento
                                                </RejectButton>
                                            )
                                        }
                                    </PrestacaoDetailButtonContainer>
                                </PrestacaoDetailRightColumn>
                            </PrestcaoDetailContentContainer>
                            <Modal
                                isOpen={modalLeituraIsOpen}
                                onRequestClose={closeModalLeitura}
                                style={modalStyles}
                            >
                                <StyledFormArea>
                                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                                        <ContentIconContainer>
                                            <FaFileInvoice />
                                        </ContentIconContainer>
                                        <ClientCounter>Registrar Leitura Contador</ClientCounter>
                                    </div>
                                    <Formik
                                        initialValues={{
                                            novaLeitura: 0,
                                            prestacaoId: parcela.id
                                        }}
                                        validationSchema={
                                            Yup.object({
                                                novaLeitura: Yup.number().min(0).required('Obrigatório'),
                                            })
                                        }
                                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                            await registrarLeitura(user, values, setLoading, setSubmitting, setFieldError, closeModalLeitura);
                                        }}
                                    >
                                        {
                                            ({ isSubmitting }) => (
                                                <Form>
                                                    <FormInputArea>
                                                        <FormInputLabelRequired>Leitura do Contador</FormInputLabelRequired>
                                                        <FormInput
                                                            type='number'
                                                            step='1'
                                                            min='0'
                                                            name='novaLeitura'
                                                            placeholder='Digite a leitura do Contador'
                                                        />
                                                    </FormInputArea>
                                                    <ButtonGroup>
                                                        <BackButton type='button' onClick={() => closeModalLeitura()}>Voltar</BackButton>
                                                        {
                                                            !isSubmitting && (
                                                                <SubmitButton type="submit">Registrar</SubmitButton>
                                                            )
                                                        }
                                                        {
                                                            isSubmitting && (
                                                                <ThreeDots
                                                                    color={'#4e4e4e'}
                                                                    height={49}
                                                                    width={100}
                                                                />
                                                            )
                                                        }
                                                    </ButtonGroup>
                                                </Form>
                                            )
                                        }
                                    </Formik>
                                </StyledFormArea>
                            </Modal>
                        </PrestacaoDetailMainContainer>
                    ) : (
                        <PrestacaoDetailMainContainer>
                            <PrestacaoDetailHeaderContainer>
                                <PrestacaoDetailHeaderTitle>Aluguel - {parcela.mesReferencia === 0 ? 'Calção' : getMesName(parcela.mesReferencia)}</PrestacaoDetailHeaderTitle>
                                <PrestacaoDetailHeaderTitle>
                                    #Status: {parcela.statusPagamento}
                                </PrestacaoDetailHeaderTitle>
                            </PrestacaoDetailHeaderContainer>
                            <PrestcaoDetailContentContainer>
                                <PrestacaoDetailLeftColumn>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Mês Referência: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>{parcela.mesReferencia === 0 ? 'Calção' : getMesName(parcela.mesReferencia)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Data de Vencimento: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>{new Date(parcela.dataVencimento).toLocaleDateString()}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    {
                                        parcela.mesReferencia !== 0 && (
                                            <PrestacaoDetailValueContainer>
                                                <PrestacaoDetailLabel>Consumo de Energia: </PrestacaoDetailLabel>
                                                <PrestacaoDetailValue>{parcela.consumoKWh ? parcela.consumoKWh + ' kWh' : 'Sem leitura no momento'} </PrestacaoDetailValue>
                                            </PrestacaoDetailValueContainer>
                                        )
                                    }
                                    {
                                        parcela.mesReferencia !== 0 && (
                                            <PrestacaoDetailValueContainer>
                                                <PrestacaoDetailLabel>Valor do Consumo de Energia: </PrestacaoDetailLabel>
                                                <PrestacaoDetailValue>{parcela.valorExcedenteKWh ? 'R$ ' + parseFloat(parcela.valorExcedenteKWh).toFixed(2) : 'R$ 0.00'} </PrestacaoDetailValue>
                                            </PrestacaoDetailValueContainer>
                                        )
                                    }
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Multa: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>R$ {parseFloat(parcela.multa).toFixed(2)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel>Valor Aluguel: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue>R$ {parseFloat(parcela.valor).toFixed(2)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                    <PrestacaoDetailValueContainer>
                                        <PrestacaoDetailLabel className="strong">Valor Total: </PrestacaoDetailLabel>
                                        <PrestacaoDetailValue className="strong">R$ {parseFloat(parcela.valor + parcela.multa + parcela.valorExcedenteKWh).toFixed(2)}</PrestacaoDetailValue>
                                    </PrestacaoDetailValueContainer>
                                </PrestacaoDetailLeftColumn>
                                <PrestacaoDetailRightColumn>
                                    <PrestacaoDetailValueContainer className="hidden-responsive">
                                        <PrestacaoDetailLabel>Dados de Pagamento </PrestacaoDetailLabel>
                                    </PrestacaoDetailValueContainer>
                                    {
                                        (parcela.consumoKWh === 0 && parcela.mesReferencia !== 0) ? (
                                            <WaitingContainer>
                                                <WaitingTitle>Aguardando Fechamento</WaitingTitle>
                                                <WaitingIcon>
                                                    <FaClock />
                                                </WaitingIcon>
                                            </WaitingContainer>
                                        ) : (
                                            <PrestacaoDetailPagamentoContainer>
                                                <PrestacaoDetailValueContainer>
                                                    <PrestacaoDetailLabel>{parcela.statusPagamento === 'CANCELADO' ? 'Parcela Cancelada' : parcela.statusPagamento === 'PAGO' ? 'Parcela Paga' : parcela.statusPagamento === 'AGUARDANDO' ? 'Parcela Aguardando Confirmação' : 'QrCode'}</PrestacaoDetailLabel>
                                                </PrestacaoDetailValueContainer>
                                                <QrCodePagamento
                                                    src={imgb64}
                                                />
                                                {
                                                    (parcela.statusPagamento === 'PENDENTE' || parcela.statusPagamento === 'ATRASADO') && (
                                                        <>
                                                            <PrestacaoDetailValueContainer>
                                                                <PrestacaoDetailLabel>Pix Copia e Cola</PrestacaoDetailLabel>
                                                            </PrestacaoDetailValueContainer>
                                                            <QrCodeCopiaEColaContainer>
                                                                <QrCodeCopiaECola>
                                                                    {copiaCola}
                                                                </QrCodeCopiaECola>
                                                            </QrCodeCopiaEColaContainer>
                                                        </>
                                                    )
                                                }
                                            </PrestacaoDetailPagamentoContainer>
                                        )
                                    }
                                    <PrestacaoDetailButtonContainer>
                                        <BackButton onClick={() => navigate('/financeiro')}>Voltar</BackButton>
                                        {
                                            ((parcela.statusPagamento === 'PENDENTE' || parcela.statusPagamento === 'ATRASADO') && (parcela.consumoKWh !== 0 || parcela.mesReferencia === 0)) && (
                                                <SubmitButton onClick={() => openModalPagamento()}>Enviar Comprovante</SubmitButton>
                                            )
                                        }
                                    </PrestacaoDetailButtonContainer>
                                </PrestacaoDetailRightColumn>
                            </PrestcaoDetailContentContainer >
                            <Modal
                                isOpen={modalPagamentoIsOpen}
                                onRequestClose={closeModalPagamento}
                                style={modalStyles}
                            >
                                <StyledFormArea>
                                    <div style={{ display: 'flex', marginBottom: '30px' }}>
                                        <ContentIconContainer>
                                            <FaFileInvoice />
                                        </ContentIconContainer>
                                        <ClientCounter>Enviar Comprovante de Pagamento</ClientCounter>
                                    </div>
                                    <Formik
                                        initialValues={{
                                            comprovante: null,
                                            prestacaoId: parcela.id
                                        }}
                                        validationSchema={
                                            Yup.object().shape({
                                                comprovante: Yup.mixed().required('Comprovante é Obrigatório'),
                                            })
                                        }
                                        onSubmit={async (values, { setSubmitting, setFieldError }) => {
                                            await registrarPagamento(user, values, setLoading, setSubmitting, setFieldError, closeModalPagamento, setLoading2);
                                        }}
                                    >
                                        {
                                            ({ isSubmitting, setFieldValue, values }) => (
                                                <Form>
                                                    <FormInputArea>
                                                        <FormInputLabel>Comprovante</FormInputLabel>
                                                        <StyledFileArea>
                                                            {
                                                                previewUrl && fileType.startsWith('image/') ? (
                                                                    <Image
                                                                        src={previewUrl}
                                                                        alt="Preview"
                                                                    />
                                                                ) : fileType === 'application/pdf' ? (
                                                                    <PdfPreview>
                                                                        <FaFilePdf />
                                                                    </PdfPreview>
                                                                ) : (
                                                                    <div>
                                                                        <StyledFileIconContainer>
                                                                            <FaCloudUploadAlt />
                                                                        </StyledFileIconContainer>
                                                                        <StyledFileInputTitle>Clique para enivar o arquivo</StyledFileInputTitle>
                                                                        <StyledFileLegend>Tamanho máximo 5MB</StyledFileLegend>
                                                                    </div>
                                                                )
                                                            }
                                                            <StyledFileInput
                                                                type="file"
                                                                accept="image/*, application/pdf"
                                                                onChange={(event) => handleFileChange(event, setFieldValue)}
                                                            />
                                                        </StyledFileArea>
                                                    </FormInputArea>
                                                    <ButtonGroup>
                                                        <BackButton type='button' onClick={() => closeModalPagamento()}>Voltar</BackButton>
                                                        {
                                                            !isSubmitting && (
                                                                <SubmitButton type="submit">Registrar</SubmitButton>
                                                            )
                                                        }
                                                        {
                                                            isSubmitting && (
                                                                <ThreeDots
                                                                    color={'#4e4e4e'}
                                                                    height={49}
                                                                    width={100}
                                                                />
                                                            )
                                                        }
                                                    </ButtonGroup>
                                                </Form>
                                            )
                                        }
                                    </Formik>
                                </StyledFormArea>
                            </Modal>
                        </PrestacaoDetailMainContainer >
                    )
                )
            }
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div >
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(ParcelaInfo);