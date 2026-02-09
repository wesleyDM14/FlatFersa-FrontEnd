import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { FiFileText, FiZap, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Bar } from "react-chartjs-2";
import { format } from 'date-fns';
import { getDashboardClient } from "../../services/dashboardService";
import {
    StatsGrid,
    InfoCard,
    ChartCard,
    IconBox,
    CardContent,
    CardTitle,
    StatNumber,
    StatBadge,
    RecentActivityTable,
    LoadingContainer,
    StatusPill,
    ActionButton
} from "./DashboardPage.styles";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ClientDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        getDashboardClient(setLoading, setData);
    }, []);

    if (loading || !data) {
        return (
            <LoadingContainer>
                <ThreeDots color="#10b981" height={80} width={80} />
            </LoadingContainer>
        );
    }

    const consumptionChartData = {
        labels: data.consumoEnergia?.labels || [],
        datasets: [
            {
                label: 'Consumo (kWh)',
                data: data.consumoEnergia?.data || [],
                backgroundColor: '#f59e0b',
                borderRadius: 4,
                barThickness: 40,
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom' },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.raw} kWh`
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { borderDash: [5, 5] },
                title: { display: true, text: 'kWh' }
            },
            x: {
                grid: { display: false }
            }
        }
    };

    const handleCopyPix = (pixCode) => {
        if (pixCode) {
            navigator.clipboard.writeText(pixCode);
            alert("Código PIX copiado!");
        } else {
            alert("Código PIX não disponível. Entre em contato com a administração.");
        }
    };

    return (
        <>
            <StatsGrid>
                <InfoCard>
                    <IconBox color={data.proximaFatura ? "#ef4444" : "#10b981"}>
                        {data.proximaFatura ? <FiAlertCircle /> : <FiCheckCircle />}
                    </IconBox>
                    <CardContent>
                        <CardTitle>Próxima Fatura</CardTitle>

                        {data.proximaFatura ? (
                            <>
                                <StatNumber>
                                    R$ {data.proximaFatura.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </StatNumber>
                                <StatBadge positive={false}>
                                    Vence em {format(new Date(data.proximaFatura.vencimento), 'dd/MM')}
                                </StatBadge>

                                <ActionButton
                                    onClick={() => handleCopyPix(data.proximaFatura.pixCopiaCola)}
                                >
                                    Copiar PIX
                                </ActionButton>
                            </>
                        ) : (
                            <>
                                <StatNumber>R$ 0,00</StatNumber>
                                <StatBadge positive={true}>Tudo pago!</StatBadge>
                                <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                    Você não tem pendências.
                                </p>
                            </>
                        )}
                    </CardContent>
                </InfoCard>

                <InfoCard>
                    <IconBox color="#f59e0b">
                        <FiZap />
                    </IconBox>
                    <CardContent>
                        <CardTitle>Consumo Atual</CardTitle>
                        <StatNumber>{data.leituraAtual || 0} kWh</StatNumber>
                        <span style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '5px' }}>
                            Leitura do mês vigente
                        </span>
                    </CardContent>
                </InfoCard>

                <InfoCard>
                    <IconBox color="#3b82f6">
                        <FiFileText />
                    </IconBox>
                    <CardContent>
                        <CardTitle>Meu Contrato</CardTitle>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <strong style={{ color: '#333' }}>
                                Apartamento {data.contrato?.apartamento || '--'}
                            </strong>
                            <span style={{ fontSize: '12px', color: '#666' }}>
                                Vencimento dia {data.contrato?.diaVencimento || '05'}
                            </span>
                        </div>
                    </CardContent>
                </InfoCard>
            </StatsGrid>

            <ChartCard>
                <h3>Histórico de Consumo de Energia</h3>
                <div style={{ height: '300px', width: '100%' }}>
                    <Bar
                        data={consumptionChartData}
                        options={chartOptions}
                    />
                </div>
            </ChartCard>

            <ChartCard style={{ minHeight: 'auto', marginTop: '20px' }}>
                <h3>Histórico de Pagamentos</h3>
                <RecentActivityTable>
                    <thead>
                        <tr>
                            <th>Mês/Ref</th>
                            <th>Vencimento</th>
                            <th>Valor Total</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.ultimosPagamentos?.length > 0 ? (
                            data.ultimosPagamentos.map((pag, index) => (
                                <tr key={index}>
                                    <td style={{ fontWeight: 500 }}>
                                        {pag.mesReferencia || '-'}
                                    </td>
                                    <td>
                                        {format(new Date(pag.vencimento), 'dd/MM/yyyy')}
                                    </td>
                                    <td>
                                        R$ {pag.valorTotal?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td>
                                        <StatusPill status={pag.status}>
                                            {pag.status}
                                        </StatusPill>
                                    </td>
                                    <td>
                                        {pag.status === 'PENDENTE' && (
                                            <button
                                                style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                                onClick={() => handleCopyPix(pag.pixCopiaCola)}
                                            >
                                                Pagar
                                            </button>
                                        )}
                                        {pag.status === 'PAGO' && (
                                            <span style={{ color: '#10b981', fontSize: '12px' }}>
                                                <FiCheckCircle style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                                                Pago
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center", padding: "2rem", color: "#9ca3af" }}>
                                    Nenhum histórico encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </RecentActivityTable>
            </ChartCard>
        </>
    );
};

export default ClientDashboard;