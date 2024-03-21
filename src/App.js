import React from 'react';
import Navbar from './components/Navbar';
import checkAuth from './components/auth/checkAuth';
function App() {
  return(
  <div>
    <Navbar/>
    <h1 className='h'>Welcome</h1>
    
    <p >Online Medical Store.com It is a Online Pharmacy, ayurvedic store,Health Store - Its a one stop shop that offers effective Medical products, 
      healthcare solutions to all those individuals who are health enthusiasts. Providing over 20,000 health and ayurvedic herbal medicines online at 
      the lowest guaranteed price - with the highest pharmaceutical standards.

</p>
  <p>We offer premium and the largest range of original health and fitness products across various categories and leading brands. We dedicate this 
portal to all those people who are keen to purchase healthcare products online.</p>

<p>The aim is to supply cheaper products to everybody who has access to the internet and deliver those products to their door. Through harnessing the
   power of the internet and supplying you directly, this website will save up to 75% off the cost of many well known products found in your local 
   Medical Shop.</p>
   </div>
 
);
}

export default checkAuth(App);