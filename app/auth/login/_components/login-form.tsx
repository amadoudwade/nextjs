"use client"

import React from 'react'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail } from "lucide-react";
import { motion } from "framer-motion";
// @ts-ignore
import { useFormState } from "react-dom"
import { login } from '@/actions/user';
import { span } from 'framer-motion/client';

const LoginForm = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    // const [showPassword, setShowPassword] = useState(false)
    const [state, formAction] = useFormState(login, undefined)

    console.log(state?.errors);
    
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
    <motion.div 
    initial={{ opacity:0, y: -20}}
    animate={{ opacity:1, y: 0}}
    transition={{ duration:0.5}}
    className="w-full max-w-md"
    >
      <div className="bg-w rounded-2xl shadow-xl p-8 space-y-6">
       <div className="text-center space-y-2">
        <h1 className="text-3xl">Login</h1>
        <p className="text-muted-foreground"></p>
        </div>
        <form action={formAction} className="space-y-4"
          >
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <Input id="email"
            name='email'
            type="email"
            placeholder="test@my-app.com"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
            {
                state?.errors?.email && (<span className='text-red-400'>{state.errors.email}</span>)
            }
          </div>
          <div className="space-y-2">
          <label htmlFor="password">Password</label>
          <div className="relative">
          <Input id="password"
          name='password'
          type='password'
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
            />

            {
                state?.errors?.password && (<span className='text-red-400'>{state.errors.password}</span>)
            }
           {/* <button type="button"
           onClick={()=> setShowPassword(! showPassword)}
           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
            {showPassword ? <EyeOff size={20} /> : <Eye size={20}/> }
            </button>    */}
            
          </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember"/>
              <label htmlFor="remember">Remember me</label>
              <a href="#" className="text-sm text-primary-500 hover:text-primary-600">
                Forgot password?
                </a>

            </div>

          </div>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span></span>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
  )
}

export default LoginForm