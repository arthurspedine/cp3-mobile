import React, { createContext, useState } from 'react';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { ProdutoType } from '../types';

type ProdutoContextType = {
    produtos: ProdutoType[]
    adicionarProduto: (produto: ProdutoType) => void
    removerProduto: (id: string) => void
}

export const ProdutoContext = createContext<ProdutoContextType>({} as ProdutoContextType);

export const ProdutoProvider = ({ children }: { children: React.ReactNode }) => {
    const [produtos, setProdutos] = useState<ProdutoType[]>([]);

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