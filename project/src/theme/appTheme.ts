import { Theme, createTheme } from '@material-ui/core/styles';

export const primaryMainColor = '#424A00';
export const secondaryMainColor = '#424A00';

export const primaryLightColor = '#424A00';
export const secondaryLightColor = '#424A00';

export const primaryDarkColor = '#424A00';
export const secondaryDarkColor = '#424A00';

export const contrastText = '#FFF';

export const selectionColor = '#d9dacc';

export const appTheme = {
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
