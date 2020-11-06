/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/17/20
 * Time: 6:16 PM
 */
import React, {Component} from 'react';
import './MyClass.scss';
import Header from "../../../components/Header/Header";
import {Container} from "reactstrap";
import CardsFooter from "../../../components/Modals/Footers/CardsFooter";
import ViewClass from "../../../components/ViewClass/ViewClass";
import SectionPolygon from "../../../components/SectionPolygon/SectionPolygon";
import {connect} from "react-redux";
import * as classService from "../../../services/class";
import * as commonFunc from "../../../utils/commonFunc";
import * as actionSpinnerCreator from "../../../store/domain/spinner/action";
import * as actionClassCreator from "../../../store/domain/classes/action";
import Paginate from "../../../components/Paginate/Paginate";
import NotFound from "../../../components/NotFound/NotFound";

class App extends Component {
    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
        this.getAllEnrolledClass(null);
    }
    getAllEnrolledClass = async (pageNo) => {
        let {pagination} = this.props;

        this.props.spinnerHandler({isSpin: true, type: 15});
        await classService.getAllEnrolledClass({size:pagination.size, page: pageNo !== null ? pageNo : pagination.page})
            .then(response => {
                this.props.spinnerHandler(false);

                if (response.success) {
                    this.props.fetchAllPurchasedClass(response.body.content);
                    this.props.selectMyClassPagination({size:response.body.size, pageCount: response.body.totalPages, page: response.body.number});
                }else{
                    commonFunc.notifyMessage(response.message, response.status);
                }
            })
    };
    handlePageClick = (value) => {
        this.getAllEnrolledClass(value.selected);
    };
    render() {
        let {purchaseClasses,pagination} = this.props;
        return (
            <div>
                <Header active={1}/>
                <main ref="main" className={"my-class"}>
                    {/*<section className={"section-1"}/>*/}

   
                    <section>
                        <Container>
                            <div>
                                <h3 className={"teach-black-text head-topic align-center"}>List of joined classes</h3>
                            </div>
                            <div>
                                {
                                    purchaseClasses.map((slide, index) => {
                                        return <ViewClass key={index} {...slide} obj={slide}/>
                                    })
                                }
                                {!this.props.isSpinner && purchaseClasses.length === 0 && <NotFound message={`Purchased classes`} />}
                            </div>
                            <Paginate className={`m-15-paginate`} handlePageClick={this.handlePageClick}  pageCount={pagination.pageCount} initialPage={pagination.page} disableInitialCallback={true}/>
                        </Container>
                    </section>
                </main>
                <CardsFooter/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    purchaseClasses: state.classes.purchaseClasses,
    pagination: state.classes.paginationMyClass,
    isSpinner: state.spinner.isSpinner,
});
const mapDispatchToProps = (dispatch) => ({
    spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),
    fetchAllPurchasedClass: data => dispatch(actionClassCreator.fetchAllPurchasedClass(data)),
    selectMyClassPagination:data => dispatch(actionClassCreator.selectMyClassPagination(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
