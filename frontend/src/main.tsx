import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/client.ts';
import './styles/index.css';

import Layout from './components/Layout.tsx';
import DishDetails from "./components/DishDetails.tsx";
import SignUp from './pages/Auth/Signup/SignUp.tsx';
import SignIn from './pages/Auth/SignIn/SignIn.tsx';
import MenuPage from './pages/MenuPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/signin" element={<SignIn />} />
              <Route path="dish/:id" element={<DishDetails />}/>
              <Route path="/menu" element={<MenuPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
