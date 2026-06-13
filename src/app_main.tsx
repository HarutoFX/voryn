import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import VorynWorkspace from './components/VorynWorkspace.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VorynWorkspace />
  </StrictMode>
);
