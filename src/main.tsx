import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router';
import './style.css';
import CountryPage from './components/CountryPage.tsx';
import Header from './components/Header.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Header />
      <BrowserRouter>
        <main>
          <div className="container">
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="country/:countryId" element={<CountryPage />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
