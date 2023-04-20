export const dateUtil = {
  getUnix(): number {
    return Math.round(+new Date() / 1000);
  },
};
