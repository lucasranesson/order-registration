export interface ProductOrderType {
        id: number
        name: string
        price: number
        qty: number
}

export interface ProductStockType {
    id: number
    name: string
    price: number
    qty_stock: number
}
export interface OrderType {
    order: number
    client: string
    deliveryDate: string,
    total: number,
    orderProducts: {
        id: number
        name: string
        price: number
        qty_stock: number
        qty: number

    };
}