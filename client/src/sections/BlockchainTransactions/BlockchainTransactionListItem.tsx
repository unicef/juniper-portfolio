import React, { useState } from 'react'
import { useMutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { EditAdditionalNotesOfBlockchainTransaction as EditAdditionalNotesOfBlockchainTransactionData, EditAdditionalNotesOfBlockchainTransactionVariables } from './__generated__/EditAdditionalNotesOfBlockchainTransaction'

const EDIT_ADDITIONAL_NOTES_OF_BLOCKCHAIN_TRANSACTION = gql`
    mutation EditAdditionalNotesOfBlockchainTransaction($id: ID!, $additionalNotes: String!) {
        editAdditionalNotesOfBlockchainTransaction(id: $id, additionalNotes: $additionalNotes) {
            id
            transactionHash
            additionalNotes
        }
    }
`

export const BlockchainTransactionListItem = (props: {id: string, refetch: any}) => {
    const [additionalNotes, setAdditionalNotes] = useState('')
    const [editAdditionalNotesOfBlockchainTransaction] = useMutation<
        EditAdditionalNotesOfBlockchainTransactionData,
        EditAdditionalNotesOfBlockchainTransactionVariables
    >(EDIT_ADDITIONAL_NOTES_OF_BLOCKCHAIN_TRANSACTION)
    const handleEditAdditionalNotesOfBlockchainTransaction = async(id: string, additionalNotes: string) => {
        editAdditionalNotesOfBlockchainTransaction({variables: {id, additionalNotes}})
        props.refetch()
    }
    return (
        <span>
            <label htmlFor="Edit Additional Notes">Edit Additional Notes</label>
            <input type='string' value={additionalNotes} onChange={e => setAdditionalNotes(e.target.value)}/>
            <button onClick={() => {handleEditAdditionalNotesOfBlockchainTransaction(props.id, additionalNotes)}}>Edit additional notes</button>
        </span>
    )
}