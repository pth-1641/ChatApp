import create from 'zustand';

const createStore = create((set) => ({
    currentUser: null,
    setUser: (user) => set({ currentUser: user }),
}));
