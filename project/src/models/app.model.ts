export interface IAppState {
  logoutModalOpen: boolean;
  appDrawerOpen: boolean;
  userMenuOpen: boolean;
}

export type StatusGroup = {
  key: number;
  value: string;
  colour?: string;
};
