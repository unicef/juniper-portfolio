import { verify } from 'jsonwebtoken'
import 'dotenv/config'

export const isAuth = (req: any, res: any, next: any) => {
    const authHeader = req.get('Authorization')
    if(!authHeader) {
        req.isAuth = false
        return next()
    }
    const token = authHeader.split(' ')[1]
    if(!token || token === '') {
        req.isAuth = false 
        return next()
    }
    
    try {
        let payload = verify(token, process.env.ACCESS_TOKEN_SECRET!)
        if(!payload) {
            req.isAuth = false 
            return next()
        }
        req.isAuth = true
        req.payload = payload
        return next()
    } catch(err) {
        req.isAuth = false 
        return next()
    }
}