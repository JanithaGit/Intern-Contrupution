import React, { Component } from "react";
import axios from "axios";
import NavBar from "../components/common/NavBar";

import { ValidationForm, TextInput } from "react-bootstrap4-form-validation";
import PropTypes from "prop-types";
import Footer from "../components/common/Footer";
import contactImg from "../assets/img/contact_form.png"
import swal from "sweetalert";
import * as validator from '../constants/Validator';

class Inquire extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            number: "",
            email: "",
            business_name: "",
            preferred_link: "",
            message: "",
            successMsg: ""
        };
    }

    mobileNumberValidataion = (value) => {
        return validator.mobileRegex.test(value);
    };

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
            .catch(error => { this.messageHandler("FAILED") });
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
                            this.props.history.push("/")
                        }
                        break;
                    default:
                }
            })
    };

    handleFields = e => {
        this.setState({ [e.target.name]: e.target.value, successMsg: '' })
    };

    render() {
        return (
            <React.Fragment>

                <div>
                    <NavBar />
                    {/* Start Contact Area */}
                    <section id="inquire" className="contact-area bg-gray  ">
                        <div className="container contact-bg" >

                            <div className="row  ">

                                <div className="col-lg-12 col-md-12 cont ">
                                    <h5 className="titles">
                                        {this.props.sectionName}
                                    </h5>
                                    <div className="section-title ">
                                        <h3>{this.props.contactTitle}</h3>
                                        <p>
                                            {this.props.contactDescriptionsOne}
                                        </p>
                                        <p>
                                            {this.props.contactDescriptionsTwo}
                                        </p>
                                    </div>

                                <div className="col-lg-12 col-md-12 contact-img" >
                                <img  src={contactImg} />
                                </div>
                                </div>

                            </div>
                        </div>
                    </section>



                    <section  >
                        <div className="container form-area" >
                            <div className="row ">
                                <div className="col-lg-12 col-md-12">
                                    <ValidationForm
                                        id="contactForm"
                                        onSubmit={(e, formData, inputs) => {
                                            e.preventDefault();
                                            this.handleForm(formData);
                                        }}
                                    >
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group ">
                                                    <label className={"req-lbl"}> First Name</label>
                                                    <TextInput
                                                        name="first_name"
                                                        id="first_name"
                                                        required
                                                        successMessage=""
                                                        errorMessage="Please enter your First Name"
                                                        className="form-control text-area"
                                                        placeholder="First Name"
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
                                                    <label> Last Name</label>
                                                    <TextInput
                                                        name="last_name"
                                                        id="last_name"
                                                        successMessage=""
                                                        errorMessage="Please enter your Last Full Name"
                                                        className="form-control text-area"
                                                        placeholder="Last Name"
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
                                                    <label className={"req-lbl"}>Phone Number </label>
                                                    <TextInput
                                                        name="number"
                                                        id="number"
                                                        type={"number"}
                                                        required
                                                        successMessage=""
                                                        validator={this.mobileNumberValidataion}
                                                        errorMessage={{required:"Please enter your Phone Number", validator: "Please enter valid Phone Number"}}
                                                        className="form-control text-area"
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
                                                    <label className={"req-lbl"}>Email Address</label>
                                                    <TextInput
                                                        name="email"
                                                        id="email"
                                                        type="email"
                                                        required
                                                        successMessage=""
                                                        errorMessage="Please enter your email address"
                                                        className="form-control text-area"
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
                                                    <label>Institute/Business Name</label>
                                                    <TextInput
                                                        name="business_name"
                                                        id="business_name"
                                                        type="text"
                                                        //required
                                                        successMessage=""
                                                        errorMessage="Please enter your Institute/Business name"
                                                        className="form-control text-area"
                                                        placeholder="Business name"
                                                        autoComplete="off"
                                                        onChange={
                                                            this.handleFields
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label className={"req-lbl"}>Preferred Link</label>
                                                    <TextInput
                                                        name="preferred_link"
                                                        id="preferred_link"
                                                        required
                                                        successMessage=""
                                                        errorMessage="Please enter your Preferred Link"
                                                        className="form-control text-area"
                                                        placeholder="Preferred Link"
                                                        autoComplete="off"
                                                        onChange={
                                                            this.handleFields
                                                        }
                                                    />
                                                    <span>Your Edulab Link -https://<span className="link-color">{this.state.preferred_link}</span>.edulab.lk/</span>
                                                    <div className="help-block with-errors" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 col-md-12">
                                                <div className="form-group">
                                                    <label>Anything you'd like to know?</label>
                                                    <TextInput
                                                        name="message"
                                                        id="description"
                                                        multiline
                                                        placeholder="Your message"
                                                        className="form-control text-area"
                                                        //required
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
                                                Submit Inquiry
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
                <Footer pageName="inquire" />
            </React.Fragment >


        );
    }
}

//Props Types
Inquire.propTypes = {
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
Inquire.defaultProps = {
    sectionName: "Inquiry Form",

    phoneTitle: "Phone / Fax",
    phoneNoOne: "+94117112119",
    phoneNoTwo: "+94117112119",
    emailTitle: "E-mail",
    emailAddressOne: "support@edulab.lk",
    emailAddressTwo: "support@edulab.lk",
    locationTitle: "Location",
    locationAddressLineOne: "2750 Quadra Street , Park Area,",
    locationAddressLineTwo: "Victoria, Canada.",

    contactTitle: "Tell us more about your",
    contactDescriptionsOne:
        "To register with edulab please take moment and fill up this inquiry form ",
};

export default Inquire;
