import React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import MainLayout from '@layout/MainLayout';

const App = () => {
  const element = useRoutes(routes);
  return (
    <div className="App">
      <MainLayout>{element}</MainLayout>
    </div>
  );
};

export default App;
