import { create } from 'zustand';

interface SubModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSubModal = create<SubModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSubModal;
