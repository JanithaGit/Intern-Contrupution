/*eslint-disable*/
import React from "react";
// reactstrap components
import {
    NavItem,
    Nav,
    Row,
    Col,
} from "reactstrap";
import Logo from '../../../assets/img/logo/poweredby_ash.png';

class CardsFooter extends React.Component {
    render() {
        return (
            <>
                <footer className="footer has-cards shadow">
                    <Row className="align-items-center justify-content-md-between">
                        <Col md="6">
                            <div className="copyright footer-text">
                                <a target="_blank" href={"https://ceyentra.com/"}>
                                    <img src={Logo} className={"footer-img"} alt={""}/>
                                </a>
                                {/*<span>Powered by Ceyentra Technologies</span>*/}
                            </div>
                        </Col>
                        <Col md="6">
                            <Nav className="nav-footer justify-content-end">
                                <NavItem>
                    <span className={"footer-text"}>
                        © {"2020"}{" Edulab "}
                    </span>
                                </NavItem>
                            </Nav>
                        </Col>
                    </Row>
                </footer>
            </>
        );
    }
}

export default CardsFooter;
