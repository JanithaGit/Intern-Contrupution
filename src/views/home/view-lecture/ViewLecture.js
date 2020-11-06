import { Component } from "react";
import Header from "../../../components/Header/Header";
import { Container, Row, Col, CardImg, Card, Button } from "reactstrap";
import CardsFooter from "../../../components/Modals/Footers/CardsFooter";
import React from "react";
import './ViewLecture.scss';
import * as constants from "../../../const/constants";
import { withRouter } from "react-router";
import SectionPolygon from "../../../components/SectionPolygon/SectionPolygon";
import * as actionCreator from "../../../store/domain/classes/action";
import connect from "react-redux/es/connect/connect";
import * as commonFunc from "../../../utils/commonFunc";
import moment from "moment";
//import Paginate from "../../../components/Paginate/Paginate";
//import CourseSlides from "../../../components/CourseSlides/CourseSlides";
//import NotFound from "../../../components/NotFound/NotFound";
import * as instituteService from "../../../services/institute";

import * as actionSpinnerCreator from "../../../store/domain/spinner/action";
import * as classService from "../../../services/class";
import * as dropdownConst from "../../../utils/dropdownConst";
import { Backdrop } from "@material-ui/core";

/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/19/20
 * Time: 1:19 PM
 */
class App extends Component {
    //
    // fetchClassesFromHome = async (pageNo) => {
    //     let { pagination } = this.props;
    //
    //     this.props.spinnerHandler({ isSpin: true, type: 15 });
    //     await instituteService.getClassesFromHome({ size: pagination.size, page: pageNo !== null ? pageNo : pagination.page })
    //         .then(response => {
    //             this.props.spinnerHandler(false);
    //             if (response.success) {
    //                 let body = response.body;
    //                 this.props.fetchLectures(body.content);
    //                 this.props.selectPagination({ size: body.size, pageCount: body.totalPages, page: body.number });
    //             } else {
    //                 commonFunc.notifyMessage(response.message, response.status)
    //             }
    //         })
    // };
    handlePageClick = (value) => {
        this.fetchClassesFromHome(value.selected);
    };

    // componentDidMount() {
    //     document.documentElement.scrollTop = 0;
    //     document.scrollingElement.scrollTop = 0;
    //     this.refs.main.scrollTop = 0;
    //     this.fetchClassesFromHome(null);
    // }

    joinClassHandler = (object) => {
        commonFunc.joinClassHandler(this.props, object)
    };

    checkClass = async () => {
        let state = this.props.location.state;
        if (state) {
            this.props.spinnerHandler({ isSpin: true, type: 10 });
            await classService.getClassDetailsById(state)
                .then(response => {
                    this.props.spinnerHandler(false);
                    if (response.success) {
                        this.props.selectClassHandler(response.body);
                    } else {
                        commonFunc.notifyMessage(response.message, response.status);
                        this.goHome();
                    }
                })
        } else {
            this.goHome();
        }
    };

    goHome = () => {
        this.props.history.push(`${constants.BASE_ROUTE}${constants.HOME_INSTITUTE_ROUTE}`)
    };

    purchaseHandler = (date, classId) => {
        let months = dropdownConst.months;
        let curMonth = new Date(date).getMonth();
        let curYear = new Date(date).getFullYear();

        let obj = { month: months[curMonth].value, year: curYear, classId: classId };
        commonFunc.studentPurchaseWarning(this.props, obj);
    };
    componentWillUnmount() {
        this.props.selectClassHandler(null);
    }

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
        this.checkClass();

    }
    setModalHandler = () => {
        this.props.history.push(`${constants.BASE_ROUTE}${constants.HOME_INSTITUTE_ROUTE}`)
    };

    render() {
        let { selectClass, institute, listOfLectures, pagination } = this.props;

        return (
            <div>
                <Header/>
                <Row>
                    <Col  className={"col-poly"}>
                        <SectionPolygon/>
                    </Col>

                </Row>

                <div>



                    <main ref="main"  >
                        <section className={"section lec-view-class "} >
                            <Container className="  abouts ">
                                {
                                    selectClass &&

                                    <div className={`${selectClass.isExpired ? `expire-layout ` : `un-expire-layout`}`}>
                                        <Row  className="about">

                                            {
                                                selectClass.buttonStatus === constants.BOUGHT_TEXT ?
                                                    <Col md={4} className={"align-right"}>
                                                        <Button className="btn-neutral normal-txt join-btn" color="default"
                                                            onClick={() => this.joinClassHandler(selectClass)}>
                                                            {`Join the class`}
                                                        </Button>
                                                    </Col> : selectClass.buttonStatus === constants.PENDING_TEXT ?
                                                        selectClass.isPurchased && <Col md={12} className={"lec-valid-wrapper"}>
                                                            <span
                                                                className={`lec-valid`}>{`Wait, Payment is processing yet..`}</span>
                                                        </Col> : null
                                            }
                                        </Row>

                                        <Row className="about" >


                                            <Col className={"col-img "}>
                                                <button className={"home-btn"}
                                                    onClick={() => this.setModalHandler(null)}
                                                >
                                                    <i class="icofont-long-arrow-left" />
                                                Back To Tutor</button>
                                                <Card className={"card-img"} >

                                                    <CardImg className={"main-img"} alt="..." src={selectClass.imageUrl} />
                                                </Card>
                                            </Col>
                                        </Row>

                                        <br />
                                        <Row className="about" >


                                            <Col lg="12" className={"col-name"}>
                                                <p className={"head-topic"}>{`${selectClass.name} - ${selectClass.subject}`}</p>
                                                <p className={"head-teacher"}> by {`${selectClass.teacher.teacherName}`}</p>
                                            </Col>
                                        </Row>


                                        <Row className="about" >
                                            <Col lg="3" className={"col-one "}>
                                                <Card className={"prop-card"}>
                                                    < img src={institute.image} className={"prop-img"} /></Card>

                                                <div className={"div-prop"}>
                                                    <p className={"name-row1"} >{institute.name}</p>
                                                    <p className={"name-row2"} > MBA (Col), BSc. (Accounting) Sp.(Hons) USJP. CGMA, ACMA</p>
                                                    <p className={"btn-prop"}>  <Button className="com-btn log-btn"  onClick={() => this.setModalHandler(null)}>See Profile</Button></p>
                                                </div>
                                            </Col>
                                            <Col lg="9" className={"col-two"}>
                                                <div >
                                                    <p className={"lec-desc"}>{selectClass.description}</p>
                                                </div>

                                            </Col>
                                        </Row>

                                        <Row className="about" >
                                            <Col lg="3" className={"col-shedule"}>
                                                <Card className={"card-shedule"}>

                                                    <div>
                                                    <ul><p className={"card-topic"}>Class Schedule</p></ul>


                                                    {
                                                        selectClass.dayTimes !== 0 && selectClass.dayTimes.map((dayTime, i) => (
                                                            <ul className={"card-cont day-list"}><li >
                                                                <p
                                                                   key={i}>{`${dayTime.dayName}:`}</p>
                                                                <p >

                                                                {`${moment(`2000-01-01 ${dayTime.startTime}`).format('h:mm a')} to ${moment(`2000-01-01 ${dayTime.endTime}`).format('h:mm a')}`}</p>
                                                            </li></ul>))
                                                    }



                                                   <ul className={"card-cont next-list"}> <li >

                                                      <span > {` Next class is on `} </span> </li>
                                                    <p className={"next-day"}>
                                                        {moment(selectClass.nextDayOfClass.replace("Z", "")).format("DD / MM / YYYY")} </p></ul>
                                                    </div>
                                                </Card>
                                            </Col>
                                            <Col lg="9" className={"col-syllebus"}>
                                                <Card className={"card-syllebus"}>
                                                    <ul><p className={"card-topic"}>Syllabus</p></ul>


                                                    {
                                                        selectClass.syllabus && selectClass.syllabus.trim() !== "" &&
                                                        <div >

                                                            {
                                                                <div>
                                                                    {
                                                                        selectClass.syllabus.split(",").map((syllabus, index) => (
                                                                            <p >
                                                                                <ul className={"card-cont day-list"} >
                                                                                    <li key={index}>
                                                                                        {`${syllabus}`}</li>
                                                                                </ul></p>
                                                                        )
                                                                        )
                                                                    }
                                                                </div>
                                                            }
                                                        </div>

                                                    }

                                                </Card>

                                            </Col>
                                        </Row>

                                        <Row className="about" >
                                            <Col lg={3} className={"col-shedule"}>
                                                {
                                                    selectClass.enrolledMonths && selectClass.enrolledMonths.length !== 0 &&


                                                   <Card className={"card-pur-months"}>

                                                       <div className={"lec-syllabus_"}>
                                                           <ul><p className={"card-topic"}> {`Purchase months`} </p></ul>

                                                           {
                                                               selectClass.enrolledMonths.map((month, index) => (
                                                                   <p>
                                                                       <ul className={"card-cont day-list"}>
                                                                           <li key={index} className={"syllabus "}>{`${month.year} - ${month.month}`}</li>

                                                                       </ul>
                                                                   </p>
                                                               ))
                                                           }

                                                       </div>
                                                   </Card>
                                                }
                                            </Col>
                                            <Col lg="9" className={"none-padding"}>
                                                <p className={"button-ctrl"}>
                                                    {
                                                        selectClass.buttonStatus === constants.BUY_TEXT &&
                                                        <Button
                                                            className="com-btn log-btn"
                                                            onClick={() => this.purchaseHandler(new Date(), selectClass.id)}>
                                                            {`Purchase`}
                                                            {` for ${moment(new Date()).format("MMM")} class pass - LKR ${parseFloat(selectClass.fee ? selectClass.fee : 0).toFixed(2)}`}

                                                        </Button>
                                                    }

                                                    <Button className="com-btn reg-btn">Send Tuter an Email</Button>
                                                </p>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                            </Container>
                        </section>

                        {/* other Classes by  section Remove */}
                    </main>
                    <CardsFooter />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    institute: state.institute.institute,
    userType: state.auth.userType,
    selectClass: state.classes.selectClass,
    listOfLectures: state.classes.listOfLectures,
    pagination: state.classes.pagination,
});

const mapDispatchToProps = (dispatch) => ({
    selectClassHandler: data => dispatch(actionCreator.selectClass(data)),
    spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
