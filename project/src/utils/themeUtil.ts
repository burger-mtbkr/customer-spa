import { createMuiTheme, Theme } from '@material-ui/core/styles';

export const themeUtil = {
  getTheme(): Theme {
    const palletType = 'light';

    const primaryMainColor = '#114ebd';
    const secondaryMainColor = '#114ebd';

    const primaryLightColor = '#5883d0';
    const secondaryLightColor = '#5883d0';

    const primaryDarkColor = '#08275e';
    const secondaryDarkColor = '#08275e';

    const contrastText = '#FFF';

    return createMuiTheme({
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
