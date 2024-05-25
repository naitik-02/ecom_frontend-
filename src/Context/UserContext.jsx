import axios from "axios";
import { useContext ,createContext, useState, useEffect } from "react";
import { server } from "../main";


import toast, {Toaster} from 'react-hot-toast'


const userContext = createContext()




 export const  UserContextProvider =({children})=>{
   

    const[user, setUser]=useState([]);
    const[isAuth, setIsAuth]=useState(false);
    const[loading, setLoading]=useState(true);

    async function fetchUser() {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuth(false);
            setLoading(false);
            return;
        }
    
        try {
            const { data } = await axios.get(`${server}/api/user/me`, {
                headers: {
                    token: token,
                },
            });
    
            setUser(data.user);
            setIsAuth(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setIsAuth(false);
            setLoading(false);
        }
    }
    
    

    async function userLogin(email  , password ){
        try {
            const {data}= await axios.post(`${server}/api/user/login`,{
                email, password
            });

            if(data.message){
                toast.success(data.message)
                localStorage.setItem("token" , data.token)
                setLoading(false)
                setIsAuth(true)
                setUser(data.user)    
                navigate("/")         
            }     
        } catch (error) {
            toast.error(error.response.data.message)
            setIsAuth(false)
            setLoading(false)
        }
    }
    async function RegisterUser(username,email  , password ,navigate){
        try {
            const {data}= await axios.post(`${server}/api/user/register`,{
              username,  email, password
            });

            if(data.message){
                setLoading(false)                     
                toast.success(data.message)
                localStorage.setItem("activationToken" ,data.activationToken)
                navigate("/verify")
              
            }     
        } catch (error) {
            toast.error(error)
            
        }
    }
    async function VerifyUser(otp ,navigate){

        const activationToken = localStorage.getItem("activationToken")
        try {
            const {data}= await axios.post(`${server}/api/user/verify`,{
              otp ,activationToken
            });

            if(data.message){
                toast.success(data.message)
                
               
                setLoading(false)  
                navigate("/login")                   
            }     
        } catch (error) {
            toast.error(error.response.data.message)
            loading(false)
        }
    }





    useEffect(()=>{
        fetchUser();
    },[])




    return <userContext.Provider value={{userLogin , user , loading,isAuth ,RegisterUser,VerifyUser ,setIsAuth ,setUser}}>{children}<Toaster /></userContext.Provider>
 }


 export const UserData = ()=> useContext(userContext)