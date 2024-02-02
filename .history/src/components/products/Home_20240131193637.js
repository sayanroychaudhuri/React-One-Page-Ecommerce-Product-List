import React,{ Suspense, lazy } from 'react'
import Header from './Header';
import Footer from './Footer';

const ProductList = lazy(() => import('./ProductList.js'));

function Home() {
  return (
    <React.Fragment>
      <Header />
      
     <Footer />
  </React.Fragment>
  )
}

export default Home