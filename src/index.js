import React from 'react';
import {ThemeProvider} from 'styled-components';
import colors from './styles/colors';

import './config/ReactotronConfig';

import Routes from './routes';
function App() {
  return (
    <ThemeProvider theme={colors}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
