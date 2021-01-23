import React from 'react';

import Login from '@views/Login';
import Signup from '@views/Signup';

export const routes = [
  {
    description: 'Home',
    path: '/',
    element: <div>home</div>,
  },
  {
    description: 'Login',
    path: '/account/login',
    element: <Login />,
  },
  {
    description: 'Sign Up',
    path: '/account/signup',
    element: <Signup />,
  },
];
