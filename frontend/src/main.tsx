import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ContextProvider } from './store/index.tsx';
import './index.css';
import AppRouter from './AppRouter.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContextProvider>
      <AppRouter />
    </ContextProvider>
  </StrictMode>,
);
