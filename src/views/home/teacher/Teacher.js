/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/17/20
 * Time: 8:46 AM
 */
import React from "react";

import {  Container, Row, Col } from "reactstrap";

// core components
import CardsFooter from "../../../components/Modals/Footers/CardsFooter.js";
import Header from '../../../components/Header/Header';
import './Teacher.scss';
import CourseSlides from "../../../components/CourseSlides/CourseSlides";
import SectionPolygon from "../../../components/SectionPolygon/SectionPolygon";
import connect from "react-redux/es/connect/connect";
import { withRouter } from "react-router";
import * as instituteService from "../../../services/institute";
import * as commonFunc from "../../../utils/commonFunc";
import * as actionSpinnerCreator from "../../../store/domain/spinner/action";
import * as actionClassCreator from "../../../store/domain/classes/action";
import Paginate from "../../../components/Paginate/Paginate";
import NotFound from "../../../components/NotFound/NotFound";

class Teacher extends React.Component {
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
    }

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
                <Header active={0} />
                <main ref="main" className={"main"}>
                    <section className=" lecture-intro about">
                        <Container  >

                            <Row className="row-grid align-items-center ">
                                <Col lg="3" className={"first-col about"}>

                                    < img src={institute.image} className={"round-img"} alt="institute Image" />

                                </Col>
                                <Col lg="8" className={"second-col"}>
                                    <div className="pl-md-4">
                                        <h2 className={"name-row1"} >{institute.name}</h2>
                                        <p className={"name-row2"} >MBA (Col), BSc. (Accounting) Sp.(Hons) USJP. CGMA, ACMA</p>
                                        {/*<p className={"row-2"}>1,378 <span className={"sp-number"}>Students</span> 856 <span className={"sp-number"}> Classes </span> 86 <span className={"sp-number"}> Sessions </span> </p>*/}
                                       <Row>
                                           <Col xs="4"> <p className={"row-2"}>1,378 <span className={"sp-number"}>Students</span></p></Col>
                                           <Col xs="4"> <p className={"row-2"}>856 <span className={"sp-number"}> Classes </span></p> </Col>
                                           <Col xs="4"><p className={"row-2"}>86 <span className={"sp-number"}> Sessions </span></p> </Col>
                                       </Row>
                                    </div>

                                </Col>
                            </Row>

                        </Container>

                    </section>
                    <SectionPolygon />


                    <section className="section ">
                        <Container>

                            <div className="about" >

                                <h3 className={"class-topic"}>About</h3>

                                <p className={"about-para"} >{institute.about}</p>

                            </div>
                        </Container>
                    </section>


                    {
                        listOfLectures.length !== 0 ? listOfLectures.map((obj, index) => {
                            return obj.classes.length !== 0 && <section className=" class-section" key={index}>
                                <Container >
                                    <div className="about">
                                        <h3 className={"class-topic"}>Classes</h3></div>
                                    {/* <h3 className={"class-ctrl"}>Classes</h3> */}
                                    <CourseSlides classesByLecture={obj.classes} />
                                </Container>
                            </section>
                        }) :
                            !this.props.isSpinner && <NotFound message={`Available classes`} />
                    }
                    <div className={"pag-ctrl"}>
                        <Paginate className={`m-15-paginate`} handlePageClick={this.handlePageClick} pageCount={pagination.pageCount} initialPage={pagination.page} disableInitialCallback={true} />
                    </div>
                </main>
                <CardsFooter />
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Teacher));
