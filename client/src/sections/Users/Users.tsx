import React from 'react'

interface Props {
    title: string
}

export const Users = ({ title } : Props) => {
    return <h2>{title}</h2>
}