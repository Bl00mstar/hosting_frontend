import React from 'react';
import Dashboard from '@pages/Dashboard';
import Files from '@pages/Files';
import Home from '@pages/Home';
import Login from '@pages/Login';
import NewFolder from '@pages/NewFolder';
import Register from '@pages/Register';
import Setting from '@pages/Setting';
import Trash from '@pages/Trash';
import Upload from '@pages/Upload';

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
    element: <Register />,
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
    element: <Setting />,
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
    element: <NewFolder />,
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
