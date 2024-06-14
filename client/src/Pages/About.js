import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Image from '../Assets/about.jpg';

const About = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
            <section id="About">
                <div className='container my-5 py-4'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <img src={Image} alt="About" className='w-75 mt-5' />
                        </div>

                        <div className="col-md-6">
                            <h3 className="fs-5 mb-0">About Us</h3>
                            <h1 className="display-6 mb-2">Welcome to Our Online Auction Platform</h1>
                            <hr className='w-50' />
                            <p className="lead mb-4">Discover a new way to experience art and collectibles with our online auction system. We are dedicated to providing a platform where artists, craftsmen, and collectors come together to showcase and acquire unique pieces.</p>
                            <p className="lead mb-4">Our team is passionate about fostering a community that appreciates and values creativity. Whether you're an artist looking to share your work, a craftsman offering unique creations, or a collector seeking one-of-a-kind pieces, our platform is designed to cater to your needs.</p>
                            <p className="lead mb-4">Explore our auctions, connect with talented individuals, and engage in a dynamic marketplace. Join us on this exciting journey of discovery, where creativity knows no bounds.</p>
                            <NavLink to='/services/live-auction' className='btn btn-primary rounded-pill px-4 py-2'>Explore Auctions</NavLink>
                            <NavLink to='/contact' className='btn btn-outline-primary rounded-pill px-4 py-2 ms-2'>Contact Us</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
