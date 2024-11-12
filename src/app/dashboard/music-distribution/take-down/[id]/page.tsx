import React from 'react'
import TakeDown from '@/components/dashboard/musicDistributon/takeDown/TakeDown'

export default function page({ params }: { params: { id: string } }) {
    return (
        <>
            <TakeDown param={params} />
        </>
    )
}
