import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RoutesApp from './route/routes';
import { BrowserRouter } from 'react-router-dom';
import { PayProvider } from './context/payContext';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PayProvider>
    <React.StrictMode>
      <BrowserRouter>
        <RoutesApp />
        <ToastContainer />
      </BrowserRouter>
    </React.StrictMode>
  </PayProvider>
);

