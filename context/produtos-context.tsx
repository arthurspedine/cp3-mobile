import React, { createContext, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ProdutoType } from '../types';

type ProdutoContextType = {
    produtos: ProdutoType[]
    adicionarProduto: (produto: ProdutoType) => void
    removerProduto: (id: string) => void
}

const produtosFake: ProdutoType[] = [
    {
        id: uuidv4(),
        nome: "Moto Honda CG 160",
        dataFabricacao: "2023-02-15",
        prazoValidade: "2025-02-15",
        quantidade: 10,
        lote: "A1001",
        codBarras: "7891234567890",
        estado: "SP"
    },
    {
        id: uuidv4(),
        nome: "Yamaha Fazer 250",
        dataFabricacao: "2022-09-10",
        prazoValidade: "2024-09-10",
        quantidade: 5,
        lote: "B2043",
        codBarras: "7899876543210",
        estado: "RJ"
    },
    {
        id: uuidv4(),
        nome: "Suzuki GSR 150",
        dataFabricacao: "2023-06-01",
        prazoValidade: "2025-06-01",
        quantidade: 7,
        lote: "C3098",
        codBarras: "7894567891234",
        estado: "MG"
    },
    {
        id: uuidv4(),
        nome: "Kawasaki Ninja 300",
        dataFabricacao: "2021-12-05",
        prazoValidade: "2023-12-05",
        quantidade: 2,
        lote: "D4789",
        codBarras: "7893216549870",
        estado: "RS"
    },
    {
        id: uuidv4(),
        nome: "BMW G 310 R",
        dataFabricacao: "2023-04-20",
        prazoValidade: "2026-04-20",
        quantidade: 3,
        lote: "E5120",
        codBarras: "7896541237890",
        estado: "PR"
    }
];

export const ProdutoContext = createContext<ProdutoContextType>({} as ProdutoContextType);

export const ProdutoProvider = ({ children }: { children: React.ReactNode }) => {
    const [produtos, setProdutos] = useState<ProdutoType[]>(produtosFake);

    const adicionarProduto = (novoProduto: ProdutoType) => {
        setProdutos((prev) => [...prev, { ...novoProduto, id: uuidv4() }]);
    };

    const removerProduto = (id: string) => {
        setProdutos((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <ProdutoContext.Provider value={{ produtos, adicionarProduto, removerProduto }}>
            {children}
        </ProdutoContext.Provider>
    );
};

export function useProdutoContext() {
    const context = React.useContext(ProdutoContext)
    if (!context) {
        throw new Error(
            'useProdutoContext must be used within an ProdutoContext'
        )
    }
    return context
}