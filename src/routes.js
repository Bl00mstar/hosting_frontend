import React from 'react';

import Login from '@views/Login';
import Signup from '@views/Signup';
import Home from '@views/Home';

import Create from '@containers/Create';
import Dashboard from '@containers/Dashboard';
import Settings from '@containers/Settings';
import Trash from '@containers/Trash';
import Upload from '@containers/Upload';

export const routes = [
  {
    description: 'Home',
    path: '/',
    element: <Home />,
    type: [],
  },
  {
    description: 'Login',
    path: '/account/login',
    element: <Login />,
    type: ['public'],
  },
  {
    description: 'Sign Up',
    path: '/account/signup',
    element: <Signup />,
    type: ['public'],
  },
  {
    description: 'Dashboard',
    path: '/user/dashboard',
    element: <Dashboard />,
    type: ['user'],
  },
  {
    description: 'Settings',
    path: '/user/settings',
    element: <Settings />,
    type: ['user'],
  },
  {
    description: 'Upload file',
    path: '/user/upload',
    element: <Upload />,
    type: ['files'],
  },
  {
    description: 'New folder',
    path: '/user/create',
    element: <Create />,
    type: ['files'],
  },
  {
    description: 'Trash folder',
    path: '/user/trash',
    element: <Trash />,
    type: ['files'],
  },
];
