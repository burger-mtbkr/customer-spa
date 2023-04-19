import Footer from './components/common/footer';
import HeaderBar from './components/common/header';
import CssBaseline from '@material-ui/core/CssBaseline';
import Routes from './routes/router';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { themeUtil } from './utils';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../src/redux/store';
import { Provider } from 'react-redux';

const App = () => {
  const theme = themeUtil.getTheme();
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <CssBaseline />
            <HeaderBar />
            <Routes />
            <Footer />
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
