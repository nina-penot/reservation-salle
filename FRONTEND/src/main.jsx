// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ReservProvider } from './contexts/ReservContext.jsx';
//import './index.css';
import './assets/css/mycss.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ReservProvider>
          <App />
        </ReservProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);