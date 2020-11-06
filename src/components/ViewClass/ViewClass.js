/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/17/20
 * Time: 7:53 PM
 */
import React, {Component} from 'react';
import './ViewClass.scss';
import {Button, Row} from "reactstrap";
import * as constants from "../../const/constants";
import {withRouter} from "react-router";
import * as actionCreator from "../../store/domain/classes/action";
import {connect} from "react-redux";
import * as commonFunc from "../../utils/commonFunc";
import moment from "moment";
import * as actionSpinnerCreator from "../../store/domain/spinner/action";

class App extends Component {
    render() {
        let {index, imageUrl, name, subject, dayTimes, nextDayOfClass,buttonStatus,fee,teacher,enrolledMonths,obj} = this.props;
        let title = `${name} - ${subject}`;

        return (
            <Row key={index} className={`view-class row shadow ${buttonStatus !== constants.BOUGHT_TEXT ? `expire-card`:`un-expire-card`}`}>
                <div className={"vc-image-wrapper"} onClick={()=>this.viewClassHandler(obj)}>
                    <img className={"vc-blur-image"} src={imageUrl} alt={"class"}/>
                    <img className={"vc-image"} src={imageUrl} alt={"class"}/>
                </div>
                <div className={"vc-right"}>
                    <p className={"vc-topic"}>{`${title.length > 50 ? title.substr(0,50)+'...':title}`}</p>
                    <p className={"vc-next"}>{`Next class hold on ${moment(nextDayOfClass.replace("Z","")).format("DD MMM YYYY")} at ${moment(nextDayOfClass.replace("Z","")).format("h:mm A")}`}</p>

                    {
                        dayTimes !== 0 && dayTimes.map((dayTime, i) => (
                            <p className={"vc-day"}
                               key={i}>{`${dayTime.dayName}, ${moment(`2000-01-01 ${dayTime.startTime}`).format('h:mm A')} to ${moment(`2000-01-01 ${dayTime.endTime}`).format('h:mm A')}`}</p>
                        ))
                    }

                    <p className={'vc-note'}>{`${teacher.teacherName}`}</p>

                    {
                        enrolledMonths.length !== 0 && <div className={"enrolled-months"}>
                            <p className={"title"}>Purchase month(s)</p>
                            {enrolledMonths.map((month,index)=>(
                                    <li key={index} className={"text syllabus"}>{`${month.year} - ${month.month}`}</li>
                            ))}
                        </div>
                    }

                    {
                        buttonStatus !== constants.BOUGHT_TEXT && <Button className="btn-neutral normal-txt vc-mb-1" color="default" onClick={this.purchaseHandler}>
                            {`Purchase for ${moment(nextDayOfClass.replace("Z","")).format("MMM")} - LKR ${parseFloat(fee).toFixed(2)}`}
                        </Button>
                    }
                </div>
                <div className={"vc-action"}>
                    <Button className="com-btn log-btn normal-txt" color="default" onClick={()=>this.viewClassHandler(obj)} >
                        View Class
                    </Button>
                    <br/>
                    {
                        buttonStatus === constants.BOUGHT_TEXT &&
                            <Button className="com-btn log-btn normal-txt" color="default" onClick={()=>this.joinClassHandler(obj)} >
                                {`Join to the class`}
                            </Button>
                    }

                </div>
            </Row>

            
        );
    }
    purchaseHandler = () => {
        commonFunc.studentPurchaseWarning(this.props);
    };
    joinClassHandler = (object) => {
        commonFunc.joinClassHandler(this.props,object)
    };
    viewClassHandler = (object) => {
        // commonFunc.notifyMessage(constants.DISABLE_YET,0);
        this.props.history.push({pathname:`${constants.BASE_ROUTE}${constants.HOME_VIEW_CLASS_ROUTE}`,state:`${object.id}`})
    };
}
const mapStateToProps = (state) => ({
    userType: state.auth.userType,
    selectClass: state.classes.selectClass,
});

const mapDispatchToProps = (dispatch) => ({
    selectClassHandler: data => dispatch(actionCreator.selectClass(data)),
    spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
