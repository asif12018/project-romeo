import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './AuthProvider/AuthProvider.jsx'
import Time from './Pages/Time.jsx';
import Login from './Pages/Login.jsx';
import Waiting from './Pages/Waiting.jsx';
import ProtectedRoute from './Routes/ProtectedRoute.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import AdminRoute from './Routes/AdminRoute.jsx';
import ProtectLoginPage from './Routes/ProtectLoginPage.jsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children:[
      {
        path:"/",
        element:<ProtectedRoute><Time></Time></ProtectedRoute>
      },
      {
        path:"/login",
        element:<ProtectLoginPage><Login></Login></ProtectLoginPage>
      },
      {
        path:"/waiting",
        element:<Waiting></Waiting>
      }
    ]
  },
  {
    path:'dashboard',
    element:<AdminRoute><Dashboard></Dashboard></AdminRoute>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
