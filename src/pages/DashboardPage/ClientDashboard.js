import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { FiFileText, FiZap, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiTrendingDown, FiMinus } from "react-icons/fi";
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

const STATUS_LABELS = {
    PENDENTE: 'Pendente',
    EM_ANALISE: 'Em Análise',
    PAGO: 'Pago',
    ATRASADO: 'Atrasado',
    CANCELADO: 'Cancelado',
    CONTESTADO: 'Contestado'
};

const ClientDashboard = () => {
    const navigate = useNavigate();
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

    const temPendencias = (data.summary?.faturasEmAberto || 0) > 0;

    const TrendIcon = data.energyInsights?.status === 'Aumentou' ? FiTrendingUp
        : data.energyInsights?.status === 'Diminuiu' ? FiTrendingDown
            : FiMinus;

    return (
        <>
            <StatsGrid>
                <InfoCard>
                    <IconBox color={temPendencias ? "#ef4444" : "#10b981"}>
                        {temPendencias ? <FiAlertCircle /> : <FiCheckCircle />}
                    </IconBox>
                    <CardContent>
                        <CardTitle>Faturas em Aberto</CardTitle>

                        {temPendencias ? (
                            <>
                                <StatNumber>
                                    R$ {(data.summary?.valorPendente || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                </StatNumber>
                                <StatBadge $positive={false}>
                                    {data.summary.faturasEmAberto} fatura(s) pendente(s)
                                </StatBadge>
                                <ActionButton onClick={() => navigate('/meus-pagamentos')}>
                                    Ver Faturas
                                </ActionButton>
                            </>
                        ) : (
                            <>
                                <StatNumber>R$ 0,00</StatNumber>
                                <StatBadge $positive={true}>Tudo pago!</StatBadge>
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
                        <CardTitle>Consumo do Último Mês</CardTitle>
                        <StatNumber>{data.energyInsights?.consumoUltimoMes || 0} kWh</StatNumber>
                        <span style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '5px', display: 'flex', alignItems: 'center', gap: 5 }}>
                            <TrendIcon /> {data.energyInsights?.status || 'Estável'}
                        </span>
                    </CardContent>
                </InfoCard>

                <InfoCard>
                    <IconBox color="#3b82f6">
                        <FiFileText />
                    </IconBox>
                    <CardContent>
                        <CardTitle>Última Leitura</CardTitle>
                        <StatNumber>{data.energyInsights?.ultimaLeitura || 0} kWh</StatNumber>
                        <span style={{ fontSize: '12px', color: '#666' }}>
                            Registrado no medidor do apartamento
                        </span>
                    </CardContent>
                </InfoCard>
            </StatsGrid>

            <ChartCard style={{ minHeight: 'auto', marginTop: '20px' }}>
                <h3>Próximos Pagamentos</h3>
                <RecentActivityTable>
                    <thead>
                        <tr>
                            <th>Vencimento</th>
                            <th>Valor Total</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.nextPayments?.length > 0 ? (
                            data.nextPayments.map((pag) => (
                                <tr key={pag.id}>
                                    <td>{new Date(pag.vencimento).toLocaleDateString('pt-BR')}</td>
                                    <td>R$ {(pag.valor || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                                    <td>
                                        <StatusPill status={pag.status}>
                                            {STATUS_LABELS[pag.status] || pag.status}
                                        </StatusPill>
                                    </td>
                                    <td>
                                        <button
                                            style={{ color: '#3b82f6', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                            onClick={() => navigate(`/faturas/${pag.id}`)}
                                        >
                                            Ver Detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: "center", padding: "2rem", color: "#9ca3af" }}>
                                    Nenhum pagamento pendente.
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
