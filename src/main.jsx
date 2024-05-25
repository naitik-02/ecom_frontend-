import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ProductContextProvider } from './Context/ProductContext.jsx'
import { UserContextProvider } from './Context/UserContext.jsx'
import { CartContextProvider } from './Context/CartContext.jsx'

export const server = 'https://trends-house.onrender.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <CartContextProvider>
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
    </CartContextProvider>
    </UserContextProvider>   
  </React.StrictMode>,
)
