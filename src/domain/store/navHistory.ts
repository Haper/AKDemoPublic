import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

export type NavHistoryStateType = {
  currentURL: string | null;
  previousURL: string | null;
  updateNavHistory: (pathname: string) => void;
};

export const useNavHistoryStore = create<NavHistoryStateType>()(
  // persist(
  devtools(
    (set, get) => ({
      currentURL: null,
      previousURL: null,
      updateNavHistory: (pathname: string) => {
        set({ currentURL: pathname, previousURL: get().currentURL }, undefined, 'updateNavHistory');
      },
    }),
    {
      name: 'nav-history'
    }
  ),
  // {
  //   name: 'nav-history',
  //   storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
  // }
  // ),
);

export const updateNavHistory = (pathname: string): void => {
  useNavHistoryStore.getState().updateNavHistory(pathname);
};
