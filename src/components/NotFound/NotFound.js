/**
 * Created by WebStorm.
 * User: athukorala
 * Date: 7/31/20
 * Time: 10:30 AM
 */
import React,{Component} from 'react';
import notFoundImg from '../../assets/img/common/not-found.png';
import './NotFound.scss';

class App extends Component{
    render() {
        let {message} = this.props;
        return (
            <div className={"not-found"}>
                <img src={notFoundImg} alt={"not-found"}/>
                <label>{`Oops! ${message} not found`}</label>
            </div>
        );
    }
}
export default App;
