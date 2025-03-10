import React from 'react'
import { Link } from 'react-router-dom'
const AdminHomePage = () => {


const orders = [
    {
        _id: 123123,
        user: {
            name: "John Doe"
        },
        totalPrice: 110,
        status: "Processing"
    }
]

  return (
    <div className='max-w-7xl mx-auto p-6'>
        <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            <div className='p-4 shadow-md rounded-lg'>
                <h2 className='text-xl font-semibold'>Revenue</h2>
                <p className='text-2xl'>$10000</p>
            </div>
            <div className='p-4 shadow-md rounded-lg'>
                <h2 className='text-xl font-semibold'>Total Orders</h2>
                <p className='text-2xl'>200</p>
                <Link to="/admin/orders" className="text-blue-500 hover:underline">
                    Manage Orders
                </Link>
            </div>
            <div className='p-4 shadow-md rounded-lg'>
                <h2 className='text-xl font-semibold'>Total Products</h2>
                <p className='text-2xl'>100</p>
                <Link to="/admin/products" className="text-blue-500 hover:underline">
                    Manage Products
                </Link>
            </div>
        </div>
        <div className='mt-6'>
            <h2 className='text-2xl font-bold mb-4'>Recent Orders</h2>
            <div className='overflow-x-auto'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                         <tr>
                            
                         </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
  
  )
}

export default AdminHomePage