'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Logo() {
  return (
    <Link href="/">
        <Image height="60" alt="logo" width="90" src="/logo.svg" className='dark:hidden' />
        <Image height="60" alt="logo" width="90" src="/logo-white.svg"  className="hidden dark:block"/>
    </Link>
  )
}

export default Logo