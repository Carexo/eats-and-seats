import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/client.ts';
import './styles/index.css';

import Layout from './components/Layout.tsx';
import DishDetails from './pages/Dish/DishDetails.tsx';
import SignUp from './pages/Auth/Signup/SignUp.tsx';
import SignIn from './pages/Auth/SignIn/SignIn.tsx';
import MenuPage from './pages/Menu/MenuPage.tsx';
import AdminDishDetails from './pages/Dashboard/AdminDishDetails';
import DishEditPage from './pages/Dashboard/DishEditPage';
import Provider from './store/Provider.tsx';
import AddDishPage from './pages/Dashboard/AddDishPage.tsx';
import DashboardLayout from './pages/Dashboard/DashboardLayout.tsx';
import OverviewUsers from './pages/Dashboard/OverviewUsers.tsx';
import OverviewDishes from './pages/Dashboard/OverviewDishes.tsx';
import ManageYourAccount from './pages/Dashboard/ManageYourAccount.tsx';
import HomePage from "./pages/Home/HomePage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="auth/signup" element={<SignUp />} />
              <Route path="auth/signin" element={<SignIn />} />
              <Route path="dishes/:id" element={<DishDetails />} />
              <Route path="menu" element={<MenuPage />} />
            </Route>
            <Route path="admin/" element={<DashboardLayout />}>
              <Route path="account" element={<ManageYourAccount />} />
              <Route path="dishes" element={<OverviewDishes />} />
              <Route path="dishdetails/:id" element={<AdminDishDetails />} />
              <Route path="dishes/edit/:id" element={<DishEditPage />} />
              <Route path="add-dish/" element={<AddDishPage />} />
              <Route path="users" element={<OverviewUsers />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
