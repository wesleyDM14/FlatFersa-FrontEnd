import axios from "axios";
import { saveAs } from "file-saver";

export const getContratos = async (user, setContratos, setLoading, setContratoAtivo, setContratosInfo, setContratosAtivos, setContratosSolicitacao) => {
    if (user.isAdmin) {
        await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/contratos', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        }).then(async (response) => {
            setContratos(response.data);
            await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/contratos-infos', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.accessToken}`,
                }
            }).then((response) => {
                setContratosInfo(response.data);
                let contratos = response.data;

                let ativos = [];
                let solicitacoes = [];

                for (let index = 0; index < contratos.length; index++) {
                    const contrato = contratos[index];
                    if (contrato.contrato.statusContrato === 'ATIVO') {
                        ativos.push(contrato);
                    } else if (contrato.contrato.statusContrato === 'AGUARDANDO') {
                        solicitacoes.push(contrato)
                    }
                }

                setContratosAtivos(ativos);
                setContratosSolicitacao(solicitacoes);
                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                console.log(err.message);
            });
        }).catch((err) => {
            setLoading(false);
            console.log(err.message);
        });
    } else {
        await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/contratos-cliente', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        }).then((response) => {
            let contratos = response.data;
            for (let index = 0; index < contratos.length; index++) {
                const element = contratos[index];
                if (element.contrato.statusContrato === 'ATIVO' || element.contrato.statusContrato === 'AGUARDANDO') {
                    setContratoAtivo(true);
                    break;
                }
            }
            setContratos(contratos);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            console.log(err.message);
        });
    }

}

export const createContrato = async (contrato, user, navigate, setSubmitting, setFieldError) => {

    if (user.isAdmin) {
        await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/contratos', contrato, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        }).then((response) => {
            console.log(response.data);
            setSubmitting(false);
            navigate('/contratos');
        }).catch((err) => {
            setSubmitting(false);
            setFieldError('valorAluguel', err.response.data.message);
        });
    } else {
        await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/contratos/solicitar', contrato, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        }).then((response) => {
            console.log(response.data);
            setSubmitting(false);
            navigate('/contratos');
        }).catch((err) => {
            setSubmitting(false);
            setFieldError('duracaoContrato', err.response.data.message);
        });
    }

}

export const getContratoById = async (user, contratoId, setContrato) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/contratos/${contratoId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        let contrato = response.data;
        setContrato(contrato);
    }).catch((err) => {
        console.log(err.message);
    });
}

export const downloadContract = async (user, contratoId, setIsDownloading) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/contratos/download/${contratoId}`, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${user.accessToken}`,
        },
        responseType: 'arraybuffer'
    }
    ).then((response) => {
        const { data } = response;
        const blob = new Blob([data], { type: 'application/pdf' });
        saveAs(blob, 'contrato.pdf');
        setIsDownloading(false);
    }).catch((err) => {
        console.log(err.message);
        setIsDownloading(false);
    });
}

export const approveContract = async (user, contract, setSubmitting, setFieldError, setLoading) => {
    await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/contratos/aprovar', contract, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`
        }
    }).then((response) => {
        console.log(response.data);
        setSubmitting(false);
        setLoading(true);
    }).catch((err) => {
        console.log(err.message);
        setFieldError('limiteKwh', err.message);
    });
}

export const desapproveContract = async (user, contratoId, setLoading) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/contratos/reprovar/${contratoId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`
        }
    }).then((response) => {
        console.log(response.data);
        setLoading(true);
    }).catch((err) => {
        console.log(err.message);
        window.alert('Error: ', err.message);
    });
}

export const deleteContratoById = async (user, contratoId, setLoading) => {
    await axios.delete(process.env.REACT_APP_BACKEND_URL + `/api/contratos/${contratoId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        console.log(response.data);
        setLoading(true);
    }).catch((err) => {
        console.log(err.message);
    });
}
