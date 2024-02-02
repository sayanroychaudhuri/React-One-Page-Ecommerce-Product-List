import React, { useState } from "react";
import $ from 'jquery';
const Header = () => {
  return (
    <>
      <Navbar />
    </>
  );
};

export default Header;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [fields,setFields] = useState({email:'',password: ''})
  const [userDetails,setUserDetails]=useState({email:'',name: ''})
  const handleChange = (e)=>{
    let tempFields={...fields};
    tempFields[e.target.name] = e.target.value;
    setFields(tempFields)
  }
  const login = (e)=>{
    e.preventDefault();
    if(fields.email==='user1@test.com' && fields.password==='user@123'){
      let userDetails = {email: 'user1@test.com',name: 'User 1'}
      window.sessionStorage.setItem("userDetails", userDetails);
      toggleModal('close')
      setUserDetails(userDetails)
    }else{
      alert("Username or Password Mismatch");
    }
  }
 const toggleModal = (type)=>{
  if(type==='open'){
    $('#login-modal').show().addClass('modal-open');
  }else{
    var modal = $('#login-modal');
    modal.removeClass('modal-open');
    setTimeout(function() {
      modal.hide();
    },200);
    }
 }
  return (
    <header className={`absolute left-0 top-0 z-20 flex w-full items-center`}>
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          <div className="w-60 max-w-full px-4">
            <a href="/#" className="block w-full py-5">
              <img
                src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo.svg"
                alt="logo"
                className="w-full dark:hidden"
              />
              <img
                src="https://cdn.tailgrids.com/2.0/image/assets/images/logo/logo-white.svg"
                alt="logo"
                className="w-full hidden dark:block"
              />
            </a>
          </div>
          <div className="flex w-full items-center justify-between px-4">
            <div>
              <button
                onClick={() => setOpen(!open)}
                id="navbarToggler"
                className={` ${
                  open && "navbarTogglerActive"
                } absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}
              >
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
                <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
              </button>
            </div>
            <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
              {!!userDetails.name && !!userDetails.email ?
              <React.Fragment>
                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Welcome : <b>{userDetails.name}</b> <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                      </svg>
                      </button>
                      <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                              <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                            </li>
                          </ul>
                      </div>
                    </React.Fragment>
              :
              <button onClick={()=>toggleModal('open')} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
              Sign in
              </button> }
              <div id="login-modal" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div className="relative p-4 w-full max-w-md max-h-full m-auto">
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                  Sign in to our platform
                              </h3>
                              <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={()=>toggleModal('close')}>
                                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                  </svg>
                                  <span className="sr-only">Close modal</span>
                              </button>
                          </div>
                          <div className="p-4 md:p-5">
                              <form className="space-y-4" onSubmit={(e)=>login(e)}>
                                  <div>
                                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                      <input type="email" name="email" value={fields.email} id="email" onChange={(e)=>handleChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                  </div>
                                  <div>
                                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                      <input type="password" name="password" value={fields.epasswordmail} id="password" onChange={(e)=>handleChange(e)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                  </div>
                                  <div className="flex justify-between">
                                      <div className="flex items-start">
                                          <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Demo Credentials: <b>user1@test.com/user@123</b></label>
                                      </div>
                                  </div>
                                  <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
