export const transformNumber = (num: string): number => parseFloat(parseFloat(num.replace(',', '.')).toFixed(2));
