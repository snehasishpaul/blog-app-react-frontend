import React from "react";
import CustomNavbar from "./CustomNavbar";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const BaseLayout = () => {
    return (
        <>
            <nav>
                <CustomNavbar />
            </nav>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default BaseLayout;
