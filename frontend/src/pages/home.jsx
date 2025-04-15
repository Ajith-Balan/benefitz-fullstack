import React from 'react'
import Home from './home/Home'
import Cards from './Cards'
import Service from './home/Service'
import JobConsultancy from './home/JobConsultancy'
import VisitingVisa from './home/VisitingVisa'
import Consaltant from './home/Consaltant'
import Floating from './home/Floating'
import ContactUs from './home/Contactus'
import Layout from '../components/layout/Layout';
import LatestNews from './LatestNews'

const home = () => {

  return (
    

    <Layout >
 <div className='overflow-x-hidden'>

       
<Floating/>
  <Home/>
            <LatestNews/>
  
  <Cards/>
  
  <Service/>
  <JobConsultancy/>
  <VisitingVisa/>
  <Consaltant/>
  <ContactUs/>
 


</div>

    </Layout>
  );
};

export default home;
