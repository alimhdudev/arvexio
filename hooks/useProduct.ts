import { create } from 'zustand'

interface ProductStore {
    ids: string[];
    activeId?: string;
    setId: (id: string) => void;
    setIds: (ids: string[]) => void;
    reset: ()=>void;
}

const useProduct = create <ProductStore>((set)=>({
    ids: [],
    activeId: undefined,
    setId: (id: string) => set({activeId: id}),
    setIds: (ids: string[]) => set({ids: ids}),
    reset: () => set({ ids: [], activeId: undefined })
}))

export default useProduct;