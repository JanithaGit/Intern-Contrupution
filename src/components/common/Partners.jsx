import React, { Component } from "react";
import PropTypes from "prop-types";
import OwlCarousel from "react-owl-carousel3";

class Partners extends Component {
    render() {
        //Partner loop start
        const partnerData = this.props.partnersData.map((partner, index) => (
            <div className="col-lg-12 col-md-12" key={index}>
                <a href={partner.partnerLink}>
                    <img src={partner.partnerLogo} alt="partner" />
                </a>
            </div>
        ));
        //Partner loop END

        return (
            <React.Fragment>
                <div className="partner-area ptb-100">
                    <div className="container">
                        <div className="row">
                            <OwlCarousel
                                className="owl-theme partner-slides"
                                loop
                                autoplay={true}
                                nav={false}
                                mouseDrag={true}
                                autoplayHoverPause={true}
                                responsiveClass={true}
                                dots={false}
                                navText={[
                                    "<i class='icofont-curved-double-left'></i>",
                                    "<i class='icofont-curved-double-right'></i>"
                                ]}
                                responsive={{
                                    0: { items: 2 },
                                    768: {
                                        items: 4
                                    },
                                    1200: {
                                        items: 6
                                    }
                                }}
                            >
                                {partnerData}
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

//Props Types
Partners.propTypes = {
    sectionName: PropTypes.string,
    sectionTitle: PropTypes.string,
    sectionDescription: PropTypes.string,
    partnersData: PropTypes.array
};

//Default Props
Partners.defaultProps = {
    sectionName: "",
    sectionTitle: "",
    sectionDescription: "",
    partnersData: [
        {
            partnerLogo: require("../../assets/img/partner-1.jpg"),
            partnerLink: "#0"
        },
        {
            partnerLogo: require("../../assets/img/partner-2.jpg"),
            partnerLink: "#0"
        },
        {
            partnerLogo: require("../../assets/img/partner-3.jpg"),
            partnerLink: "#0"
        },
        {
            partnerLogo: require("../../assets/img/partner-4.jpg"),
            partnerLink: "#0"
        },
        {
            partnerLogo: require("../../assets/img/partner-5.jpg"),
            partnerLink: "#0"
        },
        {
            partnerLogo: require("../../assets/img/partner-6.jpg"),
            partnerLink: "#0"
        },
        {
            partnerLogo: require("../../assets/img/partner-3.jpg"),
            partnerLink: "#0"
        },
        {
            partnerLogo: require("../../assets/img/partner-4.jpg"),
            partnerLink: "#0"
        }
    ]
};
export default Partners;
