import React from 'react';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { AddForm } from './components/AddForm/AddForm';
import { OnePhoto } from './components/OnePhoto/OnePhoto';
import { AllPhotos } from './components/AllPhotos/AllPhotos';
import { Table } from './components/Table/Table';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/one',
      element: (
        <OnePhoto
          id="dd"
          title="loremipsum"
          photo="lorem Ipsum"
          description="lorem ipsum"
        />
      ),
    },
    { path: 'add', element: <AddForm /> },
    { path: '/', element: <AllPhotos /> },
    { path: 'table', element: <Table /> },
  ]);

  return <RouterProvider router={router} />;
}
