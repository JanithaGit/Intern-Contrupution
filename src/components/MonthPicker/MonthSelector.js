/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/29/20
 * Time: 4:23 PM
 */
import React, {Component} from 'react';
import './MonthSelector.scss';
import * as commonFunc from "../../utils/commonFunc";
import {Dropdown} from "semantic-ui-react";
import * as dropdownConst from '../../utils/dropdownConst';

class App extends Component {
    state = {
        selectMonth: '', yearList: [], year:'', curYear:'',curMonth:0
    };
    monthOnChange = (month,index) => {
        let {year,curMonth,curYear} = this.state;
        if(year === curYear && curMonth > index){
            return;
        }
        this.setState({selectMonth: month})
    };
    selectMonthHandler = () => {
        let {selectMonth,year} = this.state;
        if (selectMonth !== "") {
            this.props.selectMonthHandler({month:selectMonth,year:year});
            return;
        }
        commonFunc.notifyMessage("Please select a month");
    };
    dropdownOnChange = (name) => (e, {value}) => {
        this.setState({[name]: value});
    };
    componentWillMount() {
        let months = dropdownConst.months;
        let curMonth = new Date().getMonth();
        let curYear = new Date().getFullYear();
        let yearList = [
            {key: 0, text: curYear, value: curYear},
            {key: 1, text: curYear+1, value: curYear+1}
        ];
        this.setState({selectMonth: months[curMonth].value,yearList:yearList,year:curYear,curYear:curYear,curMonth:curMonth})
    }

    render() {
        let {selectMonth,yearList,year,curMonth,curYear} = this.state;
        return (
            <div className={"month-selector rmp-pad"}>
                <ul>
                    <Dropdown
                        placeholder='Select a year' className={"form-control teach-input"} fluid selection selectOnBlur={false}
                        options={yearList} value={year} onChange={this.dropdownOnChange('year')}/>
                </ul>
                <ul className={"rmp-ul"}>
                    {
                        dropdownConst.months.map((map, index) => {
                            return <li className={`rmp-btn f-f ${selectMonth === map.value && `rmp-active`} ${year === curYear && curMonth > index && `rmp-previous-month`}`} key={index}
                                       onClick={() => this.monthOnChange(map.value,index)}>{map.text}</li>
                        })
                    }
                </ul>

                <ul className={"rmp-action-wrapper"}>
                    <li className={"rmp-action-btn btn-neutral f-f"} onClick={this.props.closeMonthHandler}>
                        Cancel
                    </li>
                    <li className={"rmp-action-btn btn-neutral f-f"} onClick={this.selectMonthHandler}>
                        Select
                    </li>
                </ul>
            </div>
        );
    }
}

export default App;
