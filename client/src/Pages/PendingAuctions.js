import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { HideLoading, ShowLoading } from '../Redux/loaderSlice';
import productService from '../Services/productService';
import { message } from 'antd';
import { Link } from 'react-router-dom';

const PendingAuctions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    // Log data whenever it updates
    useEffect(() => {
        console.log('Updated data:', data);
    }, [data]);

    const handleData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await productService.getAuctionProducts();
            if (response) {
                setData(response);
            } else {
                message.error('Failed to load data');
            }
        } catch (error) {
            message.error(error.response.data);
        } finally {
            dispatch(HideLoading());
        }
    };

    useEffect(() => {
        handleData();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center mb-4">Pending Auctions</h2>
                </div>
            </div>
            <div className="row">
                {
                    (!data || data.length === 0) ? (
                        <div className='no-data'>No pending auction Products</div>
                    ) : (
                        data?.map((auction) => (
                            <div key={auction._id} className="col-md-4 mb-4">
                                <div className="card">
                                    <img
                                        src={`${auction.product.image}`}
                                        alt={auction.product.name}
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{auction.product?.name}</h5>
                                        <p className="card-text">Base Price: {auction.base_price}</p>
                                        <p className="card-text">Highest Bid: {auction.end_price}</p>
                                        <p className="card-text">Time Left: {auction.duration}</p>
                                        <Link to={`/admin/pending-auctions/${auction._id}`}>
                                            <a href="#" className="btn btn-primary">
                                                View Details
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
            </div>
        </div>
    );
};

export default PendingAuctions;
