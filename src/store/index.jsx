import create from 'zustand';

export const useStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user: user }),
    modalName: '',
    setModalName: (modalName) => set({ modalName: modalName }),
}));
