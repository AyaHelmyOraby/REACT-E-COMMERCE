import React from 'react';
import NavBar from './components/Navbar/Navbar';
import HeroSection from './components/Hero Section/herosection';
import IconSection from './components/Icons Section/icons';
import ProductGrid from './components/Product Grid Section/productgrid';
import ProductDetails from './components/productdetails/details'; // Corrected import
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateForm from './components/update/updateform';
import ProductCreate from '../src/components/create/createform'
import ProductFavorites from '../src/components/favourite/favourite'
import AddToCard from '../src/components/add to card/addtocard'

const App = () => {
  return (
    <Router>
      <>
        <NavBar />
        <HeroSection />
        <IconSection />

        {/* Define routes here */}
        <Routes>
          <Route path="/" element={<ProductGrid />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route path="/updateform/:id" element={< UpdateForm/>} />
          <Route path="/createform/" element={< ProductCreate/>} />
          <Route path="/favouriteproducts" element={<ProductFavorites/>} />
          <Route path="/AddToCard" element={<AddToCard/>} />



        </Routes>
      </>
    </Router>
  );
};

export default App;
