export interface IProduto {
    id: string;
    nome: string;
    tipo: string;
    insumoId: string;
    insumoNome: string;
    quantidadeEstoque: number;
    dataProducao: string;
    dataValidade: string;
    quantidadeLote: number;
}

export interface ICreateProdutoRequest {
    nome: string;
    tipo: string;
    insumoId: string;
    insumoNome: string;
    quantidadeEstoque: number;
    dataProducao: string;
    dataValidade: string;
    quantidadeLote: number;
}

export interface IUpdateProdutoRequest {
    id: string;
    nome?: string;
    tipo?: string;
    insumoId?: string;
    insumoNome?: string;
    quantidadeEstoque?: number;
    dataProducao?: string;
    dataValidade?: string;
    quantidadeLote?: number;
}

export interface ICreateProdutoResponse extends IProduto {
}

export interface IUpdateProdutoResponse extends IProduto {
}
