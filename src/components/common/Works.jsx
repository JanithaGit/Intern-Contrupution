import React, { Component } from "react";
import PropTypes from "prop-types";

class Works extends Component {
    render() {
        //Works Data Loop Start
        const workdays = this.props.worksData.map((work, index) => (
            <div
                className={
                    (index + 1) % 4 === 0
                        ? "col-lg-3 col-md-3 offset-lg-0 offset-md-3"
                        : "col-lg-3 col-md-4"
                }
                key={index}
            >
                <div
                    className={
                        (index + 1) % 4 === 0
                            ? "single-box"
                            : "single-box with-line"
                    }
                >
                    <span>{work.position}</span>
                    <h3>{work.heading}</h3>
                    <p>{work.description}</p>
                </div>
            </div>
        ));
        //Works Data Loop END

        return (
            <React.Fragment>
                <section className="how-works-area bg-gray ptb-100">
                    <div className="container">
                        <div className="section-title">
                            {/* <span>{this.props.sectionName}</span> */}
                            <h3>{this.props.sectionTitle}</h3>
                            {/* <p>{this.props.sectionDescription}</p> */}
                        </div>

                        <div className="row">{workdays}</div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

//Props Types
Works.propTypes = {
    sectionName: PropTypes.string,
    sectionTitle: PropTypes.string,
    sectionDescription: PropTypes.string,
    worksData: PropTypes.array
};

//Default Props
Works.defaultProps = {
    sectionName: "Works",
    sectionTitle: "How it Works ",
    sectionDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",

    worksData: [
        {
            position: "01.",
            heading: "Register to Edulab platform",
            description:
                " Register and contact edulab team for create own web portal."
        },
        {
            position: "02.",
            heading: "Update teacher profile ",
            description:
                " Add your teachers to the website with their details."
        },
        {
            position: "03.",
            heading: "Create classes",
            description:
                " Add class time table to the each teacher in the institute ."
        },
        {
            position: "04.",
            heading: "Share the unique url with students "
        //     description:
        //         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
         }
    ]
};
export default Works;
