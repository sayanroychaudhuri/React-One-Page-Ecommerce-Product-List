import React, { useEffect,useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products,setProducts] = useState([])
  const [pagination,setPagination] = useState({skip:0,total:0,currentPage:1})
  const getProductList = ()=>{
    axios.get(`https://dummyjson.com/products?limit=8&skip=${pagination.skip}`)
    .then(function (response) {
      // handle success
      console.log(response)
      let products = response.data.products;
      setProducts(products);
      setPagination({...pagination,total: Math.ceil(response.data.total/8),skip: (pagination.skip+8)})
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}
  useEffect(() => {
    getProductList();
  }, [])

  const returnPagination =()=>{
    let eachSide = 1;
    let pgArr = [];
    if(pagination.total<= ((2*eachSide)+5)){
      for(let n=1;n<=pagination.total;n++){
        pgArr.push(n);
      }
    }else{
      switch (true) {
        case pagination.currentPage<=(eachSide+3):
          for(let n=1;n<=((2*eachSide)+3);n++){
            pgArr.push(n);
          }
          pgArr.push('...',pagination.total)
          break;
        case pagination.currentPage>=(pagination.total-(eachSide+2)):
          pgArr.push(1,'...')
          for(let n=(pagination.total-(2*eachSide)-2);n<=pagination.total;n++){
            pgArr.push(n);
          }
          break;
        default:
          pgArr.push(1,'...')
          for(let n=(pagination.total-eachSide);n<=(pagination.total+eachSide);n++){
            pgArr.push(n);
          }
          pgArr.push('...',pagination.total)
          break;
      }
    }
    return <nav aria-label="Page navigation example">
    <ul class="inline-flex -space-x-px text-sm">
      {pagination.currentPage!== 1 &&
      <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
      </li> }
      {pgArr.length > 0 && pgArr.map((data,key)=>{
        return pagination.currentPage===data ? 
        <li>
        <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
      </li> : 
  <li>
  <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
</li>
      })}
      
      
      {pagination.currentPage!== pagination.total &&
      <li>
        <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
      </li>}
    </ul>
  </nav>
  }
  
  return (
    <React.Fragment>
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">List Of Products</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.thumbnail}
                  alt={product.brand}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    {pagination.total > 0 &&
    returnPagination()
     }
  </React.Fragment>
  )
}

export default ProductList