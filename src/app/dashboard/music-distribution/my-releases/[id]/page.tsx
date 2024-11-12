import React from 'react'
import ReviewTheRelease from '@/components/dashboard/musicDistributon/ReviewMyRelease'

export default function page({ params }: { params: { id: string } }) {
    return (
        <>
            <ReviewTheRelease param={params} />
        </>
    )
}
