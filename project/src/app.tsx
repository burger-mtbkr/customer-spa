import Footer from './components/common/footer';
import HeaderBar from './components/common/header';
import CssBaseline from '@mui/material/CssBaseline';
import Routes from './routes/router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { themeUtil } from './utils';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from '../src/redux/store';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { messages } from './language';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  const theme = themeUtil.getTheme();
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
