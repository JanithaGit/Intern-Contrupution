import React from 'react';
import DefaultLayout from './containers/DefaultLayout';
import {BASE_ROUTE} from "./Constants/Constants";

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Class = React.lazy(() => import('./views/Class/Class'));
const ZoomMeeting = React.lazy(() => import('./Components/ZoomMeeting/ZoomMeeting'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: BASE_ROUTE + '/', exact: true, name: 'Teachers', component: DefaultLayout },
  { path: BASE_ROUTE+'/teachers', name: '', component: Dashboard },
  { path: BASE_ROUTE+'/class', exact: true, name: 'Classes', component: Class },
  { path: BASE_ROUTE+'/class/start', exact: true, name: 'Start Class', component: ZoomMeeting },
];

export default routes;
