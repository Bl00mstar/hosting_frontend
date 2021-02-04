import React from 'react';

import Login from '@views/Login';
import Signup from '@views/Signup';
import Home from '@views/Home';

import Create from '@containers/Create';
import Dashboard from '@containers/Dashboard';
import Settings from '@containers/Settings';
import Trash from '@containers/Trash';
import Upload from '@containers/Upload';
import Files from '@containers/Files';

import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import DeleteIcon from '@material-ui/icons/Delete';

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
    description: 'Your account',
    path: '/user/dashboard',
    element: <Dashboard />,
    type: ['private'],
  },
  {
    description: 'Dashboard',
    path: '/user/dashboard',
    element: <Dashboard />,
    icon: <DashboardIcon />,
    type: ['user'],
  },
  {
    description: 'Settings',
    path: '/user/settings',
    element: <Settings />,
    icon: <SettingsApplicationsIcon />,
    type: ['user'],
  },
  {
    description: 'Files tree',
    path: '/user/files',
    element: <Files />,
    icon: <AccountTreeIcon />,
    type: ['files'],
  },
  {
    description: 'Upload file',
    path: '/user/upload',
    element: <Upload />,
    icon: <CloudUploadIcon />,
    type: ['files'],
  },
  {
    description: 'New folder',
    path: '/user/create',
    element: <Create />,
    icon: <CreateNewFolderIcon />,
    type: ['files'],
  },
  {
    description: 'Trash folder',
    path: '/user/trash',
    element: <Trash />,
    icon: <DeleteIcon />,
    type: ['files'],
  },
];
