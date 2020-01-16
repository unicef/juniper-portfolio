import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo'
import { Users as UsersData } from './__generated__/Users'
import { Register } from './Register'
import { Login } from './Login'
import { CreateUser } from './CreateUser'
import { RevokeRefreshTokensForUser } from './RevokeRefreshTokensForUser'


const USERS = gql`
    query Users {
        users {
            id
            name
            organization
            role
            email
            tokenVersion
        }
    }
`;

interface Props {
    title: string
}

export const Users = ({ title } : Props) => {
    const { data
        // , loading
        // , error
        , refetch
    } = useQuery<UsersData>(USERS)
    const users = data ? data.users : null 
    const usersList = users ? (
        <ul>
            {users.map(user => {
                return (
                    <li key={user.id}>
                        {user.id} | {user.name} | {user.role} | {user.email} | {user.organization} | {user.tokenVersion}
                        <RevokeRefreshTokensForUser refetch={refetch} id={user.id}/>
                    </li>
                )
            })}            
        </ul>
    ) : null
    return (
        <div>
            <h2>{title}</h2>
            {usersList}
            <Register refetch={refetch}  title='Register' />
            <Login refetch={refetch}  title='Login'/>
            <CreateUser refetch={refetch}  title='Create User'/>
        </div>
    )
}