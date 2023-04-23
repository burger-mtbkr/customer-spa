import { persistor, store } from '../src/redux/store';

import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Footer from './components/common/footer';
import HeaderBar from './components/common/header';
import { IntlProvider } from 'react-intl';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Routes from './routes/router';
import { appTheme } from './theme';
import { messages } from './language';

const App = () => {
  const theme = appTheme.getTheme();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <IntlProvider messages={messages} locale="en-nz" defaultLocale="en">
              <div className="App">
                <CssBaseline />
                <HeaderBar />
                <Routes />
                <Footer />
              </div>
            </IntlProvider>
          </MuiThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
