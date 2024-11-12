import OrderDetail from '@/components/dashboard/order-detail/Orderdetail'
import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <OrderDetail param={params} />
    </div>
  )
}

export default page

