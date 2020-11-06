import React, { Component } from "react";
import i from "react-icofont";
import PropTypes from "prop-types";

class About extends Component {

    render() {
        const aboutData = this.props.aboutsData.map((about, index) => (
            <React.Fragment key={index}>
                {index % 10 === 0 ? (
                    <div className="row mt-100">
                        <div className="col-lg-6 col-md-6">
                            <div className="img">
                                <img src={about.image} alt="img" />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="about-text mb-0">
                                <span>{about.position}</span>
                                <h3>{about.title}</h3>
                                <p>{about.description}</p>
                                {about.blockQuote && (
                                    <blockquote className="blockquote">
                                        <p className="mb-0">
                                            {about.blockQuote}
                                        </p>
                                    </blockquote>
                                )}
                                {about.listItemOne ||
                                    about.listItemTwo ||
                                    about.listItemThree ||
                                    about.listItemFour ? (
                                        <ul>
                                            {about.listItemOne && (
                                                <li>
                                                    {/* <i className="icofont-ui-check" /> */}
                                                    {about.listItemOne}
                                                </li>
                                            )}
                                            {about.listItemTwo && (
                                                <li>
                                                    {/* <i className="icofont-ui-check" /> */}
                                                    {about.listItemTwo}
                                                </li>
                                            )}
                                            {about.listItemThree && (
                                                <li>
                                                    {/* <i className="icofont-ui-check" /> */}
                                                    {about.listItemThree}
                                                </li>
                                            )}
                                            {about.listItemFour && (
                                                <li>
                                                    {/* <i className="icofont-ui-check" /> */}
                                                    {about.listItemFour}
                                                </li>
                                            )}
                                        </ul>
                                    ) : null}
                            </div>
                        </div>
                    </div>
                ) : (
                        <div className="row mt-100">
                            <div className="col-lg-6 col-md-6">
                                <div className="about-text mt-0">
                                    <span>{about.position}</span>
                                    <h3>{about.title}</h3>
                                    <p>{about.description}</p>
                                    {about.blockQuote && (
                                        <blockquote className="blockquote">
                                            <p className="mb-0">
                                                {about.blockQuote}
                                            </p>
                                        </blockquote>
                                    )}
                                    {about.listItemOne ||
                                        about.listItemTwo ||
                                        about.listItemThree ||
                                        about.listItemFour ? (
                                            <ul>
                                                {about.listItemOne && (
                                                    <li>
                                                        {/* <i className="icofont-ui-check" /> */}
                                                        {about.listItemOne}
                                                    </li>
                                                )}
                                                {about.listItemTwo && (
                                                    <li>
                                                        <i className="icofont-ui-check" />
                                                        {about.listItemTwo}
                                                    </li>
                                                )}
                                                {about.listItemThree && (
                                                    <li>
                                                        <i className="icofont-ui-check" />
                                                        {about.listItemThree}
                                                    </li>
                                                )}
                                                {about.listItemFour && (
                                                    <li>
                                                        <i className="icofont-ui-check" />
                                                        {about.listItemFour}
                                                    </li>
                                                )}
                                            </ul>
                                        ) : null}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="img">
                                    <img src={about.image} alt="img" />
                                </div>
                            </div>
                        </div>
                    )}
            </React.Fragment>
        ));
        return (
            <React.Fragment>
                {/* Start About Area */}
                <section id="about" className="about-area ">
                    <div className="container">
                        {aboutData}
                    </div>
                </section>
                {/* End About Area */}
            </React.Fragment>
        );
    }
}

//Props Types
About.propTypes = {

    aboutBtnText: PropTypes.string,
    aboutBtnLink: PropTypes.string,
    aboutsData: PropTypes.array
};

//Default Props
About.defaultProps = {


    aboutBtnLink: "#0",
    aboutsData: [
        {
            image: require("../../assets/img/1.png"),
            position: "01",
            title: "Use your unique institute link to reach to your student base ",
            description:
                "You can promote your unique institute link to reach your students and conduct online classes.",
          
        },
        {
            image: require("../../assets/img/2.png"),
            position: "02",
            title: "Enable online payment option to your students ",
            description:
                " Through Edulab platform students can easily pay their tuition fee online. We allow payments through Visa & Mastercard.",
           
        }

    ]
};

export default About;
