import React from 'react'
import LoginForm from './_components/login-form'
import { redirect } from 'next/navigation'
import { verifySession } from '@/lib/auth'

const LoginPage = async () => {
    
  const currentUser = await verifySession()
  if (currentUser) {
    redirect('/dashboard')
  }

  return (
    <LoginForm/>
  )
}

export default LoginPage