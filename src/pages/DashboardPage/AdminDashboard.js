import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { FiDollarSign, FiHome, FiUserCheck, FiActivity } from "react-icons/fi";
import { Line, Doughnut } from "react-chartjs-2";
import { getDashboardAdmin } from "../../services/dashboardService";
import {
    StatsGrid,
    ChartsGrid,
    InfoCard,
    ChartCard,
    IconBox,
    CardContent,
    CardTitle,
    StatNumber,
    StatBadge,
    RecentActivityTable,
    LoadingContainer,
} from "./DashboardPage.styles";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    BarElement,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        getDashboardAdmin(setLoading, setData);
    }, []);

    if (loading || !data) {
        return (
            <LoadingContainer>
                <ThreeDots color="#3b82f6" height={80} width={80} />
            </LoadingContainer>
        );
    }

    const revenueChartData = {
        labels: data.charts?.monthlyRevenue?.labels || [],
        datasets: [
            {
                label: 'Faturamento Recebido (R$)',
                data: data.charts?.monthlyRevenue?.data || [],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ],
    };

    const statusFinanceiroData = {
        labels: data.charts?.statusFinanceiroMes?.labels || ['Recebido', 'A Receber'],
        datasets: [
            {
                data: data.charts?.statusFinanceiroMes?.data || [0, 0],
                backgroundColor: ['#10b981', '#f59e0b'],
                borderWidth: 0,
                hoverOffset: 4
            },
        ],
    };

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: { family: "'Inter', sans-serif", size: 12 }
                }
            }
        },
        scales: {
            x: { grid: { display: false } },
            y: {
                beginAtZero: true,
                grid: { borderDash: [5, 5], color: '#e5e7eb' },
                ticks: { callback: (value) => `R$ ${value}` }
            }
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
    };

    const formatMoney = (value) => (value || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 });

    return (
        <>
            <StatsGrid>
                <InfoCard>
                    <IconBox color="#10b981">
                        <FiDollarSign />
                    </IconBox>
                    <CardContent>
                        <CardTitle>Recebido no Mês</CardTitle>
                        <StatNumber>R$ {formatMoney(data.cards?.recebidoMes)}</StatNumber>
                        <StatBadge $positive={true}>Previsto: R$ {formatMoney(data.cards?.previstoMes)}</StatBadge>
                    </CardContent>
                </InfoCard>

                <InfoCard>
                    <IconBox color="#3b82f6">
                        <FiHome />
                    </IconBox>
                    <CardContent>
                        <CardTitle>Ocupação</CardTitle>
                        <StatNumber>{data.cards?.taxaOcupacao || 0}%</StatNumber>
                        <StatBadge $positive={data.cards?.taxaOcupacao > 50}>
                            Apartamentos ocupados
                        </StatBadge>
                    </CardContent>
                </InfoCard>

                <InfoCard>
                    <IconBox color="#ef4444">
                        <FiUserCheck />
                    </IconBox>
                    <CardContent>
                        <CardTitle>Inadimplência</CardTitle>
                        <StatNumber>R$ {formatMoney(data.cards?.atrasadoGeral)}</StatNumber>
                        <span style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '5px' }}>
                            {data.cards?.clientesPendentes} cliente(s) pendente(s) de aprovação
                        </span>
                    </CardContent>
                </InfoCard>

                <InfoCard>
                    <IconBox color="#8b5cf6">
                        <FiActivity />
                    </IconBox>
                    <CardContent>
                        <CardTitle>Contratos Vigentes</CardTitle>
                        <StatNumber>{data.cards?.contratosAtivos}</StatNumber>
                        <StatBadge $positive={true}>Ativos</StatBadge>
                    </CardContent>
                </InfoCard>
            </StatsGrid>

            <ChartsGrid>
                <ChartCard>
                    <h3>Faturamento Recebido no Ano</h3>
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <Line data={revenueChartData} options={commonOptions} />
                    </div>
                </ChartCard>

                <ChartCard>
                    <h3>Recebido vs. A Receber (mês)</h3>
                    <div style={{ flex: 1, minHeight: 0, padding: '10px' }}>
                        <Doughnut
                            data={statusFinanceiroData}
                            options={{
                                ...commonOptions,
                                scales: { x: { display: false }, y: { display: false } }
                            }}
                        />
                    </div>
                </ChartCard>
            </ChartsGrid>

            <ChartCard style={{ minHeight: 'auto' }}>
                <h3>Contratos Vencendo nos Próximos 30 Dias</h3>
                <RecentActivityTable>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Apartamento</th>
                            <th>Término</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.alerts?.contratosVencendo?.length > 0 ? (
                            data.alerts.contratosVencendo.map((item) => (
                                <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/contratos')}>
                                    <td style={{ fontWeight: 500 }}>{item.cliente}</td>
                                    <td>{item.apartamento}</td>
                                    <td>{new Date(item.vencimento).toLocaleDateString('pt-BR')}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center", padding: "2rem", color: "#9ca3af" }}>
                                    Nenhum contrato vencendo nos próximos 30 dias.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </RecentActivityTable>
            </ChartCard>
        </>
    );
};

export default AdminDashboard;
