
import { CATEGORY_URL, PRODUCT_URL } from '@/lib/endpoints'
import axios from 'axios'
import React from 'react'
import { UpdateProductForm } from '../_components/edit-form'
import { cookies } from 'next/headers'

const UpdatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  

    const id = (await params).id

    const product = await axios.get(`${PRODUCT_URL}/${id}`,
      {
          headers:{
              Authorization: `${cookies().get('token')?.value}`
          }
      })
    const categories = await axios.get(CATEGORY_URL,
      {
          headers:{
              Authorization: `${cookies().get('token')?.value}`
          }
      }) 
    

  return (
    <div>
        <UpdateProductForm product={product.data} category={categories.data} />
    </div>
  )
  
}

export default UpdatePage
