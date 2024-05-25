import React from 'react'
import { Container } from 'react-bootstrap'
import BarChart from '../../Components/BarChart'

const AllData = ({products}) => {

const title = products.map((product)=>product.title)
const sold = products.map((product)=>product.sold)

  return (
    <Container>
        <h3>Products sold</h3>

        <BarChart width={"350px"}  sold={sold} title={title}/>
    </Container>
  )
}

export default AllData