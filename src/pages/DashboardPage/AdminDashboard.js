import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { FiDollarSign, FiHome, FiUserCheck, FiActivity } from "react-icons/fi";
import { Line, Doughnut } from "react-chartjs-2";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
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
    StatusPill
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
        labels: data.graficos?.receitaMensal?.map(item => item.mes) || ['Jan', 'Fev', 'Mar'],
        datasets: [
            {
                label: 'Faturamento (R$)',
                data: data.graficos?.receitaMensal?.map(item => item.valor) || [0, 0, 0],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ],
    };

    const distributionChartData = {
        labels: ['Aluguel', 'Energia', 'Multas/Outros'],
        datasets: [
            {
                data: [
                    data.faturamento?.aluguel || 0,
                    data.faturamento?.energia || 0,
                    data.faturamento?.outros || 0
                ],
                backgroundColor: ['#3b82f6', '#f59e0b', '#ef4444'],
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

    return (
        <>
            <StatsGrid>
                <InfoCard>
                    <IconBox color="#10b981">
                        <FiDollarSign />
                    </IconBox>
                    <CardContent>
                        <CardTitle>Faturamento Total</CardTitle>
                        <StatNumber>
                            R$ {data.faturamento?.total?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </StatNumber>
                        <StatBadge $positive={true}>Receita Mensal</StatBadge>
                    </CardContent>
                </InfoCard>

                <InfoCard>
                    <IconBox color="#3b82f6">
                        <FiHome />
                    </IconBox>
                    <CardContent>
                        <CardTitle>Ocupação</CardTitle>
                        <StatNumber>
                            {data.ocupacao?.ocupados}/{data.ocupacao?.total}
                        </StatNumber>
                        <StatBadge $positive={data.ocupacao?.porcentagem > 50}>
                            {data.ocupacao?.porcentagem}% Ocupado
                        </StatBadge>
                    </CardContent>
                </InfoCard>

                <InfoCard>
                    <IconBox color="#f59e0b">
                        <FiUserCheck />
                    </IconBox>
                    <CardContent>
                        <CardTitle>Clientes Ativos</CardTitle>
                        <StatNumber>{data.clientes?.ativos}</StatNumber>
                        <span style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '5px' }}>
                            {data.clientes?.pendentes} pendentes de aprovação
                        </span>
                    </CardContent>
                </InfoCard>

                <InfoCard>
                    <IconBox color="#8b5cf6">
                        <FiActivity />
                    </IconBox>
                    <CardContent>
                        <CardTitle>Contratos Vigentes</CardTitle>
                        <StatNumber>{data.contratosAtivos}</StatNumber>
                        <StatBadge $positive={true}>Em dia</StatBadge>
                    </CardContent>
                </InfoCard>
            </StatsGrid>

            <ChartsGrid>
                <ChartCard>
                    <h3>Evolução do Faturamento</h3>
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <Line data={revenueChartData} options={commonOptions} />
                    </div>
                </ChartCard>

                <ChartCard>
                    <h3>Composição da Receita</h3>
                    <div style={{ flex: 1, minHeight: 0, padding: '10px' }}>
                        <Doughnut
                            data={distributionChartData}
                            options={{
                                ...commonOptions,
                                scales: { x: { display: false }, y: { display: false } }
                            }}
                        />
                    </div>
                </ChartCard>
            </ChartsGrid>

            <ChartCard style={{ minHeight: 'auto' }}>
                <h3>Transações Recentes</h3>
                <RecentActivityTable>
                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Valor</th>
                            <th>Vencimento</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.atividadesRecentes?.length > 0 ? (
                            data.atividadesRecentes.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ fontWeight: 500 }}>{item.clienteNome}</td>
                                    <td>R$ {item.valor?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                    <td>
                                        {item.dataVencimento
                                            ? format(new Date(item.dataVencimento), "dd 'de' MMM", { locale: ptBR })
                                            : '-'}
                                    </td>
                                    <td>
                                        <StatusPill status={item.status}>
                                            {item.status}
                                        </StatusPill>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: "2rem", color: "#9ca3af" }}>
                                    Nenhuma atividade registrada recentemente.
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