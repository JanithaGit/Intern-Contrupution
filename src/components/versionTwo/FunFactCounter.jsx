import React, { Component } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

class FunFactCOunter extends Component {
    state = {
        didViewCountUp: false
    };

    onVisibilityChange = isVisible => {
        if (isVisible) {
            this.setState({ didViewCountUp: true });
        }
    };

    render() {
        return (
            <React.Fragment>
          <section className="funfacts-area">
                    <div className="container">
                        <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="funFact">
                                    <i className="icofont-teacher" />
                                    <h3>
                                        <VisibilitySensor
                                            onChange={this.onVisibilityChange}
                                            offset={{
                                                top: 10
                                            }}
                                            delayedCall
                                        >
                                            <CountUp
                                                start={0}
                                                end={
                                                    this.state.didViewCountUp
                                                        ? 16
                                                        : 0
                                                }
                                                //suffix="K"
                                                duration={2}
                                            />
                                        </VisibilitySensor>
                                    </h3>
                                    <p>Teachers</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="funFact">
                                    <i className="icofont-group-students" />
                                    <h3>
                                        <VisibilitySensor
                                            onChange={this.onVisibilityChange}
                                            offset={{
                                                top: 10
                                            }}
                                            delayedCall
                                        >
                                            <CountUp
                                                start={0}
                                                end={
                                                    this.state.didViewCountUp
                                                        ? 1020
                                                        : 0
                                                }
                                                // suffix="k"
                                                duration={2}
                                            />
                                        </VisibilitySensor>
                                    </h3>
                                    <p>Students</p>
                                </div>
                            </div>
                            
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="funFact">
                                    <i className="icofont-cubes" />
                                    <h3>
                                        <VisibilitySensor
                                            onChange={this.onVisibilityChange}
                                            offset={{
                                                top: 10
                                            }}
                                            delayedCall
                                        >
                                            <CountUp
                                                start={0}
                                                end={
                                                    this.state.didViewCountUp
                                                        ? 42
                                                        : 0
                                                }
                                                //suffix="K"
                                                duration={2}
                                            />
                                        </VisibilitySensor>
                                    </h3>
                                    <p>Classes</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-sm-6">
                                <div className="funFact">
                                    <i className="icofont-presentation-alt" />
                                    <h3>
                                        <VisibilitySensor
                                            onChange={this.onVisibilityChange}
                                            offset={{
                                                top: 10
                                            }}
                                            delayedCall
                                        >
                                            <CountUp
                                                // decimals={2}
                                                start={0}
                                                end={
                                                    this.state.didViewCountUp
                                                        ? 139
                                                        : 0
                                                }
                                                duration={2}
                                            />
                                        </VisibilitySensor>
                                    </h3>
                                    <p>Sessions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

export default FunFactCOunter;
