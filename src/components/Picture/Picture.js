/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/17/20
 * Time: 8:46 AM
 */
import React from "react";

import { Card, Container, Row, Col } from "reactstrap";

// core components
import './Picture.scss';
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router";
import * as instituteService from "../../services/institute";
import * as commonFunc from "../../utils/commonFunc";
import * as actionSpinnerCreator from "../../store/domain/spinner/action";
import * as actionClassCreator from "../../store/domain/classes/action";
import ExampleComponent from 'react-rounded-image';

class Picture extends React.Component {
    fetchClassesFromHome = async (pageNo) => {
        let { pagination } = this.props;

        this.props.spinnerHandler({ isSpin: true, type: 15 });
        await instituteService.getClassesFromHome({ size: pagination.size, page: pageNo !== null ? pageNo : pagination.page })
            .then(response => {
                this.props.spinnerHandler(false);
                if (response.success) {
                    let body = response.body;
                    this.props.fetchLectures(body.content);
                    this.props.selectPagination({ size: body.size, pageCount: body.totalPages, page: body.number });
                } else {
                    commonFunc.notifyMessage(response.message, response.status)
                }
            })
    };

    handlePageClick = (value) => {
        this.fetchClassesFromHome(value.selected);
    };

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
        this.fetchClassesFromHome(null);
    }

    render() {
        let { institute, listOfLectures, pagination } = this.props;
        return (
            <div>
               
                <main ref="main" className={"main"}>
                    <section >
                        <Container>
                            <Row className="row-grid align-items-center">
                                <Col lg="5" className={"r-img"}>

                                    <ExampleComponent

                                        image={institute.image}
                                        roundedColor="#321124"
                                        imageWidth="287"
                                        imageHeight="287"
                                        roundedSize="13"
                                    />

                                </Col>
                                <Col lg="7">
                                    <div className="pl-md-4">
                                        <h2 className={"name-row1"} >{institute.name}</h2>

                                        <h5 className={"name-row2"} >MBA (Col), BSc. (Accounting) Sp.(Hons) USJP. CGMA, ACMA</h5>

                                    </div>
                                    <div >
                                        <Col lg="2" ><h4 className={"row-2"}> Students </h4></Col>
                                        <Col lg="2"><h4 className={"row-2"}> Classes </h4></Col>
                                        <Col lg="2"><h4 className={"row-2"}> Sessions </h4></Col>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </main>
               
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    institute: state.institute.institute,
    listOfLectures: state.classes.listOfLectures,
    pagination: state.classes.pagination,
    isSpinner: state.spinner.isSpinner,
});
const mapDispatchToProps = (dispatch) => ({
    spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),
    fetchLectures: data => dispatch(actionClassCreator.fetchLectures(data)),
    selectPagination: data => dispatch(actionClassCreator.selectPagination(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Picture));
