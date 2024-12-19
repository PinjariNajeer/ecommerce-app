import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParmas, setSearchParmas] = useSearchParams()
    const success = searchParmas.get("success")
    const orderId = searchParmas.get('orderId')

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null
            }
            const response =await axios.post(backendUrl + '/api/order/verifyStripe', {success: orderId}, {headers: {token}})

            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            } else {
                navigate('/cart')
            }
        } catch (e) {
            console.log(e)
            toast.error(e.message)
        }
    }
    useEffect(() => {
        verifyPayment()
    }, [token])
    
    return (
        <div>


        </div>
    )
}

export default Verify