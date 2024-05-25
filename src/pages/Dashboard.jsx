import React from 'react'
import { Container, Tabs ,Tab } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Home from '../admin/page/Home'
import { ProductData } from '../Context/ProductContext'

import Adminorders from '../admin/page/Adminorders'
import AllData from '../admin/page/AllData'

const Dashboard = ({user}) => {
    const navigate= useNavigate()
    const {adminProduct} = ProductData()

    
  return (
<Container>
    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example" className='mb-3'>
        <Tab eventKey={"home"} title={"Dashboard"}><Home products={adminProduct}/>

        </Tab>
        <Tab eventKey={"data"} title={"All Data"}><AllData products = {adminProduct}/>

        </Tab>
        <Tab eventKey={"Order Page"} title={"Orders"}><Adminorders />
                  
        </Tab>
        
    </Tabs>
</Container>
   
  )
}

export default Dashboard