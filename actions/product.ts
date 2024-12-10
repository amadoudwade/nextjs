'use server'

import { PRODUCT_URL } from '@/lib/endpoints'
import axios from 'axios'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { cookies } from 'next/headers'

const formSchema = z.object({
    name: z.string().min(1, {message: "Veuillez saisir le nom du produit"}),
    price: z.string().min(1, {message: "Veuillez saisir le prix du produit"}),
    category: z.string().min(1,{message: "Selectionnez la categorie!"})
})




export const handleCreateFormProduct = async (state : any, formData: FormData) => {
    try {
        const formField = formSchema.safeParse({
            name: formData.get('name'),
            price: formData.get('prix'),
            category: formData.get('category')
        })
        
    
        if (!formField.success) {
            return {
                errors: formField.error.flatten().fieldErrors
            }
        }

        const { name, price, category } = formField.data
    
        await axios.post(PRODUCT_URL,
            {
                name,
                price,
                category
            },
            {
                headers:{
                    Authorization: `${cookies().get('token')?.value}`
                }
            }
        )
        
        
    } catch (error: any) {
        
        
        return { type : "error", message: error?.response.data.msg }
        
    }
    revalidatePath('/dashboard/products')

    return { type: 'success', message:"Product added!" }
}


export const handleUpdateFormProduct = async (state: any, formData: FormData) => {
    const productId = formData.get('productId')
    
    try {
        const formField = formSchema.safeParse({
            name: formData.get('name'),
            price: formData.get('prix'),
            category: formData.get('category')
        })
        
        
        if (!formField.success) {
            return {
                errors: formField.error.flatten().fieldErrors
            }
        }

        const { name, price, category } = formField.data
    
        await axios.put(`${PRODUCT_URL}/${productId}`,
            {
                name,
                price,
                category
            },
            {
                headers:{
                    Authorization: `${cookies().get('token')?.value}`
                }
            }
        )
        
        
    } catch (error: any) {
        
        return { type: 'error', message: error?.response?.data?.error?.errorResponse.errmsg }
        
    }
    revalidatePath('/dashboard/products')
    return { type: 'success', message: "Update success!" }
    
}

export const handleDeleteFormProduct = async (id: string) => {
    try {
        
        await axios.delete(`${PRODUCT_URL}/${id}`,
            {
                headers:{
                    Authorization: `${cookies().get('token')?.value}`
                }
            })
        
    } catch (error:any) {
        return { type: 'error', message: error?.response?.data?.message }
        
    }
    revalidatePath('/dashboard/products')    
}