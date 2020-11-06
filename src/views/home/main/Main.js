/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/17/20
 * Time: 8:46 AM
 */
import React from "react";

import {Card, CardImg, Container, Row, Col} from "reactstrap";

// core components
import CardsFooter from "../../../components/Modals/Footers/CardsFooter.js";
import Header from '../../../components/Header/Header';
import './Main.scss';
import CourseSlides from "../../../components/CourseSlides/CourseSlides";
import SectionPolygon from "../../../components/SectionPolygon/SectionPolygon";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router";
import * as instituteService from "../../../services/institute";
import * as commonFunc from "../../../utils/commonFunc";
import * as actionSpinnerCreator from "../../../store/domain/spinner/action";
import * as actionClassCreator from "../../../store/domain/classes/action";
import Paginate from "../../../components/Paginate/Paginate";
import NotFound from "../../../components/NotFound/NotFound";

class Landing extends React.Component {
    fetchClassesFromHome = async (pageNo) => {
        let {pagination} = this.props;

        this.props.spinnerHandler({isSpin: true, type: 15});
        await instituteService.getClassesFromHome({size:pagination.size, page: pageNo !== null ? pageNo : pagination.page})
            .then(response => {
                this.props.spinnerHandler(false);
                if (response.success) {
                    let body = response.body;
                    this.props.fetchLectures(body.content);
                    this.props.selectPagination({size:body.size, pageCount: body.totalPages, page: body.number});
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
        let {institute,listOfLectures,pagination} = this.props;
        return (
            <div>
                <Header active={0}/>
                <main ref="main" className={"main"}>
                    <section className="section lecture-intro">
                            <Container>
                                <Row className="row-grid align-items-center">
                                    <Col lg="6">
                                        <Card className="sahadow border-0">
                                            <CardImg className={"blur-img-2"} alt="..." src={institute.image}/>
                                            {/*<CardImg className={"ori-img"} alt="..." src={institute.image}/>*/}
                                        </Card>
                                    </Col>
                                    <Col lg="6">
                                        <div className="pl-md-5">
                                            <h3 className={"lead-head"}>About</h3>
                                            <div className="lead-text">{institute.about}</div>
                                            <p className="font-weight-bold text-warning mt-4">{institute.name}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                    </section>
                    <SectionPolygon/>

                    {
                        listOfLectures.length !== 0 ? listOfLectures.map((obj,index)=>{
                            return obj.classes.length !== 0 && <section className="section class-section" key={index}>
                                <Container>
                                    <div>
                                        <h3 className={"teach-black-text head-topic"}>{`Classes by ${obj.teacherName}`}</h3>
                                    </div>
                                    <CourseSlides classesByLecture={obj.classes}/>
                                </Container>
                            </section>
                        }):
                            !this.props.isSpinner && <NotFound message={`Available classes`} />
                    }

                    <Paginate className={`m-15-paginate`} handlePageClick={this.handlePageClick}  pageCount={pagination.pageCount} initialPage={pagination.page} disableInitialCallback={true}/>

                </main>
                <CardsFooter/>
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
    selectPagination:data => dispatch(actionClassCreator.selectPagination(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Landing));
