import axios from "axios";

export const getParcelas = async (user, setParcelas, setLoading, setParcelasAtrasados, setParcelasPagos, setParcelasPendentes, setParcelasInfo, setParcelasAguardando) => {
    if (user.isAdmin) {
        await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/aluguel', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        }).then(async (response) => {
            setParcelas(response.data);
            await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/aluguel/infos', {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.accessToken}`,
                }
            }).then((response) => {
                setParcelasInfo(response.data);
                let parcelas = response.data;

                let pagos = [];
                let pendentes = [];
                let atrasados = [];
                let aguardando = [];

                for (let index = 0; index < parcelas.length; index++) {
                    const parcela = parcelas[index];
                    if (parcela.prestacao.statusPagamento === 'PAGO') {
                        pagos.push(parcela);
                    } else if (parcela.prestacao.statusPagamento === 'PENDENTE') {
                        pendentes.push(parcela);
                    } else if (parcela.prestacao.statusPagamento === 'ATRASADO') {
                        atrasados.push(parcela);
                    } else if (parcela.prestacao.statusPagamento === 'AGUARDANDO') {
                        aguardando.push(parcela);
                    }
                }
                setParcelasPagos(pagos);
                setParcelasPendentes(pendentes);
                setParcelasAtrasados(atrasados);
                setParcelasAguardando(aguardando);
            }).catch((err) => {
                setLoading(false);
                console.log(err.message);
            });
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            console.log(err.message);
        });
    } else {
        await axios.get(process.env.REACT_APP_BACKEND_URL + '/api/aluguel-cliente', {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        }).then((response) => {
            setParcelas(response.data[0]);
            let parcelas = response.data[0];

            let pagos = [];
            let pendentes = [];
            let atrasados = [];

            for (let index = 0; index < parcelas.length; index++) {
                const parcela = parcelas[index];
                if (parcela.statusPagamento === 'PAGO') {
                    pagos.push(parcela);
                } else if (parcela.statusPagamento === 'PENDENTE') {
                    pendentes.push(parcela);
                } else if (parcela.statusPagamento === 'ATRASADO') {
                    atrasados.push(parcela);
                }
            }
            setParcelasPagos(pagos);
            setParcelasPendentes(pendentes);
            setParcelasAtrasados(atrasados);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            console.log(err.message);
        });
    }
}

export const getParcelaById = async (user, prestacaoId, setParcela, setParcelasInfo, setLoading) => {
    await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/aluguel/${prestacaoId}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then(async (response) => {
        setParcela(response.data);
        await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/aluguel/infos/${prestacaoId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.accessToken}`,
            }
        }).then((response) => {
            setParcelasInfo(response.data);
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            console.log(err.message);
        });
    }).catch((err) => {
        setLoading(false);
        console.error(err);
    });
}

export const gerarCodigoPix = async (user, prestacaoId, setImgb64, setLoading2, setCopiCola) => {
    let data = { prestacaoId: prestacaoId };
    await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/aluguel/generateQrCode', data, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.accessToken}`,
        }
    }).then((response) => {
        setImgb64(response.data.base64);
        setCopiCola(response.data.payload);
        setLoading2(false);
    }).catch(err => {
        console.error(err);
        setLoading2(false);
    });
}