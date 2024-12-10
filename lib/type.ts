export type Category = {
    _id: string,
    name: string
}

export type Product = {
    _id: string,
    name: string,
    price: number,
    category: Category
}