import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu, ButtonGroup } from 'reactstrap';
import Cookies from 'js-cookie';
import '../Common/container.scss';
import {
  CHeader,
  CToggler,

} from '@coreui/react'
import { useHistory } from "react-router-dom";
import *as constants from '../../const/constants';
import swal from "sweetalert";
import logout from "../../assets/img/logout-icon.png";
import axios from '../../services/axios';



const TheHeader = (props) => {

  const dispatch = useDispatch();
  const sidebarShow = useSelector(state => state.changeState.sidebarShow);
  //const [app, setApp] = useState([]);
  const [apps, setUsers] = useState([]);
  const fetchUsers = async () => {
    const response = await axios.post(`${constants.SERVER_URL}article/admin/viewapplist`);
    setUsers(response.data.body);

  };

  useEffect(() => { fetchUsers(apps) }, apps);

  // const setAppName = ()=> {
  //   const appName = localStorage.getItem('selectedApp');
  //   setApp(appName);
  // }
  const appName = localStorage.getItem('selectedApp');
  //useEffect(() => { setAppName(app)}, app)

  const selectAppHandler1 = () => {
    window.location.reload()
    localStorage.setItem('selectedApp', 'Articles');


  }
  const selectAppHandler2 = () => {
    window.location.reload()
    localStorage.setItem('selectedApp', 'News');
  }


  let history = useHistory();
  const logoutHandler = () => {
    swal({
      title: constants.ARE_YOU_SURE_TEXT, icon: null, closeOnClickOutside: false,
      buttons: { cancel: 'No', dangerMode: { text: "Yes", value: "action", className: "okay-btn" } },
    }).then((value) => {
      switch (value) {
        case "action":
          Cookies.remove(constants.ACCESS_TOKEN);
          Cookies.remove(constants.REFRESH_TOKEN);
          localStorage.removeItem('selectedApp');
          history.push(`${constants.BASE_ROUTE}/login`)
          break;
        default:
          break;
      }
    });
  };



  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  };
  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({ type: 'set', sidebarShow: val })
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  const toggle1 = () => setDropdownOpen1(prevState => !prevState);


  return (
    <div>


      <CHeader withSubheader className={"header-bg"}>
        <div className="test-sa">

          <div> <CToggler
            inHeader
            className="ml-md-3 d-lg-none head-col-1"
            onClick={toggleSidebarMobile}
          />
            <CToggler
              inHeader
              className="ml-3 d-md-down-none"
              onClick={toggleSidebar}
            /></div>

          <div>



           
              <Dropdown isOpen={dropdownOpen} toggle={toggle} className={"log-out-btn"}>
                <DropdownToggle caret className={"logout-togger"}>
                  <img
                    className={"log-out  c-avatar"}
                    src={logout}
                    alt="logout"
                  />
                </DropdownToggle>
                <div>
                  <DropdownMenu right className={"form-body"}>
                    <DropdownItem onClick={logoutHandler}> <i class="icofont-logout sider-icon"></i>Log Out</DropdownItem>
                  </DropdownMenu>
                </div>
              </Dropdown>
            






          </div>

        </div>
      </CHeader>
    </div>
  )
};

export default TheHeader;
