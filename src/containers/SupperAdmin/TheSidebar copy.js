import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import '../Common/container.scss';
import logo from '../../assets/img/logo2.png';
import logo2 from '../../assets/img/logo-news.png';
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

// sidebar nav config
import navigation from './_nav';
import * as constants from "../../const/constants";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.changeState.sidebarShow);

  const [apps, setApps] = useState('0');

  const fetchUsers = async () => {
    const selectedApp = localStorage.getItem('selectedApp')

    switch (selectedApp) {
      case "Articles":

        setApps(logo)
          ; break;

      case "News":
        setApps(logo2)
          ; break;

      default:
        break;

    }

  };

  useEffect(() => { fetchUsers() });


  return (
    <CSidebar
      className={"side-bar"}
      show={show}
      onShowChange={(val) => dispatch({ type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to={`${constants.BASE_ROUTE}/home/Dashboard`}>
        <img src={apps} className={"logo img-fluid"} alt={"logo"} />

      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
