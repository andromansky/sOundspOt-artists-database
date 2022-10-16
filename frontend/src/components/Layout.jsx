import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import './Layout.css';
import Footer from './Footer/Footer';

function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
