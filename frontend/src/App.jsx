import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

import Home from './pages/home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrivateRoute from './components/Routes/PrivateRoute';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';

import Profile from './pages/user/Profile';
import UpdateCountry from './pages/Admin/UpdateCountry';
import Forget from './pages/Auth/Forget';
import SearchResult from './pages/SearchResults';
import CreateCountry from './pages/Admin/CreateCountry';
import Job from './pages/job';
import Study from './pages/Study';
import Visitvisa from './pages/Visitvisa';
import CountryDetails from './pages/CountryDetails';
import Immigration from './pages/Immigration';
import Services from './pages/Services';
import Countries from './pages/Admin/Countries';
import Users from './pages/Admin/Users';
import Refferals from './pages/Admin/Refferals';
import Refferal from './pages/user/Refferal';
import LatestJobs from './pages/LatestJobs';
import LatestUpdate from './pages/Admin/LatestUpdate';
import Premium from './pages/Premium';
function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>

        <Route path='/' element={<Home />} />
        <Route path='/country/:id' element={<CountryDetails />} />
        <Route path='/search' element={<SearchResult />} />


        <Route path='/register' element={<Register />} />
        <Route path='/register/:id' element={<Register />} />

        <Route path='/login' element={<Login />} />
        <Route path='/forget' element={<Forget />} />
          
          {/* Private Route Wrapper */}
          <Route path='/dashboard' element={<AdminRoute />} >
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory/>} />

          <Route path='admin/create-country' element={<CreateCountry/>} />
          <Route path='admin/updateCountry/:id' element={<UpdateCountry/>}/>
          <Route path='admin/users' element={<Users/>} />
          <Route path='admin/ref/:id' element={<Refferals/>} />

          <Route path='admin/works' element={<LatestUpdate/>} />

          <Route path='admin/countries' element={<Countries/>} />



          </Route>
   {/* Private Route Wrapper */}
   <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/refferal' element={<Refferal />} />




          </Route>

          <Route path='/job' element={<Job />} />
        <Route path='/study' element={<Study />} />
        <Route path='/premium' element={<Premium />} />


        <Route path='/visiting-visa' element={<Visitvisa />} />

        <Route path='/country-details/:id' element={<CountryDetails />} />
        <Route path='/services' element={<Services />} />


        <Route path='/immigration' element={<Immigration />} />
        <Route path='/latestjobs/:id' element={<LatestJobs />} />


          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/policy' element={<Policy />} />
          <Route path='*' element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
