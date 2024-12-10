import React from 'react'
import { CreateProductForm } from '../_components/form'
import axios from 'axios'
import { CATEGORY_URL } from '@/lib/endpoints'
import { cookies } from 'next/headers'

const CreatePage = async () => {
  
  const categories = await axios.get(CATEGORY_URL,
    {
        headers:{
            Authorization: `${cookies().get('token')?.value}`
        }
    }) 
  if (!categories.data) {
      return { message: 'Error'}
  }
  return (
    <div>
      <CreateProductForm category={categories.data} />

    </div>
  )
}

export default CreatePage