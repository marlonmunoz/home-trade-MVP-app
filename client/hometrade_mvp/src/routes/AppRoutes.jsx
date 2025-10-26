// This component will handle navigation between pages
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login"
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Onboarding from "../pages/Onboarding"
import PropertyDetails from "../pages/PropertyDetails";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="onboarding" element={<Onboarding />} />
                    <Route path="property/:id" element={<PropertyDetails />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
};

export default AppRoutes;