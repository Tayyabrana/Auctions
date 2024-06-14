import React, { useEffect, useState } from "react";
import productService from "../Services/productService";
import artWorkAuthService from "../Services/artWorkAuthService";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const ArtworkAuthentication = () => {
  const [formData, setFormData] = useState({
    artwork: "",
    reason: "",
  });
  const [products, setProducts] = useState([]);

  const navigation = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productService.getAllApprovedProducts();
        setProducts(response);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    artWorkAuthService
      .createArtWorkAuth(formData)
      .then((res) => console.log("res of create", res));
      message.success('artwork authentication service added')
      navigation('/services')
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Artwork Authentication Request</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="artworkSelection" className="form-label">
                    Select Artwork:
                  </label>
                  <select
                    className="form-select"
                    id="artworkSelection"
                    required
                    value={formData.artwork}
                    onChange={(e) =>
                      setFormData({ ...formData, artwork: e.target.value })
                    }
                  >
                    <option value="" hidden selected>
                      Choose an artwork...
                    </option>
                    {products.map((value) => (
                      <option value={value._id}>{value.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="authenticationReason" className="form-label">
                    Reason for Authentication:
                  </label>
                  <textarea
                    className="form-control"
                    id="authenticationReason"
                    value={formData.reason}
                    onChange={(e) =>
                      setFormData({ ...formData, reason: e.target.value })
                    }
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Request Authentication
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkAuthentication;
