import { Response } from 'express'

export const sendRefreshToken = async (res: Response, token: string) => {

    return res.cookie('jid', token, { httpOnly: true })    
}