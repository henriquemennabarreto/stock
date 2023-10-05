export interface IProduto {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface ICreateProdutoRequest {
    name: string;
    price: number;
    quantity: number;
}

export interface IUpdateProdutoRequest {
    id: string;
    name?: string;
    price?: number;
    quantity?: number;
}

export interface ICreateProdutoResponse {
    item: IProduto;
}

export interface IUpdateProdutoResponse {
    message: string;
}
