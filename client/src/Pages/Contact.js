import React, { useEffect } from "react";
import Image from '../Assets/contact.jpg';

const Contact = () => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <section id="Contact">
                <div className="container my-5 py-5 ">
                    <div className="row mb-5 ">
                        <div className="col-12">
                            <h3 className="fs-5 text-center mb-0">Contact Us</h3>
                            <h1 className="display-6 text-center mb-4">Have Some <b>Question</b>?</h1>
                            <hr className="w-25 mx-auto " />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <img src={Image} alt="Contact" className="w-75" />

                        </div>
                        <div className="col-md-6">
                            <form action="">
                                <div className="mb-3">
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Your Name</label>
                                        <input type="text" className="form-control" id="name" placeholder="John Smith" />
                                    </div>
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Your Message</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                                </div>
                                <button type="submit" className="btn btn-outline-primary rounded-pill px-4">Send Message <i className="fa fa-paper-plane ms-2"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
