export function filterExpensiveProducts<T extends { price: number }>(
    items: T[],
    minPrice: number
): T[] {
    return items.filter(item => item.price >= minPrice);
}