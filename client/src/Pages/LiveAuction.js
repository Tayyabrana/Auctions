// import { useDispatch } from 'react-redux';
// import React, { useState, useEffect } from 'react'
// import { HideLoading, ShowLoading } from '../Redux/loaderSlice';
// import productService from '../Services/productService';
// import { message } from 'antd';
// import { Link } from 'react-router-dom';

// const LiveAuction = () => {

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);
//     const [data, setData] = useState([])
//     const dispatch = useDispatch();

//     useEffect(() => {
//         console.log(data)
//     }, [data])

//     const handleData = async () => {
//         try {
//             dispatch(ShowLoading());
//             const response = await productService.getAuctionProducts();
//             if (response) {
//                 console.log(response)
//                 setData(response);
//                 console.log(data)
//             } else {
//                 message.error('Failed to load data');
//             }
//         } catch (error) {
//             message.error(error.response.data);
//         } finally {
//             dispatch(HideLoading());
//         }
//     };

//     useEffect(() => {
//         handleData();
//     }, [])

//     const ongoingAuctions = [
//         {
//             id: 1,
//             artworkName: 'Artwork 1',
//             basePrice: '$500',
//             highestBid: '$700',
//             timeLeft: '2h 30m',
//         },
//         {
//             id: 2,
//             artworkName: 'Artwork 2',
//             basePrice: '$300',
//             highestBid: '$450',
//             timeLeft: '1h 45m',
//         },
//         {
//             id: 3,
//             artworkName: 'Artwork 3',
//             basePrice: '$700',
//             highestBid: '$900',
//             timeLeft: '3h 15m',
//         },
//         // Add more ongoing auctions as needed
//     ];

//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-md-12">
//                     <h2 className="text-center mb-4">Ongoing Auctions</h2>
//                 </div>
//             </div>
//             <div className="row">
//                 {
//                     data && data.length > 0 ?
//                         <>
//                             {

//                                 data.map((auction) => (
//                                     <div key={auction._id} className="col-md-4 mb-4">
//                                         <div className="card">
//                                             {/* <img
//                                                 src={`${auction.product.image}`}
//                                                 alt={auction.artworkName}
//                                                 className="card-img-top"
//                                             /> */}
//                                             <div className="card-body">
//                                                 <h5 className="card-title">{auction.product.name}</h5>
//                                                 <p className="card-text">Base Price: {auction.base_price}</p>
//                                                 <p className="card-text">Highest Bid: {auction.end_price}</p>
//                                                 <p className="card-text">Time Left: {auction.duration}</p>
//                                                 <a href="#" className="btn btn-primary">
//                                                     View Details
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))
//                             }
//                         </> :
//                         <>Hello</>
//                 }
//             </div>
//         </div>
//     );
// };

// export default LiveAuction;
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { HideLoading, ShowLoading } from "../Redux/loaderSlice";
import productService from "../Services/productService";
import { message } from "antd";
import { Link } from "react-router-dom";

const LiveAuction = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [auctions, setAuctions] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await productService.getOngoingAuctionProducts();
        if (response) {
          setAuctions(response);
        } else {
          message.error("Failed to load data");
        }
      } catch (error) {
        message.error(error.response.data);
      } finally {
        dispatch(HideLoading());
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <h2 className="text-center mb-4">Ongoing Auctions</h2>
        </div>
      </div>
      <div className="row">
        {!auctions || auctions.length === 0 ? (
          <div className="no-data">No auction Products</div>
        ) : (
          auctions.map((auction) => (
            <div key={auction._id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={auction.product.image}
                  alt={auction.product.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{auction.product?.name}</h5>
                  <p className="card-text">Base Price: {auction.base_price}</p>
                  <p className="card-text">Highest Bid: {auction.end_price}</p>
                  <p className="card-text">Time Left: {auction.duration}</p>

                  <Link
                    className="btn btn-primary"
                    to={`/services/live-auction-bid/${auction._id}`}
                  >
                    Bid here
                  </Link>
                  <Link
                    className="btn btn-primary"
                    to={`/viewbid/${auction._id}`}
                  >
                    View Bids
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LiveAuction;
