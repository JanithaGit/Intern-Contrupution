import React, { Component } from "react";
import i from "react-icofont";
import PropTypes from "prop-types";

class benifits extends Component {
    
    render() {
       
        return (
            <React.Fragment>
                {/* Start benifits Area */}
                <section id="benifits" className="benifits-area ">
                    <div className="container">
                
                        <div className="row">
                            <div className="col-lg-6 col-md-12">
                                <div className="benifits-content">
                                    <h3>{this.props.benifitsTitle}</h3>
                                    <p>{this.props.benifitsDescription}</p>
                                    <ul className="pull-left">
                                        {this.props.benifitsListItemOne && (
                                            <li>
                                                <i className="icofont-ui-check" />
                                                {this.props.benifitsListItemOne}
                                            </li>
                                            
                                        )}

                                        {this.props.benifitsListItemTwo && (
                                            <li>
                                                <i className="icofont-ui-check" />
                                                {this.props.benifitsListItemTwo}
                                            </li>
                                        )}
                                        {this.props.benifitsListItemThree && (
                                            <li>
                                                <i className="icofont-ui-check" />
                                                {this.props.benifitsListItemThree}
                                            </li>
                                        )}
                                        {this.props.benifitsListItemFour && (
                                            <li>
                                                <i className="icofont-ui-check" />
                                                {this.props.benifitsListItemFour}
                                            </li>
                                        )}
                                    
                                    
                                        {this.props.benifitsListItemFive && (
                                            <li>
                                                <i className="icofont-ui-check" />
                                                {this.props.benifitsListItemFive}
                                            </li>
                                        )}
                                        {this.props.benifitsListItemSix && (
                                            <li>
                                                <i className="icofont-ui-check" />
                                                {this.props.benifitsListItemSix}
                                            </li>
                                        )}
                                        {this.props.benifitsListItemSeven && (
                                            <li>
                                                <i className="icofont-ui-check" />
                                                {this.props.benifitsListItemSeven}
                                            </li>
                                        )}
                                        {this.props.benifitsListItemEight && (
                                            <li>
                                                <i className="icofont-ui-check" />
                                                {this.props.benifitsListItemEight}
                                            </li>
                                        )}
                                    </ul>
                                  
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="benifits-img">
                                    <img
                                        src={this.props.benifitsImage}
                                        alt="benifits"
                                    />
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </section>
                {/* End benifits Area */}
            </React.Fragment>
        );
    }
}

//Props Types
benifits.propTypes = {
    benifitsImage: PropTypes.string,
    benifitsTitle: PropTypes.string,
    benifitsDescription: PropTypes.string,
    benifitsListItemOne: PropTypes.string,
    benifitsListItemTwo: PropTypes.string,
    benifitsListItemThree: PropTypes.string,
    benifitsListItemFour: PropTypes.string,
    benifitsListItemFive: PropTypes.string,
    benifitsListItemSix: PropTypes.string,
  
};

//Default Props
benifits.defaultProps = {
    sectionName: "benifits Us",
    sectionTitle: "We provide best service for you customers.",
    sectionDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

    benifitsImage: require("../../assets/img/benifits.png"),
    benifitsTitle: "Why use Edulab?",
    benifitsDescription:
        "You will get all the benefits mention below when using the edulab.",
    benifitsListItemOne: "Own website for your institute ",
    benifitsListItemTwo: "A unique website link",
    benifitsListItemThree: "Hassle free class fee collect",
    benifitsListItemFour: "Upto 1000 students able to join to class at once ",
    benifitsListItemFive: "Share the class resources freely",
   
  
};

export default benifits;
