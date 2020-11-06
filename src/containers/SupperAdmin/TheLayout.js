import React,{Component} from 'react'
import {
  TheSidebar,
  
  TheHeader
} from './index'
import TheFooter from '../Common/TheFooter';
import TheContent from "./TheContent";


class App extends Component {
render(){

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}
}

export default App;
