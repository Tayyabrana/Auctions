import React, { useState, useEffect } from 'react';
import '../Styles/Product.css';
import { message } from 'antd';
import productService from '../Services/productService';
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../Redux/loaderSlice";

const Products = () => {
    const [products, setProducts] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState(null);
    const dispatch = useDispatch();

    const fetchProducts = async () => {
        try {
            const response = await productService.getAllApprovedProducts();
            setProducts(response);
            setFilteredProducts(response);
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(ShowLoading());
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filtered = products.filter(product => product.name.toLowerCase().includes(searchValue));
        setFilteredProducts(filtered);
    };

    return (
        <div className='Products'>
            <h1 className='title'>Products</h1>
            <div className='search-container'>
                <div className="input-group input-group-sm mb-3 search">
                    <input
                        type="text"
                        className="form-control rounded-start py-2"
                        placeholder="Search Product..."
                        aria-label="Search"
                        aria-describedby="button-addon2"
                        onChange={handleSearch}
                    />
                    <button className="btn btn-outline-secondary rounded-end px-2" type="button" id="button-addon2">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
            {filteredProducts ?
                <div className='products-container'>
                    {filteredProducts.map((product, index) => (
                        <div key={index} className='product-card'>
                            <img src={product.image} alt={product.name} />
                            <div className='name'>{product.name}</div>
                            <div className='description'>{product.description}</div>
                            <label className='owner-label' htmlFor='owner-name'>Owner Name</label>
                            <div id='owner-name'>{product.user.name}</div>
                        </div>
                    ))
                    }
                </div>
                :
                <h4 className='no-products'>No Products Yet</h4>
            }
        </div>
    );
};

export default Products;
