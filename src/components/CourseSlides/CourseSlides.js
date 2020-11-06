/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/17/20
 * Time: 12:35 PM
 */
import React, { Component } from 'react';
import './CourseSlides.scss';
import Slider from "react-slick";
import { Card, CardBody, Row, Col } from "reactstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "reactstrap";
import * as constants from "../../const/constants";
// import * as commonFunc from "../../utils/commonFunc";
import { withRouter } from "react-router";
import * as actionCreator from "../../store/domain/classes/action";
import { connect } from "react-redux";
import moment from "moment";
import MonthSelector from "../MonthPicker/MonthSelector";
import * as actionSpinnerCreator from "../../store/domain/spinner/action";
import * as commonFunc from "../../utils/commonFunc";
import { MDBContainer, MDBScrollbar } from "mdbreact";
import i from "react-icofont";




let settings = {
    dots: true,
    institute: '',
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: false,
                dots: true
            }
        },
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 768,
            settings: {
                dots: true,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

class App extends Component {
    state = {
        selectMonth: -1, selectClassId: 0
    };
    render() {

        let { selectMonth } = this.state;
        let { classesByLecture } = this.props;
        return (

            <div>
                <div className={"slide-show"}>
                    <Slider {...settings}>
                        {
                            classesByLecture.length !== 0 &&
                            classesByLecture.map((element, index) => {
                                return <div key={index}>
                                    <div className={`slideshow-wrapper shadow border-0 card ${element.buttonStatus === constants.BOUGHT_TEXT && `purchased`}`}>
                                        <div className={"display-inline slideshow-user-wrapper"}>
                                            <img src={element.imageUrl} alt={"."} className={"slideshow-pro-image shadow"} />
                                            <h2 className={"view-icon"}><i className="icofont-listing-box" onClick={() => this.viewLectureHandler(element)} /></h2>
                                            <div className={"slideshow-middle"}>
                                                <div className={"cursor"}>
                                                    <div >
                                                        <h4 className={"topic"}>{element.name}</h4>
                                                    </div>
                                                    {/* <p className={"subject"}>{element.subject}</p> */}
                                                    <div>
                                                        <Row className={"card-row"}>
                                                            <Col xs="6"> <p className={"name"}>Sampath Athukorala</p></Col>
                                                            <Col xs ="6"><p className={"amount"}>{`Rs.${parseFloat(element.fee ? element.fee : 0).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}/= per Month`}</p></Col>
                                                        </Row>
                                                    </div>
                                                    <Card className={"card-control"}>
                                                        <CardBody >
                                                            <p className={"card-title"}>Class Schedule</p>

                                                            {/* <MDBContainer>  //can use if there are more than 2 shedule classes
                                                                <div className="scrollbar scrollbar-primary  mt-5 mx-auto scroll-list" >
                                                                {
                                                                element.dayTimes !== 0 && element.dayTimes.map((dayTime, i) => (
                                                                    <ul className={"list"}><li >
                                                                        <p key={i} className={"day"}> {`${dayTime.dayName} ${moment(`2000-01-01 ${dayTime.startTime}`).format('h:mm a')} to ${moment(`2000-01-01 ${dayTime.endTime}`).format('h:mm a')}`}</p>

                                                                    </li>
                                                                    
                                                                    
                                                                    </ul>
                                                                    
                                                                ))
                                                            }
                                                                </div>

                                                            </MDBContainer> */}
                                                            {
                                                                element.dayTimes !== 0 && element.dayTimes.map((dayTime, i) => (
                                                                    <p className={"day"}>
                                                                        <li key={i} > {`${dayTime.dayName}:  ${moment(`2000-01-01 ${dayTime.startTime}`).format('h:mm a')} to ${moment(`2000-01-01 ${dayTime.endTime}`).format('h:mm a')}`}</li>


                                                                    </p>

                                                                ))
                                                            }
                                                            <p className={"next0"} ><span className={"next2"} ><i className="icofont-calendar" /> Next class is on</span> <span className={"next1"}>{`${moment(element.nextDayOfClass.replace("Z", "")).format("DD / MM / YYYY")}`} </span></p>

                                                        </CardBody>

                                                    </Card>
                                                    <div className={"btn-ctrl"} >
                                                        {
                                                            element.buttonStatus === constants.BUY_TEXT &&
                                                            <Button className="log-btn com-btn" onClick={() => this.purchaseHandler(index, element.id)}>
                                                                Purchase the Month pass
                                                            </Button>
                                                        }
                                                        {
                                                            element.buttonStatus !== constants.BUY_TEXT &&
                                                            <Button className="log-btn com-btn inac-btn">
                                                                Purchase the Month pass
                                                            </Button>


                                                        }
                                                        {
                                                            element.buttonStatus === constants.BOUGHT_TEXT &&
                                                            <Button className={"paid-wrapper"}>
                                                                Paid for this month
                                                        </Button>
                                                        }
                                                    </div>


                                                </div>

                                            </div>
                                            <div>
                                                {selectMonth === index && <MonthSelector selectMonthHandler={this.selectMonthHandler} closeMonthHandler={this.closeMonthHandler} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </Slider>
                </div>
            </div>
        );
    }
    purchaseHandler = (id, classId) => {
        this.setState({ selectMonth: id, selectClassId: classId })
    };
    closeMonthHandler = () => {
        this.setState({ selectMonth: -1 })
    };
    selectMonthHandler = (month) => {
        let { selectClassId } = this.state;
        let obj = { ...month, classId: selectClassId };
        commonFunc.studentPurchaseWarning(this.props, obj);
    };

    viewLectureHandler = (object) => {
        this.props.history.push({ pathname: `${constants.BASE_ROUTE}${constants.HOME_VIEW_CLASS_ROUTE}`, state: `${object.id}` })
    };
}
const mapStateToProps = (state) => ({
    userType: state.auth.userType,
    tname: state.institute.name

});

const mapDispatchToProps = (dispatch) => ({
    selectClassHandler: data => dispatch(actionCreator.selectClass(data)),
    spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
