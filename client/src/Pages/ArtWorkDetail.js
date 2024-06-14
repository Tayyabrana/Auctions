import React, { useState, useEffect } from 'react'
import { HideLoading, ShowLoading } from '../Redux/loaderSlice';
import { useNavigate } from "react-router-dom";
import '../Styles/ArtDetails.css'
import productService from '../Services/productService';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import { useParams } from 'react-router-dom';

const ArtworkDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [data, setData] = useState({})
    const dispatch = useDispatch();

    const handleSetDetails = async () => {
        try {
            dispatch(ShowLoading());
            const response = await productService.getProductById(id);
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
        handleSetDetails();
    }, [])

    const handleApproval = async (id) => {
        try {
            dispatch(ShowLoading());
            await productService.approveProduct(id);
            message.success("Approval Successful");
            navigate("/admin-artwork-approval");
        } catch (error) {
            message.error(error.response.data);
        } finally {
            dispatch(HideLoading());
        }
    };

    const handleRejection = async (id) => {
        try {
            dispatch(ShowLoading());
            await productService.rejectProduct(id);
            message.success("Deletion Successful");
            navigate("/admin-artwork-approval");
        } catch (error) {
            message.error(error.response.data);
        } finally {
            dispatch(HideLoading());
        }
    };

    return (
        <section className='featured-artworks'>
            <div className='artwork-detail'>
                <div className='artworks-container'>
                    <div className='artwork'>
                        <img src={data.image} alt={data.name} />
                        <h2>{data.name}</h2>
                        <p><b>Artist:</b> {data.user?.name}</p>
                        <p><b>Description:</b> {data.description}</p>
                        <button className='btn btn-1' onClick={() => handleApproval(data._id)}>Approve</button>
                        <button className='btn btn-2' onClick={() => handleRejection(data._id)}>Reject</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ArtworkDetail;
