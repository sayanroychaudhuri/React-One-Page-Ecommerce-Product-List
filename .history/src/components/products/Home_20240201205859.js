import React,{ Suspense, lazy,useEffect,useState } from 'react'
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';


function Home() {
    const [products,setProducts] = useState([])
  const [pagination,setPagination] = useState({skip:0,total:0,currentPage:1,cat:''})
  const getProductList = ()=>{
    let url = !!pagination.cat ? `https://dummyjson.com/products/category/${pagination.cat}` : `https://dummyjson.com/products?limit=8&skip=${pagination.skip}`
    axios.get(url)
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
const _changePage = (page,cat)=>{
  console.log(cat)
    setPagination({...pagination,currentPage: page,skip: !!cat ? 0 : ((8*page)-8),cat: cat})
  }

  useEffect(() => {
    setProducts([])
    getProductList()
  }, [pagination.currentPage,pagination.currentPage])
  const ProductList = lazy(() => import('./ProductList.js'));
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