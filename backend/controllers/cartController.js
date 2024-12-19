import userModel from "../models/userModel.js";




// add products to user cart 
const addToCart = async (req, res) => {
    try{
        
        const { userId, itemId, size} = req.body;
        const userData = await userModel.findById(userId)
        
        
        let cartData = await userData.cartData;
        if(cartData[itemId]) {
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            } else{
                cartData[itemId][size] = 1  
            }
        } else {
            cartData[itemId] = {} 
            cartData[itemId][size] = 1 
        }

        await userModel.findByIdAndUpdate(userId, {cartData})

        res.json({success: true, message: "Added To Cart"})

    } catch(e){
        console.log(e)
        res.json({success: false, message: e.message })
    }
}

//update user cart
const updateCart = async (req, res) => {
    try{
        const { userId, itemId, size, quantity } = req.body;
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        cartData[itemId][size] = quantity;
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({ success: true, message: "Cart Updated"})
    } catch(e){
        console.log(e)
        res.json({ success: false, message: e.message})
    }
}

// Get user cart data
const getUserCart = async (req, res) => {
    try{
        const { userId } = req.body;
        const userData = await userModel.findById(userId);
        console.log("Najeer")
        console.log(userData)
        console.log("Basha")
        let cartData = await userData.cartData;
        console.log(cartData) 
        res.json({ success: true, cartData })

    } catch(e) {
        console.log(e)
        res.json({ success: false, message: e.message})
    }
}

export { addToCart, updateCart, getUserCart }