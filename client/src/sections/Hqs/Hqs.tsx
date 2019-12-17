import React, { FunctionComponent } from 'react'
import PropTypes from 'prop-types'

interface Props {
    title: string
}

export const Hqs = ({ title } : Props) => {
    return <h2>{title}</h2>
}