import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";

const MyRouter = () => {
  return (
    <Fragment>
      <AppNavbar />
      <Header />
      <h3>졸려....</h3>
      <Footer />
    </Fragment>
  );
};

export default MyRouter;
