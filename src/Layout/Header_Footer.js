import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const Header_Footer = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
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

Header_Footer.defaultProps = {
  title: "Supermart",
  description: "mern stack ecommerce website",
  keywords: "mern,mongodb,express,react,node",
  author: "Shubham Sanjay Revankar",
};

export default Header_Footer;
