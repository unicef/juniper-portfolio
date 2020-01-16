import React , { useState }  from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from 'react-apollo'
import { RevokeRefreshTokensForUser as RevokeRefreshTokensForUserData, RevokeRefreshTokensForUserVariables } from './__generated__/RevokeRefreshTokensForUser'

const REVOKE_REFRESH_TOKENS_FOR_USER = gql`
    mutation RevokeRefreshTokensForUser($id: ID!) {
        revokeRefreshTokensForUser(id: $id) {
            tokenVersion
        }
    }
`;

export const RevokeRefreshTokensForUser = (props: {id: string, refetch: any}) => {
    const [revokeRefreshTokensForUser] = useMutation<RevokeRefreshTokensForUserData, RevokeRefreshTokensForUserVariables>(REVOKE_REFRESH_TOKENS_FOR_USER)
    const handleRevokeRefreshTokensForUser = async(id: string) => {
        revokeRefreshTokensForUser({variables:{id}})
        props.refetch()
    }
    return (
        <button onClick={() => {handleRevokeRefreshTokensForUser(props.id)}}>Revoke Refresh Tokens</button>
    )
}