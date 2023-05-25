import React, { Children } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Header_Footer = ({ children }) => {
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "79.5vh",
          padding: "10px",
          backgroundColor: "#f1f3f6",
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Header_Footer;
