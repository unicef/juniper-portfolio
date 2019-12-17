import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'

interface Props {
    title: string
}

export const Transactions = ({ title } : Props) => {
    return <h2>{title}</h2>
}