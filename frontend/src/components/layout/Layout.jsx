import React from 'react';
import Header from './Header';
import Footer from './Footer';
import  {Helmet,HelmetProvider}  from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({
  children,
  title = "Benefitz International ",
  description = "Explore our expert immigration and educational consulting services, unlock career pathways abroad, and experience trusted guidance every step of the way with Benifitz—where your future takes flight!",
  keywords = "benifitzintl.in, benifitz international, benifitz, consultancy, job,",
  author = "ajith-balan"
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      </HelmetProvider>

      <Header/>
      <main className="flex-grow">
        <ToastContainer/>
        {children}
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
