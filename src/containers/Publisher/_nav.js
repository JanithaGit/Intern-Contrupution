import React from 'react'
import * as constants from "../../const/constants";

    const selectedApp =localStorage.getItem('selectedApp')
   

export default [
  {
    _tag: 'CSidebarNavItem',
    name: ' Dashboard',
    to: `${constants.BASE_ROUTE}/home/Dashboard`,
    icon: <span><i class="icofont-dashboard-web sider-icon"/></span>,
    badge: {
      color: 'info',

    }
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: `Article`,
    icon: <i class="icofont-ebook sider-icon"></i>,
    to: `${constants.BASE_ROUTE}/home/article`,
    _children: [

      {
        _tag: 'CSidebarNavItem',
        icon: <i class="icofont-drawing-tablet sider-icon"></i>,
        name: 'Create ',
        to: `${constants.BASE_ROUTE}/home/article/create`,
      },
      {
        _tag: 'CSidebarNavItem',
        icon: <i class="icofont-list sider-icon"></i>,
        name: 'View ',
        to: `${constants.BASE_ROUTE}/home/article/view`,
      },

      {
        _tag: 'CSidebarNavItem',
        icon: <i class="icofont-save sider-icon"></i>,
        name: 'Draft ',
        to: `${constants.BASE_ROUTE}/home/article/draft`,
      },
      
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Settings',
    icon: <i class="icofont-settings sider-icon"></i>,
    to: `${constants.BASE_ROUTE}/home/article`,
    _children: [

      {
        _tag: 'CSidebarNavItem',
        icon: <i class="icofont-live-messenger sider-icon"></i>,
        name: 'Profile',
        to: `${constants.BASE_ROUTE}/home/profile`,
      },
      
      
    ],
  }
]
