import React from "react";
import { Route, Switch} from "react-router-dom";
import Page from "react-page-loading";

//Package CSS
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "animate.css/animate.min.css";

//Template SCSS Style
import "./assets/scss/style.scss";
import "./assets/scss/responsive.scss";

//Component Import
import HomeTwo from "./pages/HomeTwo";
import ScrollUpBtn from "./components/common/ScrollUpBtn";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ContactForm from "./pages/ContactForm";
const App = () => {

    React.useEffect(() => {
        window.scrollTo(0,0)
    });

    return (
        <div className="App">
            <div>
                <Page loader={"bar"} color={"#506CEA"} size={9}>
                    <Route
                        render={({ location }) => (
                            <TransitionGroup className="transition-group">
                                <CSSTransition
                                    key={location.key}
                                    timeout={{ enter: 900, exit: 900 }}
                                    classNames="fade"
                                >
                                    <section className="route-section">
                                        <Switch location={location}>

                                            <Route
                                                path="/"
                                                exact
                                                component={HomeTwo}
                                            />
                                            <Route
                                                path="/inquire"
                                                component={ContactForm}
                                            />

                                        </Switch>
                                    </section>
                                </CSSTransition>
                            </TransitionGroup>
                        )}
                    />
                    <ScrollUpBtn />
                </Page>
            </div>
        </div>
    );
}

export default App;
