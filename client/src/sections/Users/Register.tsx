import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo'
import {Register as RegisterData, RegisterVariables} from './__generated__/Register'

const REGISTER = gql`
    mutation Register($name: String!, $email: String!, $organization: String!, $role: String!, $password: String!) {
        register(name: $name, email: $email, organization: $organization, role: $role, password: $password) {
            id
            name
            organization
            role
            email
        }
    }
`;

export const Register = (props: {title: string, refetch: any}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [organization, setOrganization] = useState('')
    const [role, setRole] = useState('admin')
    const [password, setPassword] = useState('') // need something to validate password 
    const [password2, setPassword2] = useState('') // use this to validate password
    const [register] = useMutation<RegisterData, RegisterVariables>(REGISTER)
    const handleRegister = async() => {
        console.log('i am here')
        register({variables: {name, email, organization, role, password}})
        props.refetch()
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <form onSubmit={handleRegister}>
                <label htmlFor="Role">Role</label>   
                <select name="role" onChange={e => setRole(e.target.value)}>
                    <option value="admin">Admin</option>
                    <option value="donor">Donor</option>
                    <option value="startUp">Start Up</option>
                </select>
                <label htmlFor="Name">Name</label>   
                <input onChange={e => setName(e.target.value)} value={name} type="text" name="name" id="name" /> 
                <label htmlFor="Email">Email</label>   
                <input onChange={e => setEmail(e.target.value)} value={email} type="text" name="email" id="email" />
                <label htmlFor="Organization">Organization</label>
                <input onChange={e => setOrganization(e.target.value)} value={organization} type="text" name="organization" id="organization" />
                <label htmlFor="Password">Password</label>
                <input onChange={e => setPassword(e.target.value)} value={password} type="text" name="password" id="password" />
                <label htmlFor="Confirm Password">Confirm Password</label>
                <input onChange={e => setPassword2(e.target.value)} value={password2} type="text" name="password2" id="password2" />
                <input type="submit" value="Register" />    
            </form>              
        </div>
    )
}