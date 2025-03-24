import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from "../../services/userService";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
    CardTitle,
    ChartCard,
    DashboardContainer,
    DashBoardHeaderContainer,
    Divider,
    HeaderTitle,
    IconContainer,
    InfoCard,
    LoadingContainer,
    MainDashboardContainer,
    RecentActivity,
    StatBadge,
    StatNumber,
    StatsGrid,
} from "./DashboardPage.styles";
import { ThreeDots } from "react-loader-spinner";
import { FiDollarSign, FiHome, FiUserCheck } from "react-icons/fi";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

// Configuração do Chart.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { getDashboardAdmin, getDashboardClient } from "../../services/dashboardService";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = ({ user }) => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dashboardData, setDashbaordData] = useState({});

    // Refs para os gráficos
    const lineChartRef = useRef(null);
    const pieChartRef = useRef(null);
    const doughnutChartRef = useRef(null);
    const barChartRef = useRef(null);

    const [metrics, setMetrics] = useState({
        totalGanho: 0,
        ganhoEnergia: 0,
        ganhoAluguel: 0,
        contratosAtivos: 0,
        apartamentosOcupados: 0,
        clientesPendentes: 0,
        recentActivities: []
    });

    const [chartData, setChartData] = useState({
        monthlyRevenue: {},
        revenueSplit: {},
        occupancy: {},
        clientStatus: {}
    });

    const openSidebar = () => {
        setSidebarOpen(true);
    }

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    useEffect(() => {
        if (user.accessToken && loading) {
            if (user.isAdmin) {
                getDashboardAdmin(user, (data) => {
                    setDashbaordData(data);

                    setMetrics({
                        totalGanho: data.totalGanho,
                        ganhoEnergia: data.ganhoEnergia,
                        ganhoAluguel: data.ganhoAluguel,
                        contratosAtivos: data.contratosAtivos,
                        apartamentosOcupados: data.apartamentosOcupados,
                        clientesPendentes: data.clientesPendentes,
                        recentActivities: data.recentActivities,
                    });

                    setChartData(data.chartData);
                }, setLoading);
            } else {
                getDashboardClient(user, setDashbaordData, setLoading);
            }
        }
    }, [user, loading]);

    useEffect(() => {
        // Limpeza dos gráficos ao desmontar
        return () => {
            [lineChartRef, pieChartRef, doughnutChartRef, barChartRef].forEach(chartRef => {
                if (chartRef.current) {
                    chartRef.current.destroy();
                    chartRef.current = null;
                }
            });
        };
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            }
        }
    };

    return (
        <div className="container">
            <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} navigate={navigate} logoutUser={logoutUser} homeActive={true} />
            {user.isAdmin ? (
                loading ? (
                    <LoadingContainer>
                        <ThreeDots
                            color={'#4e4e4e'}
                            height={49}
                            width={100}
                        />
                    </LoadingContainer>
                ) : (
                    <DashboardContainer>
                        <StatsGrid>
                            <InfoCard>
                                <IconContainer color="#10b981">
                                    <FiDollarSign size={24} />
                                </IconContainer>
                                <div>
                                    <CardTitle>Faturamento Total</CardTitle>
                                    <StatNumber>
                                        R$ {metrics.totalGanho.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                                    </StatNumber>
                                    <Divider />
                                    <div className="flex justify-between">
                                        <span>Aluguel: R$ {metrics.ganhoAluguel.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</span>
                                        <span style={{ marginLeft: '5px' }}>Energia: R$ {metrics.ganhoEnergia.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</span>
                                    </div>
                                </div>
                            </InfoCard>

                            <InfoCard>
                                <IconContainer color="#3b82f6">
                                    <FiHome size={24} />
                                </IconContainer>
                                <div>
                                    <CardTitle>Ocupação</CardTitle>
                                    <StatNumber>{metrics.apartamentosOcupados}/{dashboardData.totalApartamentos}</StatNumber>
                                    <Divider />
                                    <StatBadge color="#10b981">{((metrics.apartamentosOcupados / dashboardData.totalApartamentos) * 100).toFixed(2)}% ocupado</StatBadge>
                                </div>
                            </InfoCard>

                            <InfoCard>
                                <IconContainer color="#f59e0b">
                                    <FiUserCheck size={24} />
                                </IconContainer>
                                <div>
                                    <CardTitle>Clientes</CardTitle>
                                    <StatNumber>{metrics.clientesPendentes} pendentes</StatNumber>
                                    <Divider />
                                    <StatBadge color="#3b82f6">{dashboardData.clientesAtivos} ativos</StatBadge>
                                </div>
                            </InfoCard>
                        </StatsGrid>

                        <ChartCard>
                            <CardTitle>Faturamento Mensal</CardTitle>
                            <div style={{ height: '300px' }}>
                                <Line
                                    ref={lineChartRef}
                                    data={chartData.monthlyRevenue}
                                    options={chartOptions}
                                />
                            </div>
                        </ChartCard>

                        <StatsGrid>
                            <ChartCard>
                                <CardTitle>Distribuição de Receitas</CardTitle>
                                <div style={{ height: '300px' }}>
                                    <Pie
                                        ref={pieChartRef}
                                        data={chartData.revenueSplit}
                                        options={chartOptions}
                                    />
                                </div>
                            </ChartCard>

                            <ChartCard>
                                <CardTitle>Status dos Clientes</CardTitle>
                                <div style={{ height: '300px' }}>
                                    <Doughnut
                                        ref={doughnutChartRef}
                                        data={chartData.clientStatus}
                                        options={chartOptions}
                                    />
                                </div>
                            </ChartCard>

                            <ChartCard>
                                <CardTitle>Ocupação de Apartamentos</CardTitle>
                                <div style={{ height: '300px' }}>
                                    <Bar
                                        ref={barChartRef}
                                        data={chartData.occupancy}
                                        options={{
                                            ...chartOptions,
                                            scales: {
                                                y: {
                                                    type: 'linear',
                                                    beginAtZero: true
                                                },
                                                x: {
                                                    type: 'category'
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </ChartCard>
                        </StatsGrid>

                        <RecentActivity>
                            <CardTitle>Últimos Pagamentos</CardTitle>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Contrato</th>
                                        <th>Valor</th>
                                        <th>Data</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {metrics.recentActivities.map(activity => (
                                        <tr key={activity.id}>
                                            <td>{activity.cliente}</td>
                                            <td>R$ {(activity.valor).toFixed(2)}</td>
                                            <td>
                                                {format(activity.data, "dd 'de' MMMM", { locale: ptBR })}
                                            </td>
                                            <td>
                                                <StatBadge
                                                    color={activity.status === 'PAGO' ? '#10b981' : '#eab308'}>
                                                    {activity.status}
                                                </StatBadge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </RecentActivity>
                    </DashboardContainer>
                )
            ) : (
                <MainDashboardContainer>
                    {
                        loading ? (
                            <LoadingContainer>
                                <ThreeDots
                                    color={'#4e4e4e'}
                                    height={49}
                                    width={100}
                                />
                            </LoadingContainer>
                        ) : (
                            <DashboardContainer>
                                <DashBoardHeaderContainer>
                                    <HeaderTitle>Dashboard do Cliente</HeaderTitle>
                                </DashBoardHeaderContainer>
                                <StatsGrid>
                                    <ChartCard>
                                        <CardTitle>Parcelas Pagas vs Restantes</CardTitle>
                                        <Pie
                                            ref={doughnutChartRef}
                                            data={{
                                                labels: dashboardData.chartData.parcelasStatus.labels,
                                                datasets: dashboardData.chartData.parcelasStatus.datasets,
                                            }}
                                            options={{
                                                responsive: true,  // Mantém responsivo, mas sem crescer infinitamente
                                                maintainAspectRatio: false, // Permite definir altura manualmente
                                                layout: {
                                                    padding: 20, // Adiciona um padding interno
                                                },
                                                plugins: {
                                                    legend: {
                                                        position: "top", // Mantém a legenda no rodapé
                                                    },
                                                },
                                            }}
                                        />
                                    </ChartCard>

                                    <RecentActivity>
                                        <CardTitle>Próximas Parcelas</CardTitle>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Vencimento</TableCell>
                                                    <TableCell>Valor</TableCell>
                                                    <TableCell>Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {dashboardData.recentPayments.map((parcela, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{new Date(parcela.dataVencimento).toLocaleDateString()}</TableCell>
                                                        <TableCell>R$ {parcela.valor}</TableCell>
                                                        <TableCell>
                                                            <StatBadge color={parcela.status === 'PAGO' ? '#10b981' : '#eab308'}>{parcela.status}</StatBadge>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </RecentActivity>
                                </StatsGrid>
                            </DashboardContainer>
                        )
                    }
                </MainDashboardContainer>
            )}
            <Navbar openSidebar={openSidebar} logout={logoutUser} navigate={navigate} />
        </div>
    )
}

const mapStateToProps = ({ session }) => ({
    user: session.user
});

export default connect(mapStateToProps)(Dashboard);