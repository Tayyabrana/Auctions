import React, { useState, useEffect } from 'react';
import '../Styles/ArtRegistration.css';
import { message } from 'antd';
import productService from '../Services/productService';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../Redux/loaderSlice';
import { useNavigate, useParams } from 'react-router-dom';

const BidProductDetails = () => {
    const navigate = useNavigate();
    const id = useParams()
    const categories = ['minutes', 'hours', 'days', 'months'];
    const dispatch = useDispatch();
    const [auctionDetails, setAuctionDetails] = useState({
        id: id.id,
        base_price: '',
        end_price: '',
        duration: '',
        unit: '',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuctionDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (parseFloat(auctionDetails.base_price) >= parseFloat(auctionDetails.end_price)) {
            message.error('End price must be greater than base price');
            return;
        }
        console.log(auctionDetails)
        try {
            dispatch(ShowLoading());
            const response = await productService.bidProduct(auctionDetails);
            message.success(response);
            setAuctionDetails({
                base_price: '',
                end_price: '',
                duration: '',
                unit: ''
            });
            console.log(response)
        } catch (error) {
            message.error(error.response.data);
        } finally {
            navigate('/bid-artwork-products')
            dispatch(HideLoading());
        }
    };


    return (
        <div className="Art-Registration">
            <h1 className="title">Bid Registration</h1>
            <form className="art-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="name">Base Price:</label>
                    <input
                        type='number'
                        id="base_price"
                        name="base_price"
                        value={auctionDetails.base_price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">End Price:</label>
                    <input
                        type='number'
                        id="end_price"
                        name="end_price"
                        value={auctionDetails.end_price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Duration:</label>
                    <input
                        type='number'
                        id="duration"
                        name="duration"
                        value={auctionDetails.duration}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Unit:</label>
                    <select
                        id="unit"
                        name="unit"
                        value={auctionDetails.unit}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>Select time units</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Bid</button>
            </form>
        </div>
    );
};

export default BidProductDetails;
