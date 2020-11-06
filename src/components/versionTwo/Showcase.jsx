import React, {Component} from "react";
import PropTypes from "prop-types";
import "react-modal-video/css/modal-video.min.css";
import ModalVideo from "react-modal-video";
import {Link} from "react-scroll/modules";
import {LinkContainer} from "react-router-bootstrap";

class Showcase extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        };
        this.openModal = this.openModal.bind(this);
    }

    openModal() {
        this.setState({isOpen: true});
    }

    render() {
        return (
            <React.Fragment>
                <div id="home" className="main-banner">
                    <div className="creative-bg"/>
                    <div className="pattern"/>
                    <ModalVideo
                        channel="youtube"
                        className="intro-video"
                        isOpen={this.state.isOpen}
                        videoId="TzBL1Z8g97A"
                        onClose={() =>
                            this.setState({
                                isOpen: false
                            })
                        }
                    />
                    <div className="d-table">
                        <div className="d-table-cell">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="main-banner-content">
                                            <h1>{this.props.showcasenName}</h1>
                                            <p>
                                                {this.props.showcaseDescription1}
                                            </p>
                                            <p>
                                                {this.props.showcaseDescription2}
                                            </p>
                                            <LinkContainer to="/inquire">
                                                <Link
                                                    activeClass="active"
                                                    path="/inquire"
                                                >
                                                    <a className="btn btn-primary">
                                                        {this.props.showcaseBtnOneText}
                                                    </a>
                                                </Link>
                                            </LinkContainer>

                                            <button
                                                onClick={this.openModal}
                                                className="btn btn-secondary "
                                            >
                                                <i className="icofont-ui-play"/>
                                                {this.props.showcaseBtnTwoText}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="banner-img">
                                            <img
                                                src={this.props.showcaseImage}
                                                alt="img"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-bottom"/>
                </div>
            </React.Fragment>
        );
    }
}

//Props Types
Showcase.propTypes = {
    showcasenName: PropTypes.string,
    showcaseDescription1: PropTypes.string,
    showcaseDescription2: PropTypes.string,
    showcaseImage: PropTypes.string,
    showcasePattern: PropTypes.string,
    showcaseBtnOneLink: PropTypes.string,
    showcaseBtnOneText: PropTypes.string,
    showcaseBtnTwoText: PropTypes.string
};

//Default Props
Showcase.defaultProps = {
    showcasenName: "What is Edulab? ",
    showcaseDescription1:
        "Edulab is an authentic online teaching platform which connects Sri Lankan private teachers and students. ",
    showcaseDescription2:
        "Edulab allows private class teachers to create their own web portal to conduct their classes online by giving a unique web page with a unique URL. Edulab platform has an inbuilt payment integration system, which allows card payments. This platform helps you to cut down unnecessary facility fees and attract students around the country plus collect the class fees without a hassle.  ",

    showcaseImage: require("../../assets/img/main-banner.png"),
    //showcaseCreative: require("../../assets/img/creative-art.png"),
    showcasePattern: require("../../assets/img/pattern.png"),
    showcaseBtnOneLink: "#contact",
    showcaseBtnOneText: "Let's Get Started",
    showcaseBtnTwoLink: "//www.youtube.com/watch?time_continue=2&v=TzBL1Z8g97A&feature=emb_logo",
    showcaseBtnTwoText: "Watch Our Video"
};

export default Showcase;
