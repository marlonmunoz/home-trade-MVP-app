// This component will handle navigation between pages
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login"
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Onboarding from "../pages/Onboarding"
import PropertyDetails from "../pages/PropertyDetails";
import AddProperty from "../pages/AddProperty";
import MyListing from "../pages/MyListing";
import AllProperties from "../pages/AllProperties";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors flex flex-col">
                <Navbar />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/onboarding" element={<Onboarding />} />
                        <Route path="/property/:id" element={<PropertyDetails />} />
                        <Route path="/add-property" element={<AddProperty />}/>
                        <Route path="/my-listings" element={<MyListing />}/>
                        <Route path="/properties" element={<AllProperties />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default AppRoutes;


// CONCEPTS REINFORCED: routing hierarchy, reusable layout, component composition 