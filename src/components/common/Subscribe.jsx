import React, { Component } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
const CustomForm = ({ status, message, onValidated }) => {
    let email;
    const submit = () =>
        email &&
        email.value.indexOf("@") > -1 &&
        onValidated({
            EMAIL: email.value
        });
    return (
        <div className="subscribe-form">
            <input
                ref={node => (email = node)}
                type="email"
                placeholder="Your Email Address"
                className="form-control"
                required
            />
            <button className="btn btn-primary" onClick={submit}>
                Submit
            </button>
            {status === "sending" && (
                <div className="subs-sending-msg">sending...</div>
            )}
            {status === "error" && (
                <div
                    className="subs-error-msg"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
            {status === "success" && (
                <div
                    className="subs-success-msg"
                    dangerouslySetInnerHTML={{ __html: message }}
                />
            )}
        </div>
    );
};

class Subscribe extends Component {
    state = {};
    render() {
        const url =
            "https://salahsoftwaresolution.us20.list-manage.com/subscribe/post?u=12beaf82e73f59e8b7d199a95&id=a7729f146f";
        return (
            <React.Fragment>
                <section className="subscribe-area ptb-100">
                    <div className="bg-top" />
                    <div className="bg-bottom" />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="newsletter">
                                    <h4>
                                        Subscribe for the latest
                                        <span> Axolot</span> Updates
                                    </h4>
                                    <MailchimpSubscribe
                                        url={url}
                                        render={({
                                            subscribe,
                                            status,
                                            message
                                        }) => (
                                            <CustomForm
                                                status={status}
                                                message={message}
                                                onValidated={formData =>
                                                    subscribe(formData)
                                                }
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pattern" />
                    <div className="pattern-2" />
                </section>
            </React.Fragment>
        );
    }
}

export default Subscribe;
