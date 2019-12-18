import React from 'react'

interface Props {
    title: string
}

export const Transactions = ({ title } : Props) => {
    return <h2>{title}</h2>
}