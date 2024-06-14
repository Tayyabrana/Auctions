import React, { useState, useEffect } from 'react';
import '../Styles/ArtRegistration.css';
import { message } from 'antd';
import productService from '../Services/productService';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../Redux/loaderSlice';

const ArtRegistration = () => {
    const categories = ['Painting', 'Sculpture', 'Photography'];
    const dispatch = useDispatch();
    const [artDetails, setArtDetails] = useState({
        image: '',
        name: '',
        category: '',
        description: '',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArtDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setArtDetails((prevDetails) => ({ ...prevDetails, image: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(ShowLoading());
            const formData = new FormData();
            formData.append('productImage', artDetails.image);
            formData.append('name', artDetails.name);
            formData.append('category', artDetails.category);
            formData.append('description', artDetails.description);
            const response = await productService.registerProduct(formData);
            message.success(response);
            setArtDetails({
                image: '',
                name: '',
                description: '',
                category: ''
            });
            console.log(response)
        } catch (error) {
            message.error(error.response.data);
        } finally {
            dispatch(HideLoading());
        }
    };


    return (
        <div className="Art-Registration">
            <h1 className="title">Art Registration</h1>
            <form className="art-form" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                    <div className="upload-group">
                        <label htmlFor="image-upload" className="upload-label">
                            Image:
                        </label>
                        <input
                            type="file"
                            id="image-upload"
                            name="image"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Art Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={artDetails.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        name="category"
                        value={artDetails.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={artDetails.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit">Register Art</button>
            </form>
        </div>
    );
};

export default ArtRegistration;
