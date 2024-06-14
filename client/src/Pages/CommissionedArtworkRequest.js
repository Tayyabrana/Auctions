import React, { useEffect, useState } from "react";
import artWorkAuthService from "../Services/artWorkAuthService";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const CommissionArtworkRequest = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    details: "",
    requirements: "",
    budget: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    artWorkAuthService
      .createcommissionArt(formData)
      .then((res) => console.log("res of handl", res))
      .catch((err) => console.log("err", err));
    message.success("commision artwork request added ");
    navigate("/services");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Commission Artwork Request</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="artworkDetails" className="form-label">
                    Artwork Details:
                  </label>
                  <textarea
                    className="form-control"
                    id="artworkDetails"
                    rows="3"
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        details: e.target.value,
                      })
                    }
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="commissionRequirements"
                    className="form-label"
                  >
                    Commission Requirements:
                  </label>
                  <textarea
                    className="form-control"
                    id="commissionRequirements"
                    rows="3"
                    value={formData.requirements}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        requirements: e.target.value,
                      })
                    }
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="budget" className="form-label">
                    Budget:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    id="budget"
                    required
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Submit Request
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

export default CommissionArtworkRequest;
