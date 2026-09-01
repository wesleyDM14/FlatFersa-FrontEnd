// O backend guarda datas de vencimento/inicio/fim como "dia calendario" em UTC
// meia-noite (sem hora relevante). Usar toLocaleDateString direto em cima disso
// interpreta a data no fuso do navegador - no Brasil (UTC-3), isso faz a data
// "voltar" um dia (30/09 UTC vira 29/09 as 21h local). As funcoes abaixo sempre
// leem os componentes em UTC, evitando esse deslocamento.

const MESES_LONGOS = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
];

export function formatDateBR(dateInput) {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return '';
    const dia = String(date.getUTCDate()).padStart(2, '0');
    const mes = String(date.getUTCMonth() + 1).padStart(2, '0');
    const ano = date.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
}

export function formatMonthYearBR(dateInput) {
    if (!dateInput) return '';
    const date = new Date(dateInput);
    if (Number.isNaN(date.getTime())) return '';
    return `${MESES_LONGOS[date.getUTCMonth()]} de ${date.getUTCFullYear()}`;
}
