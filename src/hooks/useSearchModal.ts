//state management with zustand

import { create } from "zustand"
interface LoginSearchStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoginSearch = create<LoginSearchStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useLoginSearch;