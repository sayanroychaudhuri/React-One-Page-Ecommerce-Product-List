import React,{ Suspense, lazy } from 'react'
import Header from './Header';
import Footer from './Footer';

const ProductList = lazy(() => import('./ProductList.js'));

function Home() {
  return (
    <React.Fragment>
      <Header />
      <Suspense fallback={'<p><i>Loading...</i></p>'}>
          <ProductList />
        </Suspense>
     <Footer />
  </React.Fragment>
  )
}

export default Home