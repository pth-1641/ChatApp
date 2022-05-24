import create from 'zustand';

const useStore = create((set) => ({
    user: {},
    setUser: (userInfo) => set(() => ({ user: userInfo })),
}));

export default useStore;
