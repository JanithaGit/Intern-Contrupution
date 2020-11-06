import React from 'react'
import * as constants from "../../const/constants";
import i from 'react-icofont';
   

export default [
  {
    _tag: 'CSidebarNavItem',
    name: ' Dashboard',
    to: `${constants.BASE_ROUTE}/admin/dashboard`,
    icon: <span><i class="icofont-dashboard-web sider-icon"/></span>,
    badge: {
      color: 'info',

    }
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: `Publishers`,
    icon: <i class="icofont-ebook sider-icon"></i>,
    //to: `${constants.BASE_ROUTE}/home/article`,
    _children: [

      {
        _tag: 'CSidebarNavItem',
        icon: <i class="icofont-drawing-tablet sider-icon"></i>,
        name: 'Register ',
        to: `${constants.BASE_ROUTE}/admin/publisher/register`,
      },
      {
        _tag: 'CSidebarNavItem',
        icon: <i class="icofont-list sider-icon"></i>,
        name: 'View ',
        to: `${constants.BASE_ROUTE}/admin/publisher/view`,
      },

    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Apps',
    icon: <i class="icofont-settings sider-icon"></i>,
   // to: `${constants.BASE_ROUTE}/home/article`,
    _children: [

      {
        _tag: 'CSidebarNavItem',
        icon: <i class="icofont-live-messenger sider-icon"></i>,
        name: 'Create',
        to: `${constants.BASE_ROUTE}/admin/apps/create`,
      },
      {
        _tag: 'CSidebarNavItem',
        icon: <i class="icofont-live-messenger sider-icon"></i>,
        name: 'View',
        to: `${constants.BASE_ROUTE}/admin/apps/view`,
      },
      
      
      
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Settings',
    icon: <i class="icofont-settings sider-icon"></i>,
    //to: `${constants.BASE_ROUTE}/home/article`,
    _children: [

      {
        _tag: 'CSidebarNavItem',
        icon: <i class="icofont-live-messenger sider-icon"></i>,
        name: 'Profile',
        to: `${constants.BASE_ROUTE}/admin/profile`,
      },
      
      
      
    ]
  }


]
