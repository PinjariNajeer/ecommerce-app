import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const { token } = req.headers 
    if(!token){
        return res.json({success: false, message: 'Not Authorized Login'});
    }

    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("Token Decoded Start")
        // console.log(token_decode)
        // console.log("Token Decoded End")
        req.body.userId = token_decode.id
        // console.log(req.body.userId)
        // console.log("req.body.userId")
        next()
    } catch(e) {
        console.log(e)
        res.json({success: false, message: e.message})
    }
}

export default authUser;