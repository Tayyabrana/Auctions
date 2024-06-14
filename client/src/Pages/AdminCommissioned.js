import React, { useState, useEffect } from "react";
import { HideLoading, ShowLoading } from "../Redux/loaderSlice";
import { useDispatch } from "react-redux";
import { message } from "antd";
import "../Styles/adminComission.css";
import commissioned from "../Services/commissioned";
import { useLocation } from "react-router-dom";

const AdminCommissioned = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation()

  const handleData = async () => {
    try {
      
      dispatch(ShowLoading());
      const response = await commissioned.getcommissioned();
      if (response) {
        setProducts(response.products);
      } else {
        message.error("Failed to load data");
      }
    } catch (error) {
      message.error(error.response.data || "Failed to load data");
    } finally {
      dispatch(HideLoading());
    }
  };

  const handleAccept = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await commissioned.approve(id);
      if (response.success) {
        window.location.reload();
        message.success("Product approved successfully");
       } else {
        window.location.reload();
        message.error("Failed to approve product");
      }
    } catch (error) {
      message.error("An error occurred while approving the product");
    } finally {
      dispatch(HideLoading());
    }
  };

  const handleReject = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await commissioned.reject(id);
      if (response.success) {
        window.location.reload();
        message.success("Product rejected successfully");
       } else {
        window.location.reload();
        message.error("Failed to reject product");
        
      }
    } catch (error) {
      message.error("An error occurred while rejecting the product");
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    handleData();
  }, []);

  return (
    <div className="artwork-detail">
      <div className="artworks-container">
        {products.map((product, index) => (
          <div className="artwork" key={index}>
            <p>
              <b>detail:</b> {product.details}
            </p>
            <p>
              <b>budget:</b> {product.budget}
            </p>
            <p>
              <b>requirements:</b> {product.requirements}
            </p>
            <p>
              <b>status:</b> {product.status}
            </p>
            {product?.status === "approved" || product?.status === "rejected" ? 
          ''
          :  
          <>
          
            <button
              className="btn btn-1"
              onClick={() => handleAccept(product._id)}
            >
              Accept
            </button>
            <button
              className="btn btn-2"
              onClick={() => handleReject(product._id)}
            >
              Reject
            </button>
            </> }
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCommissioned;
