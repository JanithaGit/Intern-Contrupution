import React, { Component } from "react";
import PropTypes from "prop-types";

class JointClient extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="join-area ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="join-content">
                                    <h3>{this.props.titles}</h3>
                                    <p>{this.props.descriptions}</p>
                                    {this.props.joinNowBtnLink && (
                                        <a
                                            href={this.props.joinNowBtnLink}
                                            className="btn btn-primary"
                                        >
                                            {this.props.joinNowBtnText}
                                        </a>
                                    )}

                                    {this.props.forFreeTrialLink && (
                                        <a
                                            href={this.props.forFreeTrialLink}
                                            className="btn btn-secondary"
                                        >
                                            {this.props.forFreeTrialText}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}
//Props Types
JointClient.propTypes = {
    titles: PropTypes.string,
    descriptions: PropTypes.string,
    joinNowBtnLink: PropTypes.string,
    forFreeTrialLink: PropTypes.string,
    leftsideImage: PropTypes.string
};

//Default Props
JointClient.defaultProps = {
    titles: "Overall 400k+ Our Clients Please Get Start Now",
    descriptions:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    joinNowBtnLink: "#0",
    joinNowBtnText: "Join Now",
    forFreeTrialLink: "#0",
    forFreeTrialText: "For Free trial",
    leftsideImage: require("../../assets/img/3.png")
};

export default JointClient;
