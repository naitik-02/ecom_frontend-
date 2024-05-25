import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { server } from "../main";

 const ProductContext = createContext() ;


 export const ProductContextProvider =({children})=>{
const [adminProduct , setAdminProduct] = useState([])
    const[products , setProducts] = useState([])
    const[topProducts , setTopProducts] = useState([])
        const [loading, setLoading] = useState(true)
        const [totalPages, setTotalPages] = useState(0)
        const[categories , setCategories] = useState()
   const [search  , setSearch] = useState("")
   const[category , setCategory] = useState("")
   const [price , SetPrice] = useState(0)
   const[page, setPage]= useState(1)

async function FetchProducts(){

         try {
            const { data } = await axios.get(
               `${server}/api/product/all?search=${search}&category=${category}&price=${price}&page=${page}`
             );

            setProducts(data.products)
            setTopProducts(data.mostSelling)
            setTotalPages(data.totalPages)
            setCategories(data.categories)
            
            setLoading(false)
         } catch (error) {
            console.log(error)
            setLoading(false)
         }
}

async function FetchAdminProduct(){
   try {
      
const {data} = await axios.get(`${server}/api/product/admin/all`);

setAdminProduct(data.product)

   } catch (error) {
      console.log(error)
      setLoading(false)
      
   }
}

useEffect(()=>{
    FetchProducts()
    FetchAdminProduct()
},[search , category, price , page])


    return <ProductContext.Provider value={{products ,setTotalPages,totalPages, topProducts , loading , totalPages , categories ,setCategories , price , SetPrice,page, setPage ,category, setCategory,search,setSearch ,adminProduct ,FetchAdminProduct ,FetchProducts}}>{children}</ProductContext.Provider>
 }

 export const ProductData =()=> useContext(ProductContext)
