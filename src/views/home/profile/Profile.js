/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/24/20
 * Time: 4:57 PM
 */
import React, {Component} from 'react';
import './Profile.scss';
import Header from "../../../components/Header/Header";
import SectionPolygon from "../../../components/SectionPolygon/SectionPolygon";
import CardsFooter from "../../../components/Modals/Footers/CardsFooter";
import {Col, Container, Row} from "reactstrap";
import StudentDetails from "./student-details/StudentDetails";
import ChangePassword from "./change-password/ChangePassword";

class App extends Component {
    state = {
        active: 0
    };

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }
    stateHandler = (id) => {
        this.setState({active:id})
    };

    render() {
        let {active} = this.state;
        return (
            <div>
                <Header active={2}/>
                <main ref="main" className={"profile"}>
                    {/*<section className={"section-1"}/>*/}
                    {/*<SectionPolygon/>*/}
                    <section>
                        <Container>

                            <Row className="justify-content-center profile-main">
                                <Col xs="6" className={`profile-grid ${active === 0 && `grid-active`} f-f prof-col`}
                                     onClick={() => this.stateHandler(0)}>
                                    Profile
                                </Col>
                                <Col xs="6" className={`profile-grid ${active === 1 && `grid-active`} f-f secu-col`}
                                     onClick={() => this.stateHandler(1)}>
                                    Security
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col xs="12 ">
                                    {
                                        active === 0 ? <StudentDetails />:<ChangePassword stateHandler={this.stateHandler}/>
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </main>
                <CardsFooter/>
            </div>
        );
    }
}

export default App;
