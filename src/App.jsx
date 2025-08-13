import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Gallery from "./component/Gallery";
import AboutUs from "./component/Aboutus";
import Blog from "./component/Blog";
import Package from "./component/Package";
import Booking from "./component/Booking";

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/package" element={<Package />} />
              <Route path="/booking" element={<Booking />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
