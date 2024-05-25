import React, { useState } from 'react'

import ProductCard from '../../Components/ProductCard'
import { ProductData } from '../../Context/ProductContext'
import { Container, Button, Modal, Form, Card, Row } from "react-bootstrap";
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../../main';

const Home = ({products}) => {
  const {FetchAdminProduct,} = ProductData()
  const[show, setShow] = useState(false)
  const handleClose = ()=>setShow(false)
  const handleShow =()=>setShow(true)
 
  return (
   <Container>
    <h1>All Products</h1>
    <AddProduct   setShow={setShow} show={show} handleClose={handleClose}  FetchAdminProduct={FetchAdminProduct} />
    <Button onClick={handleShow} className='mb-3'>Add Product+</Button>
    <Row>
        { products && products.length >0?  products.map((i)=>(
            <ProductCard key={i._id} admin={true} product={i} />
        ))  :<p>No Item yet</p>}
    </Row>
   </Container>
  )
}

export default Home



const AddProduct = ({ show, handleClose,FetchAdminProduct  }) => {
  const [title,setTitle ] = useState("");
  const [description,setDescription ] = useState('');
  const [stock,setStock ] = useState('');
  const [category,setCategory ] = useState('');
  const [price,setPrice ] = useState('');
  const [image,setiImage ] = useState('');

  const categories =[
    "shoes","cloths","electronic","women","gym","study","phone"
  ]

  const changeImageHandler=e=>{
    setiImage(e.target.files[0])
  }
  

  async function handleSubmit(e) {
    e.preventDefault();

   const myForm = new FormData()

   myForm.append("title",title)
   myForm.append("description" ,description)
   myForm.append("price",price)
   myForm.append("image",image)
   myForm.append("stock",stock)
   myForm.append("category",category)
    try {
      const {data} = await axios.post(`${server}/api/product/new`,myForm,{
        headers:{
          token : localStorage.getItem("token")
        }
      })
      
      if(data.message){
        toast.success(data.message);
        FetchAdminProduct();
        FetchProducts()
        
        setShow(false)
        setTitle("")
        setDescription("")
        setPrice("")
        setStock("")
        setiImage("")
        setCategory("")
      }
     
      handleClose();
    } catch (error) {
     console.log(error)
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" value={stock} onChange={(e) => setStock(e.target.value)} required />
          </Form.Group>
          
<Form.Select className='mb-2' value={category} onChange={(e)=> setCategory(e.target.value)}>
  <option>Select Category</option>
  {
    categories.map((e)=>(
      <option value={e} key={e}>{e}</option>
    ))
  }
</Form.Select>

      
      <input type="file" onChange={changeImageHandler} />


          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="text" placeholder="Enter Address" value={price} onChange={(e) => setPrice(e.target.value)} required />
          </Form.Group>
         
          <Button type="submit">Add Product</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};