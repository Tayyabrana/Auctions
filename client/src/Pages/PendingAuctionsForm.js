import React, { useState, useEffect } from 'react';
import '../Styles/ArtRegistration.css';
import { message } from 'antd';
import productService from '../Services/productService';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../Redux/loaderSlice';
import { useNavigate, useParams } from 'react-router-dom';

const PendingAuctionsForm = () => {
    const navigate = useNavigate();
    const id = useParams()
    // const categories = ['minutes', 'hours', 'days', 'months'];
    const dispatch = useDispatch();
    const [auctionDetails, setAuctionDetails] = useState({
        id: id.id,
        start_date: '',
        end_date: '',
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
        console.log(auctionDetails)
        const startDateInMillis = new Date(auctionDetails.start_date).getTime();
        const endDateInMillis = new Date(auctionDetails.end_date).getTime();

        const auctionDetailsInMillis = {
            ...auctionDetails,
            start_date: startDateInMillis,
            end_date: endDateInMillis,
        };

        try {
            dispatch(ShowLoading());
            const response = await productService.approveForAuction(auctionDetailsInMillis);
            message.success(response);
            setAuctionDetails({
                start_date: '',
                end_date: '',
            });
            // console.log(response)
        } catch (error) {
            message.error(error.response.data);
        } finally {
            navigate('/admin/pending-auctions')
            dispatch(HideLoading());
        }
    };


    return (
        <div className="Art-Registration">
            <h1 className="title">Pending Auction Details</h1>
            <form className="art-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="name">Start Date:</label>
                    <input
                        type='datetime-local'
                        id="start_date"
                        name="start_date"
                        value={auctionDetails.start_date}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="name">End Date:</label>
                    <input
                        type='datetime-local'
                        id="end_date"
                        name="end_date"
                        value={auctionDetails.end_date}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit">Bid</button>
            </form>
        </div>
    );
};

export default PendingAuctionsForm;
