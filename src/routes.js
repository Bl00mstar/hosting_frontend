import React from 'react';

// import Home from '@views/Home';
// import About from '@views/About';

export const routes = [
  {
    description: 'Home',
    path: '/',
    element: <div>home</div>,
  },
  {
    description: 'Login',
    path: '/account/login',
    element: <div>login</div>,
  },
  {
    description: 'Sign Up',
    path: '/account/signup',
    element: <div>signup</div>,
  },
];
