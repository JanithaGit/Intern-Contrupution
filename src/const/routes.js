/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import React from 'react';
import * as constants from "./constants";
//publisher
const Dashboard = React.lazy(() => import('../views/Dashboard/Dashboard'));
const CreateArticles = React.lazy(() => import('../views/Articles/CreateArticle/Create'));
const Draft = React.lazy(() => import('../views/Articles/Draft/Draft'));
const View = React.lazy(() => import('../views/Articles/ArticleList/ArticleList'));
const Profile = React.lazy(() => import('../views/Profile/Profile'));
//super admin
const DashboardSupper = React.lazy(() => import('../views/superAdmin/Dashboard/Dashboard'));

const PublisherView = React.lazy(() => import('../views/superAdmin/Publishers/View/View'));
const PublisherRegister = React.lazy(() => import('../views/superAdmin/Publishers/Register/Register'));
const DetailsView = React.lazy(() => import('../components/SuperAdmin/Publishers/View/View'));
const PublisherContent = React.lazy(() => import('../components/SuperAdmin/Publishers/PublisherContent/PublisherContent'));
const AppsView = React.lazy(() => import('../views/superAdmin/Apps/Views/Views'));
const AppsCreate = React.lazy(() => import('../views/superAdmin/Apps/Create/Create'));
const AppDataView = React.lazy(() => import('../components/SuperAdmin/Apps/Views/View'));






const selectedApp  = localStorage.getItem('selectedApp');

const routes = [
  //publisher
  { path: `${constants.BASE_ROUTE}/home/Dashboard`, exact: true, name: 'Dashboard', component: Dashboard},
  { path: `${constants.BASE_ROUTE}/home/article/create`, name: 'Create', component: CreateArticles },
  { path: `${constants.BASE_ROUTE}/home/article/draft`, name: 'Draft', component: Draft },
  { path: `${constants.BASE_ROUTE}/home/article/view`, name: 'Draft', component: View },
  { path: `${constants.BASE_ROUTE}/home/profile`, name: 'Profile', component: Profile },
  //super Admin
  { path: `${constants.BASE_ROUTE}/admin/dashboard`, exact: true, name: 'DashboardSupper', component: DashboardSupper},
  { path: `${constants.BASE_ROUTE}/admin/profile`, name: 'Profile', component: Profile },
  { path: `${constants.BASE_ROUTE}/admin/publisher/register`, name: 'Register', component: PublisherRegister },
  { path: `${constants.BASE_ROUTE}/admin/publisher/view`, name: 'View', component: PublisherView },
  { path: `${constants.BASE_ROUTE}/admin/publisher/details`, name: 'ViewDetails', component: DetailsView },
  { path: `${constants.BASE_ROUTE}/admin/publisher/content`, name: 'PublisherContent', component: PublisherContent},

  { path: `${constants.BASE_ROUTE}/admin/apps/create`, name: 'Create', component: AppsCreate },
  { path: `${constants.BASE_ROUTE}/admin/apps/view`, name: 'View', component: AppsView },
  { path: `${constants.BASE_ROUTE}/admin/apps/details`, name: 'View', component: AppDataView },

  




];

export default routes;
