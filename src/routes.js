import React from 'react';
import Dashboard from './views/Dashboard';
import FilesTree from './views/FilesTree';
import Home from './views/Home';
import Login from './views/Login';
import NewFolder from './views/NewFolder';
import Register from './views/Register';
import Setting from './views/Settings';
import TrashFolder from './views/TrashFolder';
import UploadFile from './views/UploadFile';
import AlphaTesting from './views/AlphaTesting';

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
    description: 'Manage files',
    path: '/user/files',
    element: <FilesTree />,
    icon: <AccountTreeIcon />,
    type: ['files'],
  },
  {
    description: 'Upload file',
    path: '/user/upload',
    element: <UploadFile />,
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
    element: <TrashFolder />,
    icon: <DeleteIcon />,
    type: ['files'],
  },
  {
    description: 'Alpha TESTING',
    path: '/user/testing',
    element: <AlphaTesting />,
    icon: <AccountTreeIcon />,
    type: ['files'],
  },
];
