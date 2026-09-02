// Formata um numero com no maximo N casas decimais (sem forcar zeros a mais):
// 99 -> "99", 99.5 -> "99.5", 99.333333 -> "99.33". Util pra kWh/consumo, que as
// vezes acumula imprecisao de ponto flutuante (ex: 380.30000000000007).
export function formatNumber(value, maxDecimals = 2) {
    const num = Number(value);
    if (Number.isNaN(num)) return '';
    return parseFloat(num.toFixed(maxDecimals)).toString();
}
