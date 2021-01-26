import React from 'react';

import Login from '@views/Login';
import Signup from '@views/Signup';
import Home from '@views/Home';

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
    element: <div>dashboard</div>,
    // icon:
    type: ['user'],
  },
  {
    description: 'Settings',
    path: '/user/settings',
    element: <div>settings</div>,
    // icon:
    type: ['user'],
  },
  {
    description: 'Upload file',
    path: '/user/upload',
    element: <div>upload</div>,
    type: ['files'],
  },
  {
    description: 'New folder',
    path: '/user/create',
    element: <div>new folder</div>,
    type: ['files'],
  },
  {
    description: 'Trash folder',
    path: '/user/trash',
    element: <div>trash foldeer</div>,
    type: ['files'],
  },
];
