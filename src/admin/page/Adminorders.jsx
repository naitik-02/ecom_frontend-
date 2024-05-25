import React, { useEffect, useState } from 'react'
import { server } from '../../main'
import { Container,Table,Button } from 'react-bootstrap'
import axios from 'axios'
import toast from 'react-hot-toast'



const Adminorders = () => {

    const [adminOrders,setAdminOrders] = useState([])
    const [totalSubtotal,setTotalSubTotal] = useState()
    const [loading,setLoading] = useState(false)

    async function FetchAdminOrder(){
        setLoading(true)
        try {
            const {data}= await axios.get(`${server}/api/order/admin/all`,{
                headers:{
                    token: localStorage.getItem("token")
                }
            })

            setAdminOrders(data.orders)
            setTotalSubTotal(data.subTotal)
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            setLoading(false)
            
        }
    }


    const HandleUpdateClick=async(id)=>{
       try {

        const {data} = await axios.put(`${server}/api/order/update/${id}`,{},{
            headers: {
                token: localStorage.getItem("token")
            }
        })

        toast.success(data.message)
        FetchAdminOrder();

        
       } catch (error) {
        console.log(error)
        
       }
    }
    

    useEffect(()=>{
            FetchAdminOrder();
    },[])


  return (
    <Container>
    <h1>Total Revenue - ₹{totalSubtotal}</h1>

    {adminOrders && adminOrders.length > 0 ? (
      <Table stripped bordered responsive hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Address</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          </thead>

          {adminOrders.map((e,i)=>(
             <tbody>
                <td>{i+1}</td>
                <td>{e.address}</td>
                <td>{e.subTotal}</td>
                <td>{e.status}</td>
                <td>
                    {
                        e.status === "Delivered"?(<p className='text-success'>Order Delevered</p>):<Button disabled={loading} onClick={()=>HandleUpdateClick(e._id)}>Update Status</Button>
                    }
                </td>
             </tbody>
          ))}
       
      </Table>
    ) : (
      <p>No orders yet</p>
    )}
  </Container>
  )
}

export default Adminorders