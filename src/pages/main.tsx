import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProviderWrapper } from "../context/auth.context";
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom'; // ✅ IMPORTANTE

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> 
      <AuthProviderWrapper>
        <MantineProvider>
          <App />
        </MantineProvider>
      </AuthProviderWrapper>
    </BrowserRouter>
  </StrictMode>,
);