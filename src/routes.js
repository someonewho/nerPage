import React from 'react';

const Home = React.lazy(() => import('./views/Pages/nerPage'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
];

export default routes;
