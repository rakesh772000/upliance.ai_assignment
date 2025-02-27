import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>
);