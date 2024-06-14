import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Services = ({ isAuthenticated }) => {
    const [role, setRole] = useState('')
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <section id="service">
                <div className="container my-5 py-5">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="fs-5 text-center mb-0">Our Services</h3>
                            <h1 className="display-6 text-center mb-4">Our <b>Awesome</b> Services</h1>
                            <hr className="w-25 mx-auto " />
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-4">
                                <NavLink to="/services/art-registration" className="black-link">
                                    <div className="card p-3">
                                        <div className="card-body text-center">
                                            <i className="fa fa-paint-brush fa-4x mb-4 text-primary"></i>
                                            <h5 className="card-title mb-3 fs-4 fw-bold">Art Registration</h5>
                                            <p className="card-text lead">Register your artwork and showcase it to art enthusiasts around the globe.</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-md-4">
                                <NavLink to="/services/recommended-art" className="black-link">
                                    <div className="card p-3">
                                        <div className="card-body text-center">
                                            <i className="fa fa-thumbs-up fa-4x mb-4 text-primary"></i>
                                            <h5 className="card-title mb-3 fs-4 fw-bold">Art Recommendation</h5>
                                            <p className="card-text lead">Discover personalized art recommendations based on your taste and preferences.</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-md-4">
                                <NavLink to="/services/live-auction" className="black-link">
                                    <div className="card p-3">
                                        <div className="card-body text-center">
                                            <i className="fa fa-gavel fa-4x mb-4 text-primary"></i>
                                            <h5 className="card-title mb-3 fs-4 fw-bold">Live Art Auctions</h5>
                                            <p className="card-text lead">Participate in real-time art auctions and bid on your favorite pieces.</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-4">
                                <NavLink to="/services/commissioned-artwork-request" className="black-link">
                                    <div className="card p-3">
                                        <div className="card-body text-center">
                                            <i className="fa fa-paper-plane fa-4x mb-4 text-primary"></i>
                                            <h5 className="card-title mb-3 fs-4 fw-bold">Commissioned Artwork Request</h5>
                                            <p className="card-text lead">Request a custom artwork from your favorite artists tailored to your preferences.</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-md-4">
                                <NavLink to="/services/curated-art" className="black-link">
                                    <div className="card p-3">
                                        <div className="card-body text-center">
                                            <i className="fa fa-archive fa-4x mb-4 text-primary"></i>
                                            <h5 className="card-title mb-3 fs-4 fw-bold">Curated Collections</h5>
                                            <p className="card-text lead">Explore curated collections of exceptional artworks and unique masterpieces.</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-md-4">
                                <NavLink to="/services/artwork-authentication" className="black-link">
                                    <div className="card p-3">
                                        <div className="card-body text-center">
                                            <i className="fa fa-check-circle fa-4x mb-4 text-primary"></i>
                                            <h5 className="card-title mb-3 fs-4 fw-bold">Artwork Authentication Services</h5>
                                            <p className="card-text lead">Ensure the authenticity and value of your artwork with our reliable authentication services.</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>



                        <div className="row mt-5">
                            <div className="col-md-4">
                                <NavLink to="/admin-artwork-approval" className="black-link">
                                    <div className="card p-3">
                                        <div className="card-body text-center">
                                            <i className="fa fa-paint-brush fa-4x mb-4 text-primary"></i>
                                            <h5 className="card-title mb-3 fs-4 fw-bold">Pending Artworks</h5>
                                            <p className="card-text lead">Artwork pending for approval from adming</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-md-4">
                                <NavLink to="/admin-artwork" className="black-link">
                                    <div className="card p-3">
                                        <div className="card-body text-center">
                                            <i className="fa fa-thumbs-up fa-4x mb-4 text-primary"></i>
                                            <h5 className="card-title mb-3 fs-4 fw-bold">Admin Products</h5>
                                            <p className="card-text lead">Products shown to admin where he can add to recommended and curated</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-md-4">
                                <NavLink to="/bid-artwork-products" className="black-link">
                                    <div className="card p-3">
                                        <div className="card-body text-center">
                                            <i className="fa fa-gavel fa-4x mb-4 text-primary"></i>
                                            <h5 className="card-title mb-3 fs-4 fw-bold">Available Products</h5>
                                            <p className="card-text lead">Products Available to Seller to list for auction</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col-md-4">
                                <NavLink to="/admin/pending-auctions" className="black-link">
                                    <div className="card p-3">
                                        <div className="card-body text-center">
                                            <i className="fa fa-paper-plane fa-4x mb-4 text-primary"></i>
                                            <h5 className="card-title mb-3 fs-4 fw-bold">Pending Auctions</h5>
                                            <p className="card-text lead">Pending auctions for admin to approve and list them for auctions</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-md-4">
                                <NavLink to="/services/admin-commissioned" className="black-link">
                                    <div className="card p-3">
                                        <div className="card-body text-center">
                                            <i className="fa fa-archive fa-4x mb-4 text-primary"></i>
                                            <h5 className="card-title mb-3 fs-4 fw-bold">Commissioned Art</h5>
                                            <p className="card-text lead">Commissioned Arts for admin to approve and reject</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="col-md-4">
                                <NavLink to="/admin-artwork-new" className="black-link">
                                    <div className="card p-3">
                                        <div className="card-body text-center">
                                            <i className="fa fa-check-circle fa-4x mb-4 text-primary"></i>
                                            <h5 className="card-title mb-3 fs-4 fw-bold">Authentication Request</h5>
                                            <p className="card-text lead">Artwork request for admin to approve and reject</p>
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Services;
