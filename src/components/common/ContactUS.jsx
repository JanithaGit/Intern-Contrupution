import React, { Component } from "react";
import axios from "axios";
import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import PropTypes from "prop-types";
import swal from "sweetalert";
import * as validator from "../../constants/Validator";

class ContactUS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            subject: "",
            message: "",
            successMsg: ""
        };
    }

    handleForm = () => {
        axios
            .post("https://formcarry.com/s/BWGWYOEM0hXF", this.state, {
                headers: { Accept: "application/json" }
            })
            .then(() => {
                // document.getElementById("contactForm").reset();
                // that.setState({
                //     successMsg: "We received your submission"
                // });
                // document.getElementById("contactForm").reset();
                this.messageHandler("SUCCESS")
            })
            .catch(error => {this.messageHandler("FAILED")});
    };

    messageHandler = (status) => {
        swal({
            title: status === "SUCCESS" ? "We received your submission":"Connection interrupted. Please try again!",
            icon: status === "SUCCESS" ? "success":"error",
            closeOnClickOutside: false,
            buttons: {
                dangerMode: {
                    text: "Okay",
                    value: "action",
                    className: "okay-btn"
                }
            }
        })
            .then((value) => {
                switch (value) {
                    case "action":
                        if(status === "SUCCESS"){
                            document.getElementById("contactForm").reset();
                        }
                        break;
                    default:
                }
            })
    };

    handleFields = e => this.setState({ [e.target.name]: e.target.value ,successMsg:''});

    mobileNumberValidataion = (value) => {
        return validator.mobileRegex.test(value);
    };

    render() {
        return (
            <React.Fragment>

                <div>

                    {/* Start Contact Area */}
                    <section id="contact" className="contact-area bg-gray ptb-100">
                        <div className="container">
                            <div className="row">



                                <div className="col-lg-12 col-md-12">

                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="contact-text">
                                        <h3>{this.props.contactTitle}</h3>
                                        <p>
                                            {this.props.contactDescriptionsOne}
                                        </p>
                                        <p>
                                            {this.props.contactDescriptionsTwo}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <ValidationForm
                                        id="contactForm"
                                        onSubmit={(e, formData, inputs) => {
                                            e.preventDefault();
                                            this.handleForm(formData);
                                        }}
                                    >
                                        <div className="row">
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <TextInput
                                                        name="name"
                                                        id="name"
                                                        required
                                                        successMessage=""
                                                        errorMessage="Please enter your name"
                                                        className="form-control"
                                                        placeholder="Name"
                                                        autoComplete="off"
                                                        onChange={
                                                            this.handleFields
                                                        }
                                                    />
                                                    <div className="help-block with-errors" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-12">
                                                <div className="form-group">
                                                    <TextInput
                                                        name="email"
                                                        id="email"
                                                        type="email"
                                                        required
                                                        successMessage=""
                                                        errorMessage="Please enter your email address"
                                                        className="form-control"
                                                        placeholder="Email"
                                                        autoComplete="off"
                                                        onChange={
                                                            this.handleFields
                                                        }
                                                    />
                                                    <div className="help-block with-errors" />
                                                </div>
                                            </div>

                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <TextInput
                                                        name="subject"
                                                        id="subject"
                                                        type="text"
                                                        //required
                                                        successMessage=""
                                                        errorMessage="Please enter your email subject"
                                                        className="form-control"
                                                        placeholder="Subject"
                                                        autoComplete="off"
                                                        onChange={
                                                            this.handleFields
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <TextInput
                                                        name="number"
                                                        id="number"
                                                        required
                                                        successMessage=""
                                                        validator={this.mobileNumberValidataion}
                                                        errorMessage={{required:"Please enter your Phone Number", validator: "Please enter valid Phone Number"}}
                                                        className="form-control"
                                                        placeholder="Phone Number (0771234567)"
                                                        autoComplete="off"
                                                        onChange={
                                                            this.handleFields
                                                        }
                                                    />
                                                    <div className="help-block with-errors" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <TextInput
                                                        name="message"
                                                        id="description"
                                                        multiline
                                                        placeholder="Your message"
                                                        className="form-control"
                                                        required
                                                        successMessage=""
                                                        errorMessage="Please write your message"
                                                        rows="5"
                                                        autoComplete="off"
                                                        onChange={
                                                            this.handleFields
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <button className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                        <div className="clearfix" />
                                    </ValidationForm>
                                    {this.state.successMsg !== "" ? (
                                        <h3 className="contactMsg">
                                            {this.state.successMsg}
                                        </h3>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Start Contact Area */}
                </div>

            </React.Fragment>
        );
    }
}

//Props Types
ContactUS.propTypes = {
    sectionName: PropTypes.string,

    phoneTitle: PropTypes.string,
    phoneNoOne: PropTypes.string,
    phoneNoTwo: PropTypes.string,
    emailTitle: PropTypes.string,
    emailAddressOne: PropTypes.string,
    emailAddressTwo: PropTypes.string,
    locationTitle: PropTypes.string,
    locationAddressLineOne: PropTypes.string,
    locationAddressLineTwo: PropTypes.string,

    contactTitle: PropTypes.string,
    contactDescriptionsOne: PropTypes.string,
    contactDescriptionsTwo: PropTypes.string
};
//Default Props
ContactUS.defaultProps = {
    sectionName: "CONTACT AXOLOT",

    phoneTitle: "Phone / Fax",
    phoneNoOne: "+94117112119",
    phoneNoTwo: "+94117112119",
    emailTitle: "E-mail",
    emailAddressOne: "support@edulab.lk",
    emailAddressTwo: "support@edulab.lk",
    locationTitle: "Location",
    locationAddressLineOne: "2750 Quadra Street , Park Area,",
    locationAddressLineTwo: "Victoria, Canada.",

    contactTitle: "Have some questions?",
    contactDescriptionsOne:
        "Whether you have a question about features, pricing, need a demo or anything else, our team is ready to answer all of your questions. ",
}

export default ContactUS;
