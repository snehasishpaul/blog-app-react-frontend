import { useEffect, useState } from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className={classes.footer}>
        <p>MyBlogs {currentYear} | ©Snehasish</p>
      </footer>
    </>
  );
};

export default Footer;
