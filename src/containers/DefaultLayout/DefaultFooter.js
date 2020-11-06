import React, {Component} from 'react';

class DefaultFooter extends Component {
  render() {
    return (
      <React.Fragment>
        <span>
          {/*<a href="https://coreui.io">*/}
            &copy; 2020 Edulab
          {/*</a>*/}
        </span>
        <span className="ml-auto">Powered by <a href="https://ceyentra.com/">Ceyentra Technologies</a></span>
      </React.Fragment>
    );
  }
}

export default DefaultFooter;
