import React,{ Suspense, lazy,useEffect,useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

const delayForDemo = (promise) =>{
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
    }).then(() => promise);
  }



function Home() {
    const [products,setProducts] = useState([])
  const [pagination,setPagination] = useState({skip:0,total:0,currentPage:1})
  const getProductList = ()=>{
    axios.get(`https://dummyjson.com/products?limit=8&skip=${pagination.skip}`)
    .then(function (response) {
      // handle success
      let products = response.data.products;
      setProducts(products);
      setPagination({...pagination,total: Math.ceil(response.data.total/8)})
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}
const _changePage = (page)=>{
    setPagination({...pagination,currentPage: page,skip: ((8*page)-8)})
  }

  useEffect(() => {
    setProducts([])
    getProductList()
  }, [pagination.currentPage])
  const ProductList = lazy(() => delayForDemo(import('./ProductList.js')));
  return (
    <React.Fragment>
      <Header />
      {products.length> 0 &&
      <Suspense fallback={'<div>Loading</div>'}>
          <ProductList products={products} pagination={pagination} _changePagination={_changePage} />
        </Suspense>}
     <Footer />
  </React.Fragment>
  )
}

export default Home