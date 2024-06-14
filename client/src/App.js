import React, { useState } from 'react';
import "./App.css";
import { Route, Routes, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loader from "./Components/Loader";
import { useSelector } from "react-redux";
import Navbar from './Components/Navbar.js';
import Footer from './Components/Footer.js';
import Login from './Pages/Login.js';
import Register from './Pages/Register.js';
import Home from './Pages/Home.js';
import About from './Pages/About.js';
import Contact from './Pages/Contact.js';
import Services from './Pages/Services.js';
import ArtRegistration from './Pages/ArtRegistration.js';
import ArtworkAuthentication from './Pages/ArtworkAuthentication.js';
import LiveAuction from './Pages/LiveAuction.js';
import RecommendedArt from './Pages/RecommendedArt.js';
import CommissionArtworkRequest from './Pages/CommissionedArtworkRequest.js';
import Products from './Pages/Products.js';
import ArtWorkApprovalRejection from './Pages/ArtWorkApprovalRejection.js';
import ArtWorkDetail from './Pages/ArtWorkDetail.js';
import ArtworkDetail from './Pages/ArtWorkDetail.js';
import AdminArtWork from './Pages/AdminArtWork.js';
import ApprovedArtworkDetail from './Pages/ApprovedArtWorkDetail.js';
import CuratedArtWork from './Pages/CuratedArtwork.js';
import BidForAuctionProducts from './Pages/BidForAuctionProducts.js';
import BidProductDetails from './Pages/BidProductDetails.js';
import PendingAuctions from './Pages/PendingAuctions.js';
import PendingAuctionsForm from './Pages/PendingAuctionsForm.js';
import Bid from './Pages/Bid.js';
import AdminCommissioned from './Pages/AdminCommissioned.js';
import AdminArt1 from './Pages/AdminArt.js';
import ViewBids from './Pages/ViewBids.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('auction-jwt-token'));
  const { loading } = useSelector((state) => state.loader);

  return (
    <div className="App">
      {loading && <Loader />}
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
      <div className='main-content'>
        <Routes>
          <Route path='/' element={!isAuthenticated ? <Navigate to="/login" /> : <Navigate to="/home" />} />
          <Route path='/home' element={!isAuthenticated ? <Navigate to="/login" /> : <Home />} />
          <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/register' element={isAuthenticated ? <Navigate to="/" /> : <Register />} />
          <Route path='/about' element={!isAuthenticated ? <Navigate to="/login" /> : <About />} />
          <Route path='/viewbid/:id' element={!isAuthenticated ? <Navigate to="/login" /> : <ViewBids />} />
          <Route path='/contact' element={!isAuthenticated ? <Navigate to="/login" /> : <Contact />} />
          <Route path='/products' element={!isAuthenticated ? <Navigate to="/login" /> : <Products />} />
          <Route path='/services' element={!isAuthenticated ? <Navigate to="/login" /> : <Services />} />
          <Route path='/services/art-registration' element={!isAuthenticated ? <Navigate to="/login" /> : <ArtRegistration />} />
          <Route path='/services/artwork-authentication' element={!isAuthenticated ? <Navigate to="/login" /> : <ArtworkAuthentication />} />
          <Route path='/services/commissioned-artwork-request' element={!isAuthenticated ? <Navigate to="/login" /> : <CommissionArtworkRequest />} />
          <Route path='/services/live-auction' element={!isAuthenticated ? <Navigate to="/login" /> : <LiveAuction />} />
          <Route path='/services/live-auction-bid/:id' element={!isAuthenticated ? <Navigate to="/login" /> : <Bid />} />
          <Route path='/services/recommended-art' element={!isAuthenticated ? <Navigate to="/login" /> : <RecommendedArt />} />
          <Route path='/services/curated-art' element={!isAuthenticated ? <Navigate to="/login" /> : <CuratedArtWork />} />
          <Route path='/services/admin-commissioned' element={!isAuthenticated ? <Navigate to="/login" /> : <AdminCommissioned />} />
          <Route path='/services/admin-art' element={!isAuthenticated ? <Navigate to="/login" /> : <adminArt />} />

          <Route path='/bid-artwork-products' element={!isAuthenticated ? <Navigate to="/login" /> : <BidForAuctionProducts />} />
          <Route path='/bid-artwork-products/:id' element={!isAuthenticated ? <Navigate to="/login" /> : <BidProductDetails />} />

          <Route path='/admin-artwork-new' element={!isAuthenticated ? <Navigate to="/login" /> : <AdminArt1 />} />
          <Route path='/admin-artwork' element={!isAuthenticated ? <Navigate to="/login" /> : <AdminArtWork />} />
          <Route path='/admin-artwork-approval' element={!isAuthenticated ? <Navigate to="/login" /> : <ArtWorkApprovalRejection />} />
          <Route path='/admin/artwork-approval/:id' element={!isAuthenticated ? <Navigate to="/login" /> : <ArtworkDetail />} />
          <Route path='/admin/artwork-recommendation/:id' element={!isAuthenticated ? <Navigate to="/login" /> : <ApprovedArtworkDetail />} />
          <Route path='/admin/pending-auctions' element={!isAuthenticated ? <Navigate to="/login" /> : <PendingAuctions />} />
          <Route path='/admin/pending-auctions/:id' element={!isAuthenticated ? <Navigate to="/login" /> : <PendingAuctionsForm />} />

        </Routes>
      </div>
      {isAuthenticated && <Footer />}
    </div>
  );
}

export default App;
