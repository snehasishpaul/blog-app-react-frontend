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
      <main className="flex flex-col items-center justify-center">
        <Outlet />
      </main>
    </>
  );
};

export default BaseLayout;
