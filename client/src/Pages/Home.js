import React, { useEffect } from 'react';
import '../Styles/Home.css';
import { NavLink } from 'react-router-dom';
import Artwork1 from '../Assets/Artwork1.png';
import Artwork2 from '../Assets/Artwork2.png';
const Home = () => {
    let role = localStorage.getItem('role');
    console.log(role)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='Home'>
            <section className='hero-section'>
                <div className='hero-content'>
                    <h1>Welcome to the Online Auction System</h1>
                    <p>Explore unique artworks, connect with artists, and participate in exciting auctions.</p>
                    <NavLink to='/Products'>Get Started</NavLink>
                </div>
            </section>

            <section className='featured-artworks'>
                <h2>Featured Artworks</h2>
                <div className='artworks-container'>
                    {/* Replace the placeholders with actual artwork components */}
                    <div className='artwork'>
                        <img src={Artwork1} alt='Artwork 1' />
                        <h3>Artwork Title</h3>
                        <p>Artist: Artist Name</p>
                        <button>View Details</button>
                    </div>

                    <div className='artwork'>
                        <img src={Artwork2} alt='Artwork 2' />
                        <h3>Artwork Title</h3>
                        <p>Artist: Artist Name</p>
                        <button>View Details</button>
                    </div>
                    <div className='artwork'>
                        <img src={Artwork1} alt='Artwork 1' />
                        <h3>Artwork Title</h3>
                        <p>Artist: Artist Name</p>
                        <button>View Details</button>
                    </div>

                    <div className='artwork'>
                        <img src={Artwork2} alt='Artwork 2' />
                        <h3>Artwork Title</h3>
                        <p>Artist: Artist Name</p>
                        <button>View Details</button>
                    </div>

                    <div className='artwork'>
                        <img src={Artwork1} alt='Artwork 1' />
                        <h3>Artwork Title</h3>
                        <p>Artist: Artist Name</p>
                        <button>View Details</button>
                    </div>

                    <div className='artwork'>
                        <img src={Artwork2} alt='Artwork 2' />
                        <h3>Artwork Title</h3>
                        <p>Artist: Artist Name</p>
                        <button>View Details</button>
                    </div>


                    {/* Add more artworks as needed */}
                </div>
            </section>

            <section className='how-it-works'>
                <h2>How It Works</h2>
                <div className='steps-container'>
                    <div className='step'>
                        <h3>Step 1</h3>
                        <p>Create an Account</p>
                    </div>

                    <div className='step'>
                        <h3>Step 2</h3>
                        <p>Browse Artworks</p>
                    </div>

                    <div className='step'>
                        <h3>Step 3</h3>
                        <p>Place Bids</p>
                    </div>

                    <div className='step'>
                        <h3>Step 4</h3>
                        <p>Win and Enjoy</p>
                    </div>
                </div>
            </section>

            <section className='upcoming-auctions'>
                <h2>Upcoming Auctions</h2>
                <div className='auctions-container'>
                    {/* Replace the placeholders with actual auction components */}
                    <div className='auction'>
                        <h3>Auction Title</h3>
                        <p>Date: MM/DD/YYYY</p>
                        <button>View Auction</button>
                    </div>

                    <div className='auction'>
                        <h3>Auction Title</h3>
                        <p>Date: MM/DD/YYYY</p>
                        <button>View Auction</button>
                    </div>

                    {/* Add more auctions as needed */}
                </div>
            </section>

            {/* Services content */}
            <section className='services-content'>
                <h2>Our Services</h2>
                <p>Explore our range of services that cater to artists, craftsmen, and collectors alike. From showcasing your artwork to discovering unique pieces, we provide a platform that brings the creative community together.</p>
                <NavLink to='/services'>Discover Services</NavLink>
            </section>

            {/* Additional content */}
            <section className='additional-content'>
                <h2>Explore More</h2>
                <p>Discover a world of creativity and craftsmanship. Join our community to stay updated on upcoming events and exclusive offers.</p>
                <NavLink to='/About'>Learn More</NavLink>
            </section>

        </div>
    );
};

export default Home;
