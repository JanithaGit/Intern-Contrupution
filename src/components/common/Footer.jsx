import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import PropTypes from "prop-types";
import logo from '../../assets/img/logo-dark.png';

class Footer extends Component {
    render() {
       
        return (
            <React.Fragment>
                <footer className="footer-area ptb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="single-footer">
                                    <h4 className="logo">
                                        <a href="#home">
                                        <img style={{ maxWidth: "40%" }} src={logo} alt="log" />
                                        </a>
                                    </h4>
                                    <p>{this.props.siteDescription}</p>
                                    {/* <a
                                        href={this.props.btnLink}
                                        className="btn btn-primary"
                                    >
                                        {this.props.btnText}
                                    </a> */}
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-footer footer-navbar-nav">
                                    <h3>{this.props.usefullLinksTitle}</h3>
                                    <ul>
                                        <li>
                                            {this.props.pageName === "home" ? (
                                                <a className="" href="#home">
                                                    <i className="icofont-double-right" />
                                                    Home
                                                </a>
                                            ) : (
                                                <NavLink
                                                    className=""
                                                    to="/"
                                                    activeClassName=""
                                                >
                                                    <i className="icofont-double-right" />
                                                    Home
                                                </NavLink>
                                            )}
                                        </li>

                                        <li>
                                            {this.props.pageName === "home" ? (
                                                <a href="#features">
                                                    <i className="icofont-double-right" />
                                                    Features
                                                </a>
                                            ) : (
                                                <NavLink
                                                    to="/"
                                                    activeClassName=""
                                                >
                                                    <i className="icofont-double-right" />
                                                    Features
                                                </NavLink>
                                            )}
                                        </li>
                                        {/* <li>
                                            {this.props.pageName === "home" ? (
                                                <a href="#pricing">
                                                    <i className="icofont-double-right" />
                                                    Pricing
                                                </a>
                                            ) : (
                                                <NavLink
                                                    to="/"
                                                    activeClassName=""
                                                >
                                                    <i className="icofont-double-right" />
                                                    pricing
                                                </NavLink>
                                            )}
                                        </li> */}

                                    </ul>
                                </div>
                            </div>
                         
                            <div className="col-lg-4 col-md-6">
                                <div className="single-footer">
                                    <h3>{this.props.contactInfoTitle}</h3>
                                    <ul className="contact-info">
                                        <li>
                                            <i className="icofont-google-map" />
                                            {this.props.address}
                                        </li>
                                        <li>
                                            <i className="icofont-phone" />
                                            {this.props.phone}
                                        </li>
                                        <li>
                                            <i className="icofont-envelope" />
                                            {this.props.email}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="copyright-area">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 col-md-7">
                                    <p>{this.props.copyRightText}</p>
                                </div>
                                <div className="col-lg-5 col-md-5">
                                    <ul>
                                        {this.props.fbLink && (
                                            <li>
                                                <Link
                                                    to={this.props.fbLink}
                                                    className="icofont-facebook"
                                                />
                                            </li>
                                        )}

                                        {this.props.twitterlLink && (
                                            <li>
                                                <Link
                                                    to={this.props.twitterlLink}
                                                    className="icofont-twitter"
                                                />
                                            </li>
                                        )}

                                        {this.props.instagramlLink && (
                                            <li>
                                                <Link
                                                    to={
                                                        this.props
                                                            .instagramlLink
                                                    }
                                                    className="icofont-instagram"
                                                />
                                            </li>
                                        )}

                                        {this.props.linkedinlLink && (
                                            <li>
                                                <Link
                                                    to={
                                                        this.props.linkedinlLink
                                                    }
                                                    className="icofont-linkedin"
                                                />
                                            </li>
                                        )}

                                        {this.props.vimeolLink && (
                                            <li>
                                                <Link
                                                    to={this.props.vimeolLink}
                                                    className="icofont-vimeo"
                                                />
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}

//Props Types
Footer.propTypes = {
    siteDescription: PropTypes.string,
    btnText: PropTypes.string,
    btnLink: PropTypes.string,

    usefullLinksTitle: PropTypes.string,

    
    contactInfoTitle: PropTypes.string,
    contactInfoText: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,

    fbLink: PropTypes.string,
    twitterlLink: PropTypes.string,
    instagramlLink: PropTypes.string,
    linkedinlLink: PropTypes.string,
    vimeolLink: PropTypes.string
};

//Default Props
Footer.defaultProps = {
    siteDescription:
    "Edulab is an authentic online teaching platform which connects Sri Lankan private teachers and students.",
    // btnLink: "#",

    usefullLinksTitle: "Useful Links",

    supportTitle: "Support",
    supportsLinks: [
        {
            Name: "Career",
            Link: ""
        },
        {
            Name: "Support",
            Link: "#"
        },
        {
            Name: "Resource",
            Link: "#"
        },
        {
            Name: "Strategy",
            Link: "#"
        },
        {
            Name: "FAQ",
            Link: "#"
        },
        {
            Name: "Contact",
            Link: "#"
        }
    ],

    contactInfoTitle: "Contact Info",
    //contactInfoText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    address: "17A, Hirana Road, Panadura",
    phone: "(+94) 117 112 119",
    email: "support@edulab.lk",

    copyRightText: "Copyright \u00a9 2020 All Rights Reserved.",
    fbLink: "#",
    twitterlLink: "#",
    instagramlLink: "#",
    linkedinlLink: "#",
    vimeolLink: "#"
};
export default Footer;
