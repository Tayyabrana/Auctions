import React, { useState, useEffect } from 'react';
import '../Styles/ArtRegistration.css';
import { message } from 'antd';
import productService from '../Services/productService';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../Redux/loaderSlice';
import { useNavigate, useParams } from 'react-router-dom';

const Bid = () => {
    const navigate = useNavigate();
    const id = useParams()
    const dispatch = useDispatch();
    const [auctionDetails, setAuctionDetails] = useState({
        auction: id.id,
        bid_price: '',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        console.log(id)
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuctionDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(auctionDetails)
        try {
            dispatch(ShowLoading());
            const response = await productService.bidAuction(auctionDetails);
            message.success(response);
            setAuctionDetails({
                bid_price: '',
            });
            console.log(response)
        } catch (error) {
            message.error(error.response.data);
        } finally {
            navigate('/services/live-auction')
            dispatch(HideLoading());
        }
    };


    return (
        <div className="Art-Registration">
            <h1 className="title">Let's Bid</h1>
            <form className="art-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="name">Bid Price:</label>
                    <input
                        type='number'
                        id="bid_price"
                        name="bid_price"
                        value={auctionDetails.bid_price}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Bid</button>
            </form>
        </div>
    );
};

export default Bid;
