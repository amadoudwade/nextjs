"use server"

import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";




const userSchema = z.object({
    email: z.string().email({
        message: "email incorrect"
    }),
    password: z.string().min(6, {message: "Il faut au minimum 6 car"}),
  })

export async function login(state: any, formData: FormData){

try {
    const validatedFields = userSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
      })
     
      // Return early if the form data is invalid
      if (!validatedFields.success) {


        return {
          errors: validatedFields.error.flatten().fieldErrors,
        }
      }
    //   return {type: "success", message: "login"}
    const {email, password} = validatedFields.data
    const res = await axios.post("http://localhost:8000/api/auth/login", {email, password})
      
    // stockage des cookies
    if (res.data.token) {
      const token = res.data.token
      cookies().set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: '/',
      secure: process.env.NODE_ENV === "production"
    })
  }
      

} catch (error: any) {
    return {type: "error", message: error?.response?.data?.message}
}

redirect('/dashboard')

}



 
