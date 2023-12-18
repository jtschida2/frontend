import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GearPage from './pages/gearPage'
import BackpackPage from './pages/backpackPage'
import TripPage from './pages/tripPage'
import GearInstancePage from "./pages/gearInstancePage"
import { GearContextProvider } from './context/GearContext';

import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
  path: "backpack",
  element:     
  <GearContextProvider>
  <BackpackPage />
  </GearContextProvider>

  },
  {
    path: "gear",
    element:     
    <GearContextProvider>
    <GearPage />
    </GearContextProvider>

  },
  {
    path: "trips",
    element: 
    <GearContextProvider>
    <TripPage />
    </GearContextProvider>

  },
  {
    path: "gearInstances",
    element:     
    <GearContextProvider>
    <GearInstancePage />
    </GearContextProvider>

  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);