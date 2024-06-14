import React, { useState, useEffect } from "react";
import productService from "../Services/productService";
import { Button, message } from "antd";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ShowLoading, HideLoading } from "../Redux/loaderSlice";
import "../Styles/adminComission.css";
import moment from "moment";

const ViewBids = () => {

  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await productService.auctionBids(params.id);
        setProducts(response);
      } catch (error) {
        message.error(error.response?.data || "Failed to load data");
      } finally {
        dispatch(HideLoading());
      }
    };
    console.log(products);
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <div className="artwork-detail">
        <div className="d-flex align-items-end pb-3">
          <Button onClick={() => navigate(`/services/live-auction-bid/${products[0]?.auction}`)}> Bid Now </Button>
        </div>

        <div className="artworks-container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Customer Name</th>
                 <th scope="col">Biding Time</th>
                <th scope="col">Biding Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr>
                  <td>{product?.customer?.name}</td>
                  <td>{moment(product.updatedAt).startOf("minute").fromNow()}</td>
                  <td>Rs. {product.bid_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewBids;
