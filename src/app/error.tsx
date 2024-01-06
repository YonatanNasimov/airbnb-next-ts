'use client'

import EmptyState from '@/components/emptyState'
import React, { useEffect } from 'react'

interface ErrorStateProps {
    error: Error
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {

    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <EmptyState
            title='Uh Oh'
            subTitle='Sometimes went wrong, try again!'
        />
    )
}

export default ErrorState
