import { createTheme, Theme } from '@material-ui/core/styles';

export const primaryMainColor = '#114ebd';
export const secondaryMainColor = '#114ebd';

export const primaryLightColor = '#5883d0';
export const secondaryLightColor = '#5883d0';

export const primaryDarkColor = '#08275e';
export const secondaryDarkColor = '#08275e';

export const contrastText = '#FFF';

export const themeUtil = {
  getTheme(): Theme {
    const palletType = 'light';

    return createTheme({
      palette: {
        type: palletType,
        primary: {
          light: primaryLightColor,
          main: primaryMainColor,
          dark: primaryDarkColor,
          contrastText: contrastText,
        },
        secondary: {
          light: secondaryLightColor,
          main: secondaryMainColor,
          dark: secondaryDarkColor,
          contrastText: contrastText,
        },
      },
    });
  },
};
