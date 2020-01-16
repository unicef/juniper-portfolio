import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo'
import {Login as LoginData, LoginVariables} from './__generated__/Login'

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            accessToken
        }
    }
`;

export const Login = (props: {title: string, refetch: any}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [login] = useMutation<LoginData, LoginVariables>(LOGIN)
    const handleLogin = async() => {
        login({ variables: {email, password} })
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <form onSubmit={handleLogin}>
                <label htmlFor="Email">Email</label>   
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" name="email" id="email" />
                <label htmlFor="Password">Password</label>
                <input onChange={e => setPassword(e.target.value)} value={password} type="text" name="password" id="password" />
                <input type="submit" value="Login" />    
            </form>   
        </div>
    )
}