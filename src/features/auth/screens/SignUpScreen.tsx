import React from 'react'
import SignUpHero from '../components/signup/SignUpHero'
import SingUpForm from '../components/signup/SingUpForm'

export default function SignUpScreen() {
  return (
   <main className="min-h-[calc(100vh-128px)] bg-background px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_20px_60px_rgba(25,55,44,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
       <SignUpHero/>
       <SingUpForm/>
      </div>
    </main>
  )
}
