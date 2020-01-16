import React
, { useState } 
from 'react'
import { gql } from 'apollo-boost'
import {
    useMutation
} from 'react-apollo'
import { CreateUser as CreateUserData, CreateUserVariables } from './__generated__/CreateUser'


const CREATE_USER = gql`
    mutation CreateUser($name: String!, $email: String!, $organization: String!, $role: String!) {
        createUser(name: $name, email: $email, organization: $organization, role: $role) {
            id
            name
            organization
            role
            email
        }
    }
`;

interface Props {
    title: string
}

export const CreateUser = (props: {title: string, refetch: any}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [organization, setOrganization] = useState('')
    const [role, setRole] = useState('admin')
    const [createUser] = useMutation<CreateUserData, CreateUserVariables>(CREATE_USER)
    const handleCreateUser = async() => {
        console.log('i am here')
        createUser({variables: {name, email, organization, role}})
        props.refetch()
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <form onSubmit={handleCreateUser}>
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
                <input type="submit" value="Create new user" />    
            </form>  
        </div>
    )
}