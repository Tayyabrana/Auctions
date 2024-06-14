import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { HideLoading, ShowLoading } from "../Redux/loaderSlice";
import "../Styles/adminComission.css";
import adminArts from "../Services/adminart";
import { useLocation } from "react-router-dom";

const AdminArt = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await adminArts.getArt();
        if (response) {
          setProducts(response);
        } else {
          message.error("Failed to load data");
        }
      } catch (error) {
        message.error(error.response ? error.response.data : "Failed to load data");
      } finally {
        dispatch(HideLoading());
      }
    };
    fetchData();
  }, [dispatch]);

  const handleAccept = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await adminArts.approve(id);
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
      const response = await adminArts.reject(id);
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

  return (
    <div className="artwork-detail">
      <div className="artworks-container">
        {products.map((product, index) => (
          <div className="artwork" key={index}>
            <p>
              <b>Reason:</b> {product.reason}
            </p>
            <p>
              <b>Status:</b> {product.status}
            </p>
            {product?.status === "approved" || product?.status === "rejected" ? 
''
:
<>
            <button className="btn btn-1" onClick={() => handleAccept(product._id)}>Accept</button>
            <button className="btn btn-2" onClick={() => handleReject(product._id)}>Reject</button>
</>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminArt;
