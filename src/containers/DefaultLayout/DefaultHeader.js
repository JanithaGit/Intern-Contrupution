import React, {Component} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav} from 'reactstrap';

import {AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler} from '@coreui/react';
import {STORAGE_KEY_USER} from "../../Constants/Constants";
import cornerImage from "../../assets/img/lock.png";
import LogoImage from "../../assets/img/EdulabLight.png";

class DefaultHeader extends Component {

  state={
    image: ''
  };

  componentDidMount(){
    const user = JSON.parse(localStorage.getItem(STORAGE_KEY_USER));
    this.setState({
      image: user.userDetails.imageUrl
    });
  }

  render() {

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: LogoImage, width: 90, height: 33, alt: 'Edulab Logo' }}
          minimized={{ src: LogoImage, width: 30, height: 30, alt: 'Edulab Logo' }}
          style={{fontWeight: 'bold', color: '#1565c0'}}
        >
          {/*-Edulab-*/}
        </AppNavbarBrand>
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <div style={{width: '35px', height: '35px', borderRadius: '20px', alignContent: "center", backgroundColor: ' #F06334'}}>
                <img src={cornerImage} style={{height: '18px', marginTop: '8px'}} className="img-avatar " alt="institute" />
              </div>
            </DropdownToggle>
            <DropdownMenu right style={{ right: 'auto' }}>
              <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              {/*<DropdownItem><i className="fa fa-wrench"/> Settings</DropdownItem>*/}
              <DropdownItem onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"/> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}
export default DefaultHeader;
