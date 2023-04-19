export const CustomerStatusText = (s?: number) => {
  switch (s) {
    case 0:
      return 'Active';
    case 1:
      return 'Lead';
    case 2:
      return 'Non active';
    default:
      return 'Active';
  }
};
