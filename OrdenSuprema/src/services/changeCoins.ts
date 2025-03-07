export function changeCoins(money: number){
    // Un millon equivale a una moneda de asesino
    return Math.floor(money/1000000);
}