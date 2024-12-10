import { PRODUCT_URL } from '@/lib/endpoints'
import axios from 'axios'
import React from 'react'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'


// async function getData(): Promise<Product[]> {
//   // Fetch data from your API here.
//   const products = await axios.get(PRODUCT_URL)
//   return [
//     {
//       products
      
//     }
//   ]
// }

const ProductsPage = async () => {

  const products = await axios.get(PRODUCT_URL)
  console.log({products});
  // const data = await getData()
  

  return (
      <div className="">
      <DataTable columns={columns} data={products.data.reverse()} />
      </div>
  )
}

export default ProductsPage