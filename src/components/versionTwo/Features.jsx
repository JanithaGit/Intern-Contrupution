import React, { Component } from "react";
import i from "react-icofont";
import PropTypes from "prop-types";
import OwlCarousel from "react-owl-carousel3";

class Features extends Component {
    render() {
        //Features loop start
        const featuredata = this.props.featuresData.map((feature, index) => (
            <div className="col-lg-12 col-md-12" key={index}>
                <div className="single-features">
                    <i className={feature.icon} />
                    <h3>{feature.featuresName}</h3>
                    <p>{feature.description}</p>
                </div>
            </div>
        ));
        //Features loop END

        return (
            <React.Fragment>
                <section
                    id="features"
                    className="features-area bg-gray"
                >
                    <div className="container">
                        <div className="section-title">
                            <h3>{this.props.sectionTitle}</h3>
                            {/* <p>{this.props.sectionDescription}</p> */}
                        </div>
                        <div className="row">
                            <OwlCarousel
                                className="owl-theme features-slides"
                                loop
                                autoplay={true}
                                nav={true}
                                mouseDrag={true}
                                autoplayHoverPause={true}
                                responsiveClass={true}
                                dots={false}
                                navText={[
                                    "<i class='icofont-curved-double-left'></i>",
                                    "<i class='icofont-curved-double-right'></i>"
                                ]}
                                responsive={{
                                    0: {
                                        items: 1
                                    },
                                    768: {
                                        items: 2
                                    },
                                    1024: {
                                        items: 3
                                    },
                                    1200: {
                                        items: 4
                                    }
                                }}
                            >
                                {featuredata}
                            </OwlCarousel>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

Features.propTypes = {
    sectionName: PropTypes.string,
    sectionTitle: PropTypes.string,
    sectionDescription: PropTypes.string,
    featuresData: PropTypes.array
};

Features.defaultProps = {
    sectionName: "Features",
    sectionTitle: "Key Features ",
    sectionDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

    featuresData: [
        {
            icon: "icofont-pay",
            featuresName: "Online payment",
            description:
                "Students can purchase their monthly payments via debit or credit card. No more hessle for collecting class fees. "
        },
        {
            icon: "icofont-location-arrow",
            featuresName: "No need of physical location",
            description:
                "Teachers and students are able to meet via video call without going to a physical location."
        },
        {
            icon: "icofont-site-map",
            featuresName: "Free subdomain",
            description:
                "You get a unique subdomain to your institute and able to promote your classes to your student base."
        },
        {
            icon: "icofont-bullseye",
            featuresName: "No competition",
            description:
                " Unique URLs will promote only your teachers and classes to your student base."
        }
        // {
        //     icon: "icofont-diamond",
        //     featuresName: "Fully customizable",
        //     description:
        //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
        // }
        // {
        //     icon: "icofont-responsive",
        //     featuresName: "Fully responsive",
        //     description:
        //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
        // }
    ]
};
export default Features;
