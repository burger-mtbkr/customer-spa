import { TStoreState } from '../reducers';
export const logoutModalOpen = (state: TStoreState): boolean => state.app.logoutModalOpen;

export const userMenuOpen = (state: TStoreState): boolean => state.app.userMenuOpen;

export const appDrawerOpen = (state: TStoreState): boolean => state.app.appDrawerOpen;
