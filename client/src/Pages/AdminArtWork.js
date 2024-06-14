import React, { useState, useEffect } from 'react'
import { HideLoading, ShowLoading } from '../Redux/loaderSlice';
import productService from '../Services/productService';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import '../Styles/global.css'
import { Link } from 'react-router-dom';

const AdminArtWork = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [data, setData] = useState([])
    const dispatch = useDispatch();

    const handleData = async () => {
        try {
            dispatch(ShowLoading());
            const response = await productService.getAllApprovedNormalProducts();
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
    }, [])

    return (
        <div className='Recommended-Art'>
            <section className='featured-artworks'>
                <h2>Approved Artworks</h2>
                <div className='artworks-container'>
                    {
                        (!data || data.length === 0) ? (
                            <div className='no-data'>No Approved Products</div>
                        ) : (
                            data.map((d, index) => (
                                <div className='artwork' key={index}>
                                    <img src={d.image} alt='Artwork 1' />
                                    <h3>{d.name}</h3>
                                    <p>Artist: {d.user.name}</p>
                                    <Link to={{
                                        pathname: `/admin/artwork-recommendation/${d._id}`,
                                        state: { artwork: d }
                                    }}>
                                        <button>View Details</button>
                                    </Link>
                                </div>
                            ))
                        )}
                </div>
            </section>
        </div>
    )
}

export default AdminArtWork