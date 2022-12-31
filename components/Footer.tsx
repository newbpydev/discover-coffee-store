import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();

  return <footer>&copy; {year} Nice Footer, Juan</footer>;
};

export default Footer;
