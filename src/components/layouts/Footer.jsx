import classes from "./Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="absolute bottom-0 left-0 flex justify-center items-center w-full h-12 text-white bg-indigo-950">
        <p className="m-0 p-0">MyBlogs {currentYear} | ©Snehasish</p>
      </footer>
    </>
  );
};

export default Footer;
