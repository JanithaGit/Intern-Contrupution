import React, { Component } from "react";


import NavBar from "../components/common/NavBar";
import Showcase from "../components/versionTwo/Showcase";
import About from "../components/common/About";
import Features from "../components/versionTwo/Features";

import FunFactCOunter from "../components/versionTwo/FunFactCounter";
import Works from "../components/common/Works";

import ContactUS from "../components/common/ContactUS";

import ContactForm from './ContactForm';
import Footer from "../components/common/Footer";
import Benifits from "../components/common/Benifits";

class HomeTwo extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <React.Fragment>  


                <NavBar pageName="home" />
                <Showcase />
                <Benifits />
                <Works />
                <FunFactCOunter />
                <Features />
                <About />
                <ContactUS />
                <Footer pageName="home" />
            </React.Fragment>
        );
    }
}

export default HomeTwo;
